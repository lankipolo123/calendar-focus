import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import CalendarDateRangePopover from '@/components/calendar-components/calendar-date-range-popover';
import { DateRange } from 'react-day-picker';
import { LOCATIONS, ROOM_TYPES } from '@/Utils/booking-utils';
import SelectInput from '@/components/calendar-components/select-inputs';

interface BookingDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (
    location: string,
    roomType: string,
    range: DateRange,
    days: number
  ) => void;
  initialRange: DateRange;
}

export default function BookingDialog({
  open,
  onClose,
  onConfirm,
  initialRange,
}: BookingDialogProps) {
  const [range, setRange] = useState<DateRange | undefined>(initialRange);
  const [location, setLocation] = useState(LOCATIONS[0].value);
  const [roomType, setRoomType] = useState(ROOM_TYPES[0].value);

  useEffect(() => {
    setRange(initialRange);
  }, [initialRange]);

  const handleConfirm = () => {
    if (!range?.from || !range?.to) return;
    const days =
      Math.floor((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    onConfirm(location, roomType, range, days);
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-[90vw] max-w-md sm:max-w-lg md:max-w-xl rounded-lg bg-white p-6 shadow-xl">
              <Dialog.Title className="text-lg font-semibold mb-2">
                Confirm Booking
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-500 mb-4">
                Select your location, room type, and booking dates.
              </Dialog.Description>

              <div className="mb-3">
                <SelectInput
                  label="Select Location"
                  value={location}
                  onChange={setLocation}
                  options={LOCATIONS}
                />
              </div>

              <div className="mb-3">
                <SelectInput
                  label="Select Room Type"
                  value={roomType}
                  onChange={setRoomType}
                  options={ROOM_TYPES}
                />
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block">
                  Select Booking Dates
                </label>
                <CalendarDateRangePopover dateRange={range} onChange={setRange} />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={onClose}
                  className="text-sm cursor-pointer bg-white text-red-900 px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="text-sm cursor-pointer bg-red-900 text-white px-3 py-1 rounded"
                >
                  Confirm
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
