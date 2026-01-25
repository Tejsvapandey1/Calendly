"use client";
import { bookingSchema } from "@/app/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { timeSlots } from "@/app/(main)/availability/data";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const BookingForm = ({ event, availability }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
  });

  console.log("this is from bookingForm", availability);

  const availableDays = availability.availableDates.map(
    (day) => new Date(day.date),
  );

  const timeSlots = selectedDate
    ? (availability.availableDates.find(
        (day) => day.date === format(selectedDate, "yyyy-MM-dd"),
      )?.slots ?? [])
    : [];

  return (
    <div className="w-full lg:w-2/3 bg-white rounded-2xl border shadow-sm p-6 space-y-6">

      <div className="w-full max-w-3xl rounded-2xl border bg-white shadow-sm p-6 space-y-6">
        {/* Date Picker */}
        <div className="flex justify-center">
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
          <div className="space-y-4">
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
    </div>
  );
};

export default BookingForm;
