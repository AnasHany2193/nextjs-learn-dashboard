"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

// The six pictures the course seeds into public/customers. A real app would
// let people upload their own; this one only ever offers these six, since
// next/image refuses any host not listed in next.config's remotePatterns
// and there's no upload endpoint to accept one.
const AVATARS = [
  "amy-burns.png",
  "balazs-orban.png",
  "delba-de-oliveira.png",
  "evil-rabbit.png",
  "lee-robinson.png",
  "michael-novotny.png",
].map((file) => ({
  value: `/customers/${file}`,
  label: file.replace(".png", "").replace(/-/g, " "),
}));

export default function AvatarPicker({
  name,
  defaultValue = "",
  error,
}: {
  name: string;
  defaultValue?: string;
  error?: string[];
}) {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);

  const selected = AVATARS.find((a) => a.value === value);

  function choose(next: string) {
    setValue(next);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div className="relative">
      <input type="hidden" name={name} value={value} />

      <button
        ref={triggerRef}
        id={name}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-describedby="imageUrl-error"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
        className="flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white py-2 pl-3 pr-3 text-sm outline-2"
      >
        {selected ? (
          <Image
            src={selected.value}
            alt=""
            width={24}
            height={24}
            className="rounded-full"
          />
        ) : (
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-500">
            —
          </span>
        )}
        <span className="flex-1 text-left capitalize text-gray-900">
          {selected ? selected.label : "No picture (use initials)"}
        </span>
        <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Choose a picture"
          className="absolute z-10 mt-1 max-h-64 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          <li
            role="option"
            aria-selected={value === ""}
            tabIndex={0}
            onClick={() => choose("")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                choose("");
              }
            }}
            className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm hover:bg-blue-50 aria-selected:bg-blue-50"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-medium text-gray-500">
              —
            </span>
            No picture (use initials)
          </li>
          {AVATARS.map((avatar) => (
            <li
              key={avatar.value}
              role="option"
              aria-selected={value === avatar.value}
              tabIndex={0}
              onClick={() => choose(avatar.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  choose(avatar.value);
                }
              }}
              className="flex cursor-pointer items-center gap-3 px-3 py-2 text-sm capitalize hover:bg-blue-50 aria-selected:bg-blue-50"
            >
              <Image
                src={avatar.value}
                alt=""
                width={24}
                height={24}
                className="rounded-full"
              />
              {avatar.label}
            </li>
          ))}
        </ul>
      )}

      <div id="imageUrl-error" aria-live="polite" aria-atomic="true">
        {error?.map((e) => (
          <p className="mt-2 text-sm text-red-500" key={e}>
            {e}
          </p>
        ))}
      </div>
    </div>
  );
}
