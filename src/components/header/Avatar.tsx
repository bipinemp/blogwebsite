"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AvatarDemo = ({ image, id }: { image: string; id: string }) => {
  const router = useRouter();
  return (
    <Avatar
      className="cursor-pointer"
      onClick={() => router.push(`/profile/${id}`)}
    >
      {image === "" || image === null || image === undefined ? (
        <div className="relative block w-[100px] h-[100px] bg-gray-700 rounded-full animate-pulse"></div>
      ) : (
        <Image
          src={image || ""}
          width={50}
          height={50}
          alt="profile picture"
          className="bg-gray-700"
        />
      )}
    </Avatar>
  );
};
export default AvatarDemo;
