"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function Search() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query");
  const [searchQuery, setSearchQuery] = useState<string>(query || "");

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
        type="text"
        placeholder="Search..."
        className="border-zinc-500"
      />
      <Link href={`/search?query=${searchQuery}`}>
        <Button type="submit" className="font-bold tracking-wider">
          Search
        </Button>
      </Link>
    </div>
  );
}
