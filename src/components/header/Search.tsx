"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useQueryState } from "next-usequerystate";

export function Search() {
  const [searchQ, setSearchQ] = useQueryState("query");

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        value={searchQ || ""}
        onChange={(e) => setSearchQ(e.target.value)}
        type="text"
        placeholder="Search..."
        className="border-zinc-500"
      />
      <Link href={`/search?query=${searchQ}`}>
        <Button type="submit" className="font-bold tracking-wider">
          Search
        </Button>
      </Link>
    </div>
  );
}
