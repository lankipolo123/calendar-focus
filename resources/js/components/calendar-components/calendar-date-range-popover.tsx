import { useState, Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/calendar-components/calendar";
import type { DateRange } from "react-day-picker";

interface DateRangePopoverProps {
  dateRange: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
}

export default function CalendarDateRangePopover({
  dateRange,
  onChange,
}: DateRangePopoverProps) {
  const today = new Date();
  const [draftRange, setDraftRange] = useState<DateRange | undefined>(dateRange);

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      setDraftRange(dateRange);
    }
  }, [dateRange]);

  const formatted =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "MMM d")} – ${format(dateRange.to, "MMM d")}`
      : "Select date range";

  const handleConfirm = (close: () => void) => {
    onChange(draftRange);
    close();
  };

  const handleCancel = (close: () => void) => {
    setDraftRange(dateRange);
    close();
  };

  return (
    <Popover className="relative w-full">
      {({ open, close }) => (
        <>
     <Popover.Button
  className="flex w-full items-center justify-between rounded-md border border-gray-300 px-3 py-2 text-sm cursor-pointer bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-colors"
>
  <span className="text-gray-900 truncate max-w-[85%] text-left">
    {formatted}
  </span>
  <CalendarIcon className="w-4 h-4 text-gray-500" />
</Popover.Button>

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-1 scale-95"
          >
            <Popover.Panel
              static
              className="absolute z-50 bottom-full mb-2 left-0 bg-white rounded-md shadow-xl border border-gray-200 w-[280px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-3 space-y-1">
                <Calendar
                  mode="range"
                  selected={draftRange}
                  onSelect={setDraftRange}
                  defaultMonth={draftRange?.from ?? today}
                  numberOfMonths={1}
                  weekStartsOn={1} // ✅ Start on Monday
                  initialFocus
                  showOutsideDays={false}
                  disabled={[{ before: today, dayOfWeek: [0, 6] }]}
                  className="text-xs shadow-none border-none"
                />

                <div className="flex justify-end gap-2 pt-1">
                 <button
                     onClick={() => handleCancel(close)}
                      className="text-xs cursor-pointer bg-white text-black border border-black px-3 py-1 rounded hover:bg-gray-100 transition"
                          >Cancel
                            
                  </button>
                  <button
                    onClick={() => handleConfirm(close)}
                    className="text-xs cursor-pointer bg-red-900 text-white px-3 py-1 rounded"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
