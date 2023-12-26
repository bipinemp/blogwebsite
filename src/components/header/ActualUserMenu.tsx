"use client";

import { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "../ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";
import LogOutBtn from "./LogOutBtn";

interface ActualUserMenuProps {
  image: string;
  name: string;
  email: string;
  id: string;
}

const ActualUserMenu: FC<ActualUserMenuProps> = ({
  image,
  name,
  email,
  id,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {image === "" || image === undefined ? (
            <div className="relative block w-[50px] h-[50px] bg-gray-700 rounded-full animate-pulse"></div>
          ) : (
            <Image
              src={image || ""}
              width={40}
              height={40}
              alt="profile picture"
              className="bg-gray-700 rounded-full cursor-pointer"
            />
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit mr-24">
        <DropdownMenuLabel>
          <DropdownMenuItem className="cursor-pointer flex flex-col items-start group">
            <p className="font-semibold tracking-wide group-hover:underline">
              {name}
            </p>
            <span className="text-xs text-gray-400 tracking-wide group-hover:underline">
              @{email}
            </span>
          </DropdownMenuItem>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <Link href={`/profile/${id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

        {/* LogOut Btn component  */}
        <LogOutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActualUserMenu;
