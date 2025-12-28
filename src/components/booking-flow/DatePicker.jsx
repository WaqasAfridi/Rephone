function DatePicker({ value, onChange, minDate, maxDate }) {
  const minVal = minDate || new Date().toISOString().slice(0, 10);

  // Default max date: 30 days from today
  const defaultMaxDate = new Date();
  defaultMaxDate.setDate(defaultMaxDate.getDate() + 30);
  const maxVal = maxDate || defaultMaxDate.toISOString().slice(0, 10);

  return (
    <div className="space-y-2">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={minVal}
        max={maxVal}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
        aria-label="Choose appointment date"
      />
      <p className="text-xs text-gray-500 flex items-center gap-1">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        You can book up to 30 days in advance
      </p>
    </div>
  );
}

export default DatePicker