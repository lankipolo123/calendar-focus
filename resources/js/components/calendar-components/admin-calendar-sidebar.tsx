import { EventInput } from '@fullcalendar/core';
import { ChevronDown, Calendar, X } from 'lucide-react';

interface AdminSidebarProps {
  date: string | null;
  bookings: EventInput[];
  onClose: () => void;
}

export default function AdminCalendarSidebar({ date, bookings, onClose }: AdminSidebarProps) {
  if (!date) return null;

  return (
    <div className="w-[400px] h-full flex justify-center items-start pt-8">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-[360px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Booking Information
          </h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Dropdowns */}
          <div className="flex flex-col gap-3 mb-6">
            <button className="flex items-center justify-between text-sm text-gray-700 border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors">
              <span>Private Office</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="flex items-center justify-between text-sm text-gray-700 border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors">
              <span>Co-Working</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Booking Cards */}
          {bookings.length > 0 ? (
            bookings.map((event, index) => {
              const [name = '', location = ''] = event.title?.split(' – ') ?? [];

              return (
                <div
                  key={index}
                  className="border-l-[4px] border-cyan-400 bg-gray-50 rounded-lg border p-4 mb-4"
                >
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <img
                      src="https://i.pravatar.cc/40"
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      {/* Name and Location Tag */}
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
                        {location && (
                          <span className="text-xs bg-cyan-400 text-white px-2 py-1 rounded">
                            {location}
                          </span>
                        )}
                      </div>

                      {/* Timestamp */}
                      <p className="text-xs text-gray-400 mb-3">
                        {event.start instanceof Date
                          ? event.start.toLocaleString('en-US', {
                              day: '2-digit',
                              month: 'long', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: true,
                            })
                          : event.start}
                      </p>

                      {/* Contact Details */}
                      <div className="space-y-1 text-xs">
                        {event.extendedProps?.email && (
                          <div className="grid grid-cols-[90px_1fr] gap-1">
                            <span className="font-medium text-gray-700">Email:</span>
                            <span className="text-gray-500">{event.extendedProps.email}</span>
                          </div>
                        )}
                        {event.extendedProps?.contact && (
                          <div className="grid grid-cols-[90px_1fr] gap-1">
                            <span className="font-medium text-gray-700">Contact Num:</span>
                            <span className="text-gray-500">{event.extendedProps.contact}</span>
                          </div>
                        )}
                        {event.extendedProps?.delegation && (
                          <div className="grid grid-cols-[90px_1fr] gap-1">
                            <span className="font-medium text-gray-700">Delegation:</span>
                            <span className="text-gray-500">{event.extendedProps.delegation}</span>
                          </div>
                        )}
                        {event.start && (
                          <div className="grid grid-cols-[90px_1fr] gap-1">
                            <span className="font-medium text-gray-700">Appointment Date:</span>
                            <span className="text-gray-500">
                              {event.start instanceof Date
                                ? event.start.toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric',
                                  })
                                : event.start}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-sm text-gray-400 mt-10">No bookings on this date.</p>
          )}
        </div>
      </div>
    </div>
  );
}