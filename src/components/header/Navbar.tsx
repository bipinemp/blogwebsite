"use client";

import Link from "next/link";
import DarkLightMode from "./DarkLightMode";
import UserMenu from "./UserMenu";
import { Search } from "./Search";
import SignInBtn from "./SignInBtn";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useFetchProfileDetails } from "@/hooks/blogs/use-blog";

const Navbar: React.FC = () => {
  const session = useSession();
  const router = useRouter();

  // hook  for getting  UserDetails ( id , name , email , image ) using email
  const { data } = useFetchProfileDetails(session?.data?.user?.email || "");

  const userDetails = data?.userData;

  if (!session) {
    router.push("/sign-in");
  }

  return (
    <nav className="backdrop-blur-md max-w-[1920px] mx-auto md:px-10 xl:px-28 2xl:px-52 sticky top-0 inset-x-0 z-40 flex justify-between items-center px-10 py-5 border-b border-b-zinc-400">
      <div className="flex gap-7 items-center">
        <Link
          href={"/"}
          className="font-bold tracking-widest border-[2px] border-ring flex justify-center items-center px-2 py-1 rounded-lg"
        >
          Writz
        </Link>
        <Search />
      </div>

      <div className="flex gap-4 items-center">
        {session?.data?.user ? (
          <Link href={"/new"}>
            <Button variant="outline" className="border-zinc-500">
              Create Blog
            </Button>
          </Link>
        ) : null}
        {session?.data?.user ? null : <SignInBtn />}
        <DarkLightMode />
        <UserMenu userData={userDetails} />
      </div>
    </nav>
  );
};

export default Navbar;
