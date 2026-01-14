'use client'

import { SignIn, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="h-screen flex items-center justify-center">
        Hello
      </div>
    );
  }

  return <div>Welcome!</div>;
}
