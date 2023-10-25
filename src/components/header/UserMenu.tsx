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
import { Avatar } from "@radix-ui/react-avatar";
import Image from "next/image";
import Link from "next/link";
import { useFetchProfileDetails } from "@/hooks/blogs/use-blog";
import { useSession } from "next-auth/react";

const UserMenu = () => {
  const session = useSession();

  // hook  for getting  UserDetails ( id , name , email , image ) using email

  const { data, isLoading } = useFetchProfileDetails(
    session?.data?.user?.email || ""
  );

  if (isLoading) {
    return (
      <div className="relative block w-[45px] h-[45px] bg-gray-700 rounded-full animate-pulse"></div>
    );
  }

  const userDetails = data?.userData;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          {userDetails?.image === "" || userDetails?.image === undefined ? (
            <div className="relative block w-[50px] h-[50px] bg-gray-700 rounded-full animate-pulse"></div>
          ) : (
            <Image
              src={userDetails?.image || ""}
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
              {userDetails?.name}
            </p>
            <span className="text-xs text-gray-400 tracking-wide group-hover:underline">
              @{userDetails?.email}
            </span>
          </DropdownMenuItem>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <Link href={`/profile/${userDetails?._id}`}>
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

export default UserMenu;
