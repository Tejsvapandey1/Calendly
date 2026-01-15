"use client";
import TestimonialComponent from "@/components/testimonial-component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { LinkIcon } from "lucide-react";
import { Clock } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: "Create Events",
      description: "Easily set up and customize your event types",
    },
    {
      icon: Clock,
      title: "Manage Availability",
      description: "Define your availability to streamline scheduling",
    },
    {
      icon: LinkIcon,
      title: "Custom Links",
      description: "Share your personalized scheduling link",
    },
  ];

  const howItWorks = [
    { step: "Sign Up", description: "Create your free Schedulrr account" },
    {
      step: "Set Availability",
      description: "Define when you're available for meetings",
    },
    {
      step: "Share Your Link",
      description: "Send your scheduling link to clients or colleagues",
    },
    {
      step: "Get Booked",
      description: "Receive confirmations for new appointments automatically",
    },
  ];

  return (
    <main className="container mx-auto px-14 py-16 ">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-24">
        <div className="lg:w-1/2">
          <h1 className="text-7xl font-extrabold pb-6 gradient-title">
            Simplify Scheduling
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            Calendy helps you schedule meeting easily
          </p>
          <Link href={"/dashboard"}>
            <Button className={"text-lg"} size="lg">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>{" "}
          </Link>
        </div>
        <div className="lg:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md aspect-square">
            <Image
              src="/poster.png"
              alt="poster"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-14 text-blue-600">
          {" "}
          Key Features{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card key={idx}>
              <CardHeader>
                <feature.icon className="w-12 h-12 text-blue-500 mb-14 mx-auto" />
                <CardTitle className="text-center text-blue-600">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-14 text-blue-600">
          {" "}
          What Our Users Say{" "}
        </h2>
        <TestimonialComponent />
      </div>

      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-14 text-blue-600">
          {" "}
          What Our Users Say{" "}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {howItWorks.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <span className="text-blue-600 font-bold text-xl">{idx + 1}</span>
              </div>
              <h3 className="font-semibold text-lg m-2">{step.step}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready To Simplify Your Scheduling</h2>
        <p className="text-xl mb-6">Join thousand of professionals</p>
        <Link href={'/dashboard'}>
          <Button className={"text-blue-600 py-2 px-4"} size="large" variant="secondary">
            Start for Free <ArrowRight className="ml-2 h-5 w-5"/>
          </Button>
        </Link>
      </div>
    </main>
  );
}
