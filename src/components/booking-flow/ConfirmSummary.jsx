import { Wrench, Calendar, Clock, User, Phone, FileText } from "lucide-react";

const iconMap = {
  Service: Wrench,
  Date: Calendar,
  Time: Clock,
  Name: User,
  Phone: Phone,
  Issue: FileText,
};

function ConfirmSummary({ items = [] }) {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-linear-to-r from-brand to-red-600 px-6 py-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Review Your Booking Details
        </h3>
        <p className="text-sm text-red-50 mt-1">Please verify all information before confirming</p>
      </div>

      {/* Content */}
      <div className="p-6">
        <dl className="space-y-4">
          {items.map(([label, value], index) => {
            const Icon = iconMap[label];
            const isLast = index === items.length - 1;

            return (
              <div key={label}>
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  {Icon && (
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
                      {label}
                    </dt>
                    <dd className="text-base font-semibold text-brand-dark wrap-break-words">
                      {value}
                    </dd>
                  </div>
                </div>

                {/* Divider (except last item) */}
                {!isLast && (
                  <div className="mt-4 border-t border-gray-100" />
                )}
              </div>
            );
          })}
        </dl>
      </div>

      {/* Footer Note */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-brand shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-gray-600">
            Your booking will be saved and you'll receive a confirmation. You can view or modify your booking status from the admin dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmSummary