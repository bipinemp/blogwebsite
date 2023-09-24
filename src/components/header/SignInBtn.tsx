"use client";

import { LogIn } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SignInBtn: React.FC = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/sign-in")}
      variant="outline"
      className="flex items-center"
    >
      <LogIn className="mr-2 h-4 w-4" /> SignIn
    </Button>
  );
};

export default SignInBtn;
