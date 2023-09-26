"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface BlogOptionsProps {
  onDelete: (id: string) => void;
  id: string;
  blogId: string;
}

const BlogOptions = ({ onDelete, id, blogId }: BlogOptionsProps) => {
  const router = useRouter();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <MoreVertical className="w-10 h-7" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-30 w-fit -mt-[-0.15rem] mr-32">
          <DropdownMenuItem
            onClick={(e) => {
              router.push(`/update/${blogId}`);
              e.stopPropagation();
            }}
            className="cursor-pointer"
          >
            <p className="font-semibold tracking-wider text-green-400">Edit</p>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={(e) => {
              onDelete(id);
              e.stopPropagation();
            }}
            className="cursor-pointer"
          >
            <p className="font-semibold tracking-wider text-red-500">Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BlogOptions;
