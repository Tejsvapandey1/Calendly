import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Header } from "@/components/header";
import CreateEventsDrawer from "@/components/create-event";
import { Suspense } from "react";

export const metadata = {
  title: "Calendly",
  description: "Schedule meetings",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      <html lang="en">
        <body className={inter}>
          {/* header */}
          <Header />
          <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {children}
          </main>
          {/* footer */}
          <footer className="bg-blue-100 py-12">
            <div className="container mx-auto px-4 text-center text-gray-600">
              <p>Made by Tejsva Pandey</p>
            </div>
          </footer>
        <Suspense fallback={null}>

          <CreateEventsDrawer />
        </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}
