"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { usernameSchema } from "@/app/lib/validator";
import { useFetch } from "@/hooks/useFetch";
import { updateUsername } from "@/actions/users";
import { BarLoader } from "react-spinners";
import { getLatestUpdates } from "@/actions/dashboard";
import { format } from "date-fns";

const page = () => {
  const { user, isLoaded } = useUser();
  // console.log(user);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(usernameSchema),
  });

  const {
    loading,
    error,
    fn: functionUpdateUsername,
  } = useFetch(updateUsername);

  const onSubmit = async (data) => {
    console.log("Submitting")
    await functionUpdateUsername(data.username);
  };

  useEffect(() => {
    setValue("username", user?.username);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const {
    loading: loadingUpdates,
    data: upcomingMeetings = [],
    fn: fnUpdates,
  } = useFetch(getLatestUpdates);

  useEffect(() => {
    (async () => await fnUpdates())();
  }, []);

  const cleanMeetings = Array.isArray(upcomingMeetings)
    ? upcomingMeetings.slice().map((m) => ({ ...m }))
    : [];

  console.log("upcoming Meetings", upcomingMeetings);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Welcome {user?.firstName}</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingUpdates ? (
            <p>Loading updates...</p>
          ) : cleanMeetings.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1 font-light">
              {cleanMeetings.map((meeting) => (
                <li key={meeting.id}>
                  <strong>{meeting.event.title}</strong> on{" "}
                  {format(new Date(meeting.startTime), "MMM d, yyyy h:mm a")}{" "}
                  with {meeting.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming meetings</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Unique link</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span>
                  {typeof window !== "undefined" ? window.location.origin : ""}/
                </span>
                <Input {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.username.message}
                </p>
              )}

              {error && (
                <p className="text-sm text-red-600 mt-1">{error.message}</p>
              )}
            </div>
            {loading && <BarLoader width="100%" color="#36d7b7" />}
            <Button type="submit">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
