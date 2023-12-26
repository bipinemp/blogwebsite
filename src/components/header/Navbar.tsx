import Link from "next/link";
import DarkLightMode from "./DarkLightMode";
import UserMenu from "./UserMenu";
import { Search } from "./Search";
import SignInBtn from "./SignInBtn";
import { Button } from "../ui/button";
import { getServerSession } from "next-auth";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

const Navbar: React.FC = async () => {
  const session = await getServerSession();

  // const router = useRouter();

  // useEffect(() => {
  //   if (!session?.data?.user) {
  //     router.push("sign-in");
  //   }
  // }, [session]);

  return (
    <nav className="bg-inherit max-w-[1920px] mx-auto md:px-10 xl:px-28 2xl:px-52 sticky top-0 inset-x-0 z-40 flex justify-between items-center px-10 py-5 border-b border-b-zinc-400">
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
        {session?.user ? (
          <Link href={"/new"}>
            <Button variant="outline" className="border-zinc-500">
              Create Blog
            </Button>
          </Link>
        ) : null}
        {session?.user ? null : <SignInBtn />}
        <DarkLightMode />

        {!session?.user ? null : <UserMenu />}
      </div>
    </nav>
  );
};

export default Navbar;
