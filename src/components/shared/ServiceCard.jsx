import {
  Smartphone,
  BatteryCharging,
  Droplet,
  Usb,
  Camera,
  Volume2,
  Cpu,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP = {
  Smartphone,
  BatteryCharging,
  Droplet,
  Usb,
  Camera,
  Volume2,
  Cpu,
  Fingerprint,
};

/*ServiceCard is Used in: Homepage (Common Repairs) & Booking (Service Picker)*/
function ServiceCard({
  service,
  isSelected = false,
  onSelect = null,
  variant = "display"
}) {
  const Icon = ICON_MAP[service.icon];
  const isSelectable = variant === "selectable";

  const Component = isSelectable ? "button" : "div";

  return (
    <Component
      onClick={isSelectable ? () => onSelect(service.id) : undefined}
      aria-pressed={isSelectable ? isSelected : undefined}
      aria-label={`${service.name}: ${service.description}`}
      className={[
        "group relative flex flex-col bg-white rounded-2xl border overflow-hidden transition-all duration-300",
        "focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 focus-visible:ring-offset-2",

        isSelectable && isSelected
          ? "border-brand shadow-lg shadow-brand/20 scale-[1.02]"
          : "border-gray-200 shadow-sm",

        isSelectable && !isSelected
          ? "hover:border-brand/50 hover:shadow-md hover:-translate-y-1"
          : "hover:shadow-xl hover:-translate-y-1",

        isSelectable ? "cursor-pointer" : "cursor-default",
      ].join(" ")}
    >
      {/* Selection Indicator Bar */}
      {isSelected && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-brand to-red-600" />
      )}

      {/* Glow Effect */}
      <span
        aria-hidden="true"
        className="absolute -z-10 inset-0 bg-[radial-gradient(ellipse_at_center,rgba(237,27,36,0.08),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Content */}
      <div className="p-6">
        {/* Header: Icon + Badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          {/* Icon */}
          <div className={[
            "shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm",
            isSelected
              ? "bg-brand text-white shadow-brand/30"
              : "bg-red-50 text-brand group-hover:bg-red-100",
          ].join(" ")}>
            {Icon && <Icon className="w-7 h-7" strokeWidth={2} />}
          </div>

          {/* Badge */}
          {isSelectable && (
            <div className={[
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all",
              isSelected
                ? "bg-brand text-white"
                : "bg-gray-100 text-gray-500 group-hover:bg-gray-200",
            ].join(" ")}>
              {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
              {isSelected ? "Selected" : "Select"}
            </div>
          )}
        </div>

        {/* Name */}
        <h3 className="text-lg font-bold text-brand-dark mb-2 leading-tight">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-extrabold text-brand">
              ${service.price}
            </span>
            <span className="text-xs text-gray-500">USD</span>
          </div>
          <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full">
            {service.type}
          </span>
        </div>
      </div>

      {/* Hover Arrow (display only) */}
      {!isSelectable && (
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <svg className="w-5 h-5 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </div>
      )}
    </Component>
  );
}

export default ServiceCard