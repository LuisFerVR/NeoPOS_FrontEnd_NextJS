'use client';

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getSalesByDate } from "@/app/src/api";
type valuePiece = Date | null;
type Value = valuePiece | [valuePiece, valuePiece];

export default function TransactionFilter() {
    const [date, setDate] = useState<Value>(new Date());
    const formattedDate = format(date?.toString() || new Date(), 'dd/MM/yyyy');
    console.log(`Fecha seleccionada: ${formattedDate}`);
    const { data, isLoading } = useQuery({
        queryKey: ['sales', formattedDate],
        queryFn: () => getSalesByDate(formattedDate),
    })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-10">
        <div>
            <Calendar 
                value={date}
                onChange={setDate}
            />
        </div>
        <div>

        </div>
    </div>
  )
}
