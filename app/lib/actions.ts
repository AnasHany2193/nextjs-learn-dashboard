"use server";

import z from "zod";
import postgres from "postgres";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

if (!process.env.POSTGRES_URL)
  throw new Error("Missing POSTGRES_URL environment variable");
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: "Please select a customer" }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater then $0." }),
  status: z.enum(["pending", "paid"], {
    invalid_type_error: "Please select an invoice status.",
  }),
  date: z.string(),
});

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(
  prevState: InvoiceState,
  formData: FormData,
) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  // Insert data into the database
  try {
    await sql`INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return { message: "Database Error: Failed to Create Invoice." };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function updateInvoice(
  id: string,
  prevState: InvoiceState,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string): Promise<InvoiceState> {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }

  revalidatePath("/dashboard/invoices");
  return { message: null };
}

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, { message: "Please enter a name." }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address." }),
  imageUrl: z
    .string()
    .trim()
    .refine((value) => value === "" || value.startsWith("/"), {
      message: "Image URL must be a local path, like /customers/name.png",
    }),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });
const UpdateCustomer = CustomerFormSchema.omit({ id: true });

export type CustomerState = {
  errors?: { name?: string[]; email?: string[]; imageUrl?: string[] };
  message?: string | null;
};

export async function createCustomer(
  prevState: CustomerState,
  formData: FormData,
) {
  // Validate form fields using Zod
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    imageUrl: formData.get("imageUrl"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Customer.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, imageUrl } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`INSERT INTO customers (name, email, image_url)
    VALUES (${name}, ${email}, ${imageUrl})`;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Create Customer." };
  }

  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function updateCustomer(
  id: string,
  prevState: CustomerState,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    imageUrl: formData.get("imageUrl"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Customer.",
    };
  }

  // Prepare data for insertion into the database
  const { name, email, imageUrl } = validatedFields.data;

  try {
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, image_url = ${imageUrl}
      WHERE id = ${id}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Update Customer." };
  }

  // Revalidate the cache for the customers page and redirect the user.
  revalidatePath("/dashboard/customers");
  redirect("/dashboard/customers");
}

export async function deleteCustomer(id: string): Promise<CustomerState> {
  try {
    // invoices.customer_id has no foreign key, so deleting a customer with
    // invoices would orphan them: they'd vanish from the invoices list
    // (which inner-joins customers) while still counting toward the
    // dashboard's total invoices card (which doesn't join at all). Refuse
    // instead of leaving the two out of sync.
    const [{ count }] = await sql<{ count: string }[]>`
      SELECT COUNT(*) FROM invoices WHERE customer_id = ${id}
    `;

    if (Number(count) > 0) {
      return {
        message: `Cannot delete: this customer still has ${count} invoice(s).`,
      };
    }

    await sql`DELETE FROM customers WHERE id = ${id}`;
  } catch (error) {
    console.error("Database Error:", error);
    return { message: "Database Error: Failed to Delete Customer." };
  }

  revalidatePath("/dashboard/customers");
  return { message: null };
}
