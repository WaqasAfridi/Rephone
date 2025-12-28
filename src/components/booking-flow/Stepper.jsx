function Stepper({ current = 1 }) {
  const steps = [
    { id: 1, title: "Service" },
    { id: 2, title: "Date" },
    { id: 3, title: "Slot" },
    { id: 4, title: "Details" },
    { id: 5, title: "Confirm" },
  ];

  const currentIndex = current - 1;
  const lastIndex = steps.length - 1;

  return (
    <nav aria-label="Booking steps">
      <div className="flex flex-col">
        {/* Circles + Lines */}
        <div className="flex items-center w-full">
          {steps.map((s, idx) => {
            const done = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div key={s.id} className="flex items-center w-full">
                {/* Step circle */}
                <div className="flex-none flex items-center justify-center w-12">
                  <div
                    className={[
                      "w-12 h-12 rounded-full flex items-center justify-center font-semibold z-10 transition-colors duration-300",
                      done
                        ? "bg-brand text-white"
                        : isCurrent
                          ? "border-2 border-brand text-brand"
                          : "border border-gray-300 text-gray-500 hover:border-gray-400",
                    ].join(" ")}
                    aria-current={isCurrent ? "step" : undefined}
                  >
                    {done ? "✓" : s.id}
                  </div>
                </div>

                {/* Connecting line */}
                {idx < lastIndex && (
                  <div className="flex-1 px-2">
                    <div className="h-1 rounded-full bg-gray-300 overflow-hidden">
                      <div
                        className={[
                          "h-full bg-brand origin-left transition-transform duration-500 ease-out",
                          idx < currentIndex ? "scale-x-100" : "scale-x-0",
                        ].join(" ")}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step titles */}
        <div className="flex items-start mt-3">
          {steps.map((s, idx) => (
            <div key={s.id} className="flex items-center w-full">
              <div className="flex-none flex items-center justify-center w-12">
                <div className="text-sm text-center w-20 text-gray-600">
                  {s.title}
                </div>
              </div>
              {idx < lastIndex && <div className="flex-1 px-2" aria-hidden />}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Stepper