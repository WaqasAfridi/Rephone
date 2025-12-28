import { timeSlots } from "../../constants";
import { Clock } from "lucide-react";

function SlotSelector({ busySlots = [], selectedSlot, onSelect }) {
  const allSlotsBooked = busySlots.length === timeSlots.length;

  const handleKeyDown = (e, slot, disabled) => {
    // Allow keyboard selection with Enter or Space
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onSelect(slot);
    }
  };

  return (
    <div className="space-y-4">
      {/* Empty Slots Warning */}
      {allSlotsBooked && (
        <div className="p-4 rounded-xl bg-red-50 border-2 border-red-200 animate-fadeIn">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-red-800">All slots booked for this date</p>
              <p className="text-sm text-red-600 mt-1">Please choose another date to see available time slots.</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-brand" />
          <h3 className="text-base font-semibold text-gray-900">Available Time Slots</h3>
        </div>
        <span className="text-sm text-gray-500">
          {timeSlots.length - busySlots.length} of {timeSlots.length} available
        </span>
      </div>

      {/* Slots Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {timeSlots.map((slot) => {
          const disabled = busySlots.includes(slot);
          const selected = selectedSlot === slot;

          return (
            <button
              key={slot}
              disabled={disabled}
              onClick={() => !disabled && onSelect(slot)}
              onKeyDown={(e) => handleKeyDown(e, slot, disabled)}
              className={[
                "relative px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-200",
                disabled
                  ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                  : selected
                    ? "bg-brand text-white border-brand shadow-lg shadow-brand/30 scale-105"
                    : "bg-white border-gray-200 text-gray-700 hover:border-brand hover:bg-brand/5 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand/50",
              ].join(" ")}
              aria-pressed={selected}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
            >
              <div className="flex flex-col items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{slot}</span>
              </div>

              {disabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-500 bg-white/80 px-2 py-1 rounded-full">
                    Booked
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded border-2 border-gray-200 bg-white" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded border-2 border-brand bg-brand" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 rounded border-2 border-gray-200 bg-gray-100" />
          <span>Booked</span>
        </div>
        <div className="ml-auto text-gray-500 italic">
          Use keyboard (Enter/Space) to select
        </div>
      </div>
    </div>
  );
}

export default SlotSelector