"use client";
import { PenBox } from "lucide-react";
import { Button } from "./ui/button";
import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";


const { default: Image } = require("next/image");
const { default: Link } = require("next/link");

export const Header = () => {
  return (
    <nav className="mx-auto bg-white py-2 px-4 flex shadow-md border-b-2 justify-between items-center">
      <Link href={"/"} className="flex items-center">
        <Image
          src="/logo.png"
          width={150}
          height={60}
          alt="scheduler"
          className="h-16 w-auto"
        />
      </Link>

      <div className="flex flex-row gap-4">
        <Link href={"/events?create=true"}>
          <Button className={"flex items-center gap-4"}>
            {" "}
            <PenBox size={18} /> Create Event
          </Button>
        </Link>
        <SignedOut>
          <SignInButton forcedRedirectUrl="/dashboard">
            <Button variant="outline ">Login</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
