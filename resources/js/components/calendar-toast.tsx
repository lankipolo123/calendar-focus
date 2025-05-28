// components/calendar-toast.ts
import { TriangleAlert, XCircle } from 'lucide-react';
import { toast } from 'sonner';


export function showPastDateError() {
  toast.custom((t) => (
    <div className="w-[360px] bg-white shadow-md rounded-md border-l-7 border-red-900 flex items-stretch px-4 py-3 space-x-3">
      {/* Icon */}
      <div className="flex items-start pt-1 text-red-900">
        <TriangleAlert size={20}/>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="font-semibold text-red-900">ERROR</p>
        <p className="text-sm text-gray-700">
          Past dates not allowed. Pick a future date
        </p>
      </div>
      {/* Dismiss Button */}
      <button
        onClick={() => toast.dismiss(t)}
        className="ml-2 text-gray-500 hover:text-red-700"
      >
       <XCircle size={13} />
      </button>
    </div>
  ));
}


export function showBookingSuccess() {
  toast.success("✅ Booking successful!");
}

export function showBookingFailed() {
  toast.error("❌ Booking failed. Please try again.");
}
