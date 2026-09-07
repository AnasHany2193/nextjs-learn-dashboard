import bcrypt from "bcrypt";
import postgres from "postgres";
import { connection } from "next/server";
import { invoices, customers, revenue, users } from "../lib/placeholder-data";

if (!process.env.POSTGRES_URL)
  throw new Error("Missing POSTGRES_URL environment variable");
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

type Sql = postgres.TransactionSql;

async function seedUsers(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  return Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword});
      `;
    }),
  );
}

async function seedCustomers(sql: Sql) {
  await sql`
    CREATE TABLE customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  return Promise.all(
    customers.map(
      (customer) => sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url});
      `,
    ),
  );
}

async function seedInvoices(sql: Sql) {
  await sql`
    CREATE TABLE invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `;

  return Promise.all(
    invoices.map(
      (invoice) => sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date});
      `,
    ),
  );
}

async function seedRevenue(sql: Sql) {
  await sql`
    CREATE TABLE revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  return Promise.all(
    revenue.map(
      (rev) => sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue});
      `,
    ),
  );
}

export async function GET() {
  // Route handlers follow the prerender model under Cache Components, so
  // without this the whole seed executes on every `pnpm build`. connection()
  // makes the handler wait for a real request, which a build never supplies.
  await connection();

  if (process.env.NODE_ENV === "production") {
    return Response.json({ error: "Not available in production" }, { status: 403 });
  }

  try {
    // Drop and recreate rather than CREATE TABLE IF NOT EXISTS with
    // ON CONFLICT DO NOTHING. That combination looked idempotent but was not:
    // the invoice insert omits `id`, so a fresh uuid was generated every run
    // and the conflict target never matched. Thirty builds left 393 invoices
    // where the placeholder data defines 13. A reset is what this endpoint is
    // for, so it now does exactly that, and repeating it is a no-op.
    await sql.begin(async (tx) => {
      await tx`DROP TABLE IF EXISTS invoices, customers, revenue, users`;
      await tx`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

      await seedUsers(tx);
      await seedCustomers(tx);
      await seedInvoices(tx);
      await seedRevenue(tx);
    });

    return Response.json({
      message: "Database reset",
      users: users.length,
      customers: customers.length,
      invoices: invoices.length,
      revenue: revenue.length,
    });
  } catch (error) {
    console.error("Seed Error:", error);
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
