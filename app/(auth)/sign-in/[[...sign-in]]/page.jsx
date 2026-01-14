
import { SignIn } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <SignIn />
    </div>
  );
}

export default page;
