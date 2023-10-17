"use client";

import { User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogOutBtn from "./LogOutBtn";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";

const UserMenu = ({ session }: any) => {
  if (!session) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {session[0].image === "" || session[0].image === undefined ? (
            <div className="relative block w-[50px] h-[50px] bg-gray-700 rounded-full animate-pulse"></div>
          ) : (
            <Image
              src={session[0].image || ""}
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
              {session[0]?.name}
            </p>
            <span className="text-xs text-gray-400 tracking-wide group-hover:underline">
              @{session[0]?.email}
            </span>
          </DropdownMenuItem>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <Link href={`/profile/${session[0]?._id}`}>
          <DropdownMenuItem className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />

        {/*  LogOut Btn component  */}
        <LogOutBtn />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;

{
  /* <Image
width={35}
height={35}
src={`${session?.user?.image}`}
alt="avatar"
className="rounded-full"
/> */
}
