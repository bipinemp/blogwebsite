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
      <AvatarImage src={image} alt="shadcn" />
      <AvatarFallback>
        <Image
          width={30}
          height={30}
          src="https://img.icons8.com/ios-glyphs/30/person-male.png"
          alt="user avatar"
        />
      </AvatarFallback>
    </Avatar>
  );
};
export default AvatarDemo;
