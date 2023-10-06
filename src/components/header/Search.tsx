"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  function handleSearch() {
    router.push(`/search?query=${searchQuery}`);
  }

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="Search..."
        className="border-zinc-500"
      />
      <Button
        onClick={handleSearch}
        type="submit"
        className="font-bold tracking-wider"
      >
        Search
      </Button>
    </div>
  );
}
