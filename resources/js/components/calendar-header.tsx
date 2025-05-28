import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  onPrev: () => void;
  onNext: () => void;
  currentMonth: string;
  branch: string;
  onBranchChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export default function CalendarHeader({
  onPrev,
  onNext,
  currentMonth,
  branch,
  onBranchChange,
  search,
  onSearchChange,
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-2 bg-white border-t border-l border-r border-gray-400 rounded-t-xl">
      {/* Left side: Arrows + Month label */}
      <div className="flex items-center gap-2 mb-2 sm:mb-0">
        <button onClick={onPrev} className="bg-white border border-[#c1c1c1] rounded px-2 py-1 shadow text-sm">
          <ChevronLeft size={12} />
        </button>
        <span className="text-sm font-medium text-gray-800">{currentMonth}</span>
        <button onClick={onNext} className="bg-white border border-[#c1c1c1] rounded px-2 py-1 shadow text-sm">
          <ChevronRight size={12} />
        </button>
      </div>

      {/* Right side: Search + Filter + Branch */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="text-sm border border-[#c1c1c1] px-3 py-1 rounded bg-gray-50"
        />
        <button className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
          Co-working
        </button>
        <select
          value={branch}
          onChange={(e) => onBranchChange(e.target.value)}
          className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800 font-medium"
        >
          <option>Main Branch</option>
          <option>QC Office</option>
          <option>Taguig</option>
        </select>
      </div>
    </div>
  );
}
