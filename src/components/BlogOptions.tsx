import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical } from "lucide-react";

interface BlogOptionsProps {
  onDelete: (id: string) => void;
  id: string;
}

const BlogOptions = ({ onDelete, id }: BlogOptionsProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <MoreVertical className="w-10 h-7" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit -mt-[-0.15rem] mr-32">
          <DropdownMenuItem className="cursor-pointer">
            <p className="font-semibold tracking-wider text-green-400">Edit</p>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer">
            <p
              onClick={() => onDelete(id)}
              className="font-semibold tracking-wider text-red-500"
            >
              Delete
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default BlogOptions;
