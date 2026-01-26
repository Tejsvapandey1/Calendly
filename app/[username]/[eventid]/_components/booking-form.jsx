"use client"
import { bookingSchema } from "@/app/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { timeSlots } from "@/app/(main)/availability/data";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { createBooking } from "@/actions/bookings";

const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  // console.log("this is from bookingForm", availability);

  const availableDays = availability.availableDates.map(
    (day) => new Date(day.date),
  );

  const timeSlots = selectedDate
    ? (availability.availableDates.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd"),
      )?.slots ?? [])
    : [];

  useEffect(() => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedTime) {
      setValue("time", selectedTime);
    }
  }, [selectedTime, setValue]);

  const { loading, data, fn: fnCreateBooking } = useFetch(createBooking);

  const onSubmit = async (data) => {
    console.log(data);

    if (!selectedDate || !selectedTime) {
      console.error("Date and Time is not Selected");
      return;
    }

    const startTime = new Date(
      `${format(selectedDate, "yyyy-MM-dd")}T${selectedTime}`,
    );
    const endTime = new Date(startTime.getTime() + event.duration * 60000);

    const bookingData = {
      eventId: event.id,
      name: data.name,
      email: data.email,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      additionalInfo: data.additionalInfo,
    };

    await fnCreateBooking(bookingData);
  };

  

  if (data) {
    return (
      <div className="text-center p-10 border bg-white">
        <h2 className="text-2xl font-bold mb-4">Booking successful!</h2>
        {data.meetLink && (
          <p>
            Join the meeting:{" "}
            <a
              href={data.meetLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {data.meetLink}
            </a>
          </p>
        )}
      </div>
    );
  }


  return (
    <div className="w-full lg:w-2/3 bg-white rounded-2xl border shadow-sm p-6 space-y-6">
      <div className="w-full flex md:flex-row  rounded-2xl border bg-white shadow-sm p-6 space-y-6">
        {/* Date Picker */}
        <div className="flex w-full justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            disabled={[{ before: new Date() }]}
            modifiers={{
              available: availableDays,
            }}
            modifiersStyles={{
              available: {
                background: "#bfdbfe", // light blue
                borderRadius: "9999px",
              },
            }}
          />
        </div>

        {/* Time Slots */}
        {selectedDate && (
          <div className="space-y-4 w-full">
            <h3 className="text-center text-lg font-semibold text-gray-800">
              Available Time Slots
            </h3>

            <div className="max-h-64 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTime === slot ? "default" : "outline"}
                    className="w-full transition-all"
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {selectedTime && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register("name")} placeholder="Your Name" />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("email")}
              type="email"
              placeholder="Your Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea
              {...register("additionalInfo")}
              placeholder="Additional Information"
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? "Scheduling..." : "Schedule Event"}
            {/* Scheduling */}
          </Button>
        </form>
      )}
    </div>
  );
};

export default BookingForm;
