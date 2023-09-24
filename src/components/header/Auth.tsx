"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const Auth: React.FC = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  );
};

export default Auth;
