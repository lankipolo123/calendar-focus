interface CalendarActionsProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function CalendarActions({
  onCancel,
  onConfirm,
}: CalendarActionsProps) {
  return (
    <div className="flex justify-end gap-2 pt-1">
      <button
        onClick={onCancel}
        className="text-xs cursor-pointer bg-white text-black border border-black px-3 py-1 rounded hover:bg-gray-100 transition"
      >
        Cancel
      </button>
      <button
        onClick={onConfirm}
        className="text-xs cursor-pointer bg-red-900 text-white px-3 py-1 rounded"
      >
        Confirm
      </button>
    </div>
  );
}
