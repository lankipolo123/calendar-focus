// components/ui/calendar.tsx
import * as React from "react";
import {
  DayPicker,
  type DayPickerProps,
} from "react-day-picker";
import "react-day-picker/dist/style.css";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Calendar = React.forwardRef<HTMLDivElement, DayPickerProps>(
  ({ className, classNames, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-white rounded-md shadow-md overflow-hidden", className)}
        onClick={(e) => e.stopPropagation()}
      >
        <DayPicker
          defaultMonth={new Date()}
          showOutsideDays={false}
          fixedWeeks
          captionLayout="dropdown"
          fromDate={new Date()}
          disabled={[{ dayOfWeek: [0, 6] }]}
          weekStartsOn={1} // ✅ Start week on Monday
          components={{
            IconLeft: () => <ChevronLeft className="w-5 h-5 text-red-900" />,
            IconRight: () => <ChevronRight className="w-5 h-5 text-red-900" />,
          }}
          classNames={{
            months: "flex flex-col",
            month: "space-y-1 px-2 pb-2",
            caption: "flex justify-between items-center px-3 py-2",
            caption_label: "text-sm font-semibold text-red-900",
            nav: "flex items-center gap-2",
            nav_button:
              "h-7 w-7 rounded-full bg-red-900 text-white hover:bg-red-800 transition disabled:opacity-30 disabled:cursor-not-allowed",
            dropdown: "bg-white text-red-900 text-sm rounded px-1 py-0.5",

            table: "w-full border-collapse",
            head_row: "grid grid-cols-7",
            head_cell: "text-xs font-medium text-center text-gray-500",
            row: "grid grid-cols-7",
            cell: "text-sm text-center",

            day: "h-9 w-9 flex items-center justify-center rounded-full transition-colors hover:bg-red-100",
            day_selected: "bg-red-900 text-white ring-1 ring-red-900 font-semibold",
            day_range_start: "bg-red-900 text-white rounded-l-full",
            day_range_end: "bg-red-900 text-white rounded-r-full",
            day_range_middle: "bg-red-100 text-red-900",
            day_today: "border border-red-900",
            day_outside: "hidden",
            day_disabled: "text-gray-400 opacity-50 cursor-not-allowed",
          }}
          {...props}
        />
      </div>
    );
  }
);

Calendar.displayName = "Calendar";
