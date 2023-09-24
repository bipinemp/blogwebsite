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
          <AvatarImage
            src={`${session[0].image}`}
            alt="shadcn"
            className="w-10 h-10 rounded-full"
          />
          <AvatarFallback>
            <Image
              width={30}
              height={30}
              src="https://img.icons8.com/ios-glyphs/30/person-male.png"
              alt="user avatar"
            />
          </AvatarFallback>
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
