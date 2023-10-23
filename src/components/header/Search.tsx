"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchStore } from "@/store/store";
import { useRouter } from "next/navigation";

export function Search() {
  const router = useRouter();

  const { searchValue, setSearchValue } = useSearchStore();

  function searchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    router.push(`/search?query=${searchValue}`);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <form onSubmit={searchSubmit} className="flex items-center gap-2">
        <Input
          value={searchValue || ""}
          onChange={handleChange}
          type="text"
          placeholder="Search..."
          className="border-zinc-500"
          required
        />

        <Button className="font-bold tracking-wider">Search</Button>
      </form>
    </div>
  );
}
