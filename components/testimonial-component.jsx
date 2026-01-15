import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function TestimonialComponent() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      content:
        "Schedulrr has transformed how I manage my team's meetings. It's intuitive and saves us hours every week!",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      name: "David Lee",
      role: "Freelance Designer",
      content:
        "As a freelancer, Schedulrr helps me stay organized and professional. My clients love how easy it is to book time with me.",
      image: "https://i.pravatar.cc/150?img=2",
    },
    {
      name: "Emily Chen",
      role: "Startup Founder",
      content:
        "Schedulrr streamlined our hiring process. Setting up interviews has never been easier!",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      name: "Michael Brown",
      role: "Sales Executive",
      content:
        "I've seen a 30% increase in my meeting bookings since using Schedulrr. It's a game-changer for sales professionals.",
      image: "https://i.pravatar.cc/150?img=4",
    },
  ];

  return (
    <Carousel>
      <CarouselContent className="-ml-1">
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <Card className="h-full">
              <CardContent className="flex flex-col h-full justify-center p-6">
                <p className="text-gray-600 mb-4">{testimonial.content}</p>
                <div className="flex items-center mt-4">
                  <Avatar className={"h-12 w-12 mr-4"}>
                    <AvatarImage src={testimonial.image} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default TestimonialComponent;
