import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Container from "@/components/Container";
import SignIn from "@/components/SignIn";

const Page: React.FC = () => {
  return (
    <Container>
      <div className="max-w-[400px] mx-auto min-h-[200px] mt-20 flex flex-col gap-10">
        <Link
          href="/"
          className="flex items-center text-gray-300 font-semibold"
        >
          <ChevronLeft className="mr-1 h-5 w-5" />
          Home
        </Link>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-black tracking-wide">Welcome back</h1>
          <p className="text-center text-[0.9rem] tracking-wide text-gray-400">
            By continuing, you are setting up a Writz account and agree to our
            User Agreement and Privacy Policy.
          </p>
          <SignIn />
        </div>
      </div>
    </Container>
  );
};

export default Page;
