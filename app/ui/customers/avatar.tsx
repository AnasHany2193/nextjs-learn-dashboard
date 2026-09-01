import Image from "next/image";

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

export default function CustomerAvatar({
  name,
  imageUrl,
  size = 28,
}: {
  name: string;
  imageUrl: string;
  size?: number;
}) {
  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        className="rounded-full"
        alt={`${name}'s profile picture`}
        width={size}
        height={size}
      />
    );
  }

  // Customers created without a picture fall back to initials.
  return (
    <span
      aria-hidden="true"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className="flex shrink-0 items-center justify-center rounded-full bg-blue-100 font-medium text-blue-700"
    >
      {initialsOf(name)}
    </span>
  );
}
