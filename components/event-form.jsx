import { eventsSchema } from "@/app/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";

const EventForm = ({ onSubmitForm }) => {
  const {
    register,
    handleSubmit,
    control, // ✅ FIX 1
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventsSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 30,
      isPrivate: true,
    },
  });

  return (
    <form
      className="px-6 flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium">Event title</label>
        <Input {...register("title")} className="mt-1" />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium">Event description</label>
        <Input {...register("description")} className="mt-1" />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Duration */}
      <div>
        <label className="block text-sm font-medium">Event duration</label>
        <Input
          type="number"
          className="mt-1"
          {...register("duration", { valueAsNumber: true })} // ✅ FIX 3
        />
        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">
            {errors.duration.message}
          </p>
        )}
      </div>

      {/* Privacy */}
      <div>
        <label className="block text-sm font-medium">Event privacy</label>
        <Controller
          name="isPrivate"
          control={control} // ✅ FIX 1
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value) =>
                field.onChange(value === "true")
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.isPrivate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.isPrivate.message}
          </p>
        )}
      </div>

        <Button type="submit" className="mt-4">Submit</Button>
    </form>
  );
};

export default EventForm;
