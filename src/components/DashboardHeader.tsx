
import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { es } from 'date-fns/locale';
import StreakCounter from "@/components/StreakCounter";

interface DashboardHeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  streak: number;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ date, setDate, streak }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const selectedDateFormatted = format(date, 'EEEE, d MMMM', { locale: es });

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold text-[#212121]">Mi Diario</h1>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center p-0 h-auto font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-[#FF7043]" />
              <span className="text-[#424242]">{selectedDateFormatted}</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate);
                  setIsCalendarOpen(false);
                }
              }}
              className="rounded-md border"
            />
          </PopoverContent>
        </Popover>
      </div>
      
      <div>
        <StreakCounter streak={streak} />
      </div>
    </div>
  );
};

export default DashboardHeader;
