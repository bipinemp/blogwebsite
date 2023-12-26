"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createUrl } from "@/lib/createUrl";
import { useRouter, useSearchParams } from "next/navigation";

export function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function searchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const val = e.target as HTMLFormElement;
    const search = val.search as HTMLInputElement;
    const newParams = new URLSearchParams(searchParams.toString());

    if (search.value) {
      newParams.set("search", search.value);
    } else {
      newParams.delete("search");
    }
    router.push(createUrl("/search", newParams));
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <form onSubmit={searchSubmit} className="flex items-center gap-2">
        <Input
          key={searchParams?.get("search")}
          type="text"
          name="search"
          autoComplete="off"
          placeholder="Search..."
          defaultValue={searchParams?.get("search") || ""}
          className="border-zinc-500"
          required
        />

        <Button className="font-bold tracking-wider">Search</Button>
      </form>
    </div>
  );
}
