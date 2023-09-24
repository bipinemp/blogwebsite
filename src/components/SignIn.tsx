"use client";

import { useState } from "react";
import Google from "./svg/Google";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      alert("Error while signing in with Google");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button
        disabled={isLoading}
        onClick={googleLogin}
        variant="default"
        size="lg"
        className="flex font-bold tracking-wider gap-2 items-center"
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            <Google />
            <h1>SignIn With Google</h1>
          </>
        )}
      </Button>
    </div>
  );
};

export default SignIn;
