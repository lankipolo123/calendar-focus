import { EventInput } from '@fullcalendar/core';
import { ChevronDown } from 'lucide-react';

interface AdminSidebarProps {
  date: string | null;
  bookings: EventInput[];
  onClose: () => void;
}

export default function AdminCalendarSidebar({ date, bookings, onClose }: AdminSidebarProps) {
  if (!date) return null;

  return (
    <div className="w-[360px] bg-white h-full p-6 border-l border-gray-200 shadow-lg overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <span className="text-xl">🎟️</span> Booking Information
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
      </div>

      {/* Dropdowns */}
      <div className="flex flex-col gap-2 items-center text-sm text-gray-700 mb-6">
        <button className="flex items-center gap-1">
          Private Office <ChevronDown className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-1">
          Co-Working <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Booking Cards */}
      {bookings.length > 0 ? (
        bookings.map((event, index) => {
          const [name = '', location = ''] = event.title?.split(' – ') ?? [];

          return (
            <div
              key={index}
              className="flex border-l-[4px] border-cyan-400 bg-white rounded-lg shadow-sm p-4 mb-4"
            >
              {/* Avatar */}
              <img
                src="https://i.pravatar.cc/32"
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover mr-3"
              />

              {/* Info */}
              <div className="flex-1 text-[13px]">
                <div className="flex justify-between items-center mb-[2px]">
                  <p className="font-semibold text-gray-800">{name}</p>
                  <span className="text-[10px] bg-cyan-400 text-white px-2 py-[1px] rounded-full">
                    {location}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mb-3">
                  {event.start instanceof Date
                    ? event.start.toLocaleString('en-US', {
                        day: '2-digit',
                        month: 'long',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })
                    : event.start}
                </p>

                <div className="space-y-1 text-[12.5px] text-gray-700">
                  {event.extendedProps?.email && (
                    <p>
                      <span className="font-medium text-gray-600">Email:</span>{' '}
                      <span className="text-gray-400 italic">{event.extendedProps.email}</span>
                    </p>
                  )}
                  {event.extendedProps?.contact && (
                    <p>
                      <span className="font-medium text-gray-600">Contact Num:</span>{' '}
                      {event.extendedProps.contact}
                    </p>
                  )}
                  {event.extendedProps?.delegation && (
                    <p>
                      <span className="font-medium text-gray-600">Delegation:</span>{' '}
                      {event.extendedProps.delegation}
                    </p>
                  )}
                  {event.start && (
                    <p>
                      <span className="font-medium text-gray-600">Appointment Date:</span>{' '}
                      {event.start instanceof Date
                        ? event.start.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric',
                          })
                        : event.start}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-sm text-gray-400 mt-10">No bookings on this date.</p>
      )}
    </div>
  );
}
