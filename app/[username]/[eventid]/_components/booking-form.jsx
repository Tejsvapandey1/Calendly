"use client"
import { bookingSchema } from "@/app/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";


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

  const availableDays = availability.map((day) => new Date(day.date));

  return (
    <div>
      <div>
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date);
            setSelectedTime(null);
          }}
          modifiers={{
            available: availableDays,
          }}
          modifiersStyles={{
            available: {
              background: "lightblue",
              borderRadius: 100,
            },
          }}
        />
      </div>
      <div></div>
    </div>
  );
};

export default BookingForm;
