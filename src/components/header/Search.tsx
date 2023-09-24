import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search..." className="border-zinc-500" />
      <Button type="submit" className="font-bold tracking-wider">
        Search
      </Button>
    </div>
  );
}
