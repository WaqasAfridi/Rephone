import { Wrench, Calendar, Clock, User, Phone, FileText, CheckCircle2, XCircle } from "lucide-react";

const iconMap = {
  Service: Wrench,
  Date: Calendar,
  Time: Clock,
  Name: User,
  Phone: Phone,
  Issue: FileText,
};

function ConfirmationModal({ open, appointment, onClose }) {
  if (!open || !appointment) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 animate-fadeIn overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl my-8 animate-scaleIn">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[calc(100vh-4rem)] flex flex-col">

          {/* Success Header with Animation */}
          <div className="relative bg-linear-to-br from-green-50 to-emerald-50 px-8 py-8 border-b border-green-100 shrink-0">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/20 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200/20 rounded-full -ml-12 -mb-12" />

            <div className="relative flex items-start gap-4">
              {/* Animated Success Icon */}
              <div className="shrink-0">
                <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/50 animate-bounce">
                  <CheckCircle2 className="w-9 h-9 text-white" strokeWidth={2.5} />
                </div>
              </div>

              {/* Title */}
              <div className="flex-1">
                <h3 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Booking Confirmed! 🎉
                </h3>
                <p className="mt-2 text-base text-gray-600">
                  Your appointment has been successfully scheduled. We've saved all the details below.
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="shrink-0 w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <XCircle className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Booking Details */}
          <div className="px-8 py-6 overflow-y-auto flex-1">
            <div className="bg-linear-to-br from-gray-50 to-gray-100/50 rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                <dl className="space-y-5">
                  {[
                    ["Service", appointment.service],
                    ["Date", appointment.date],
                    ["Time", appointment.slot],
                    ["Name", appointment.customer.name],
                    ["Phone", appointment.customer.phone],
                    ["Issue", appointment.customer.issue || "Not specified"],
                    ["Status", appointment.status],
                  ].map(([label, value]) => {
                    const Icon = iconMap[label];
                    const isStatus = label === "Status";

                    return (
                      <div key={label} className="flex items-start gap-4">
                        {/* Icon */}
                        {Icon && (
                          <div className="shrink-0 w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shadow-sm">
                            <Icon className="w-5 h-5 text-brand" />
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            {label}
                          </dt>
                          <dd className={`text-base font-bold wrap-break-words ${isStatus ? "text-yellow-600" : "text-gray-900"
                            }`}>
                            {isStatus && (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                                {value}
                              </span>
                            )}
                            {!isStatus && value}
                          </dd>
                        </div>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>

            {/* Info Message */}
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-900">
                    What's next?
                  </p>
                  <p className="mt-1 text-sm text-blue-700">
                    Your booking is currently pending review. An admin will approve it shortly. You can check the status anytime in the admin dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-200 shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Secondary Info */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Booking ID: {appointment.id.slice(0, 12)}...</span>
              </div>

              {/* Primary Button */}
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand hover:bg-red-700 text-white font-bold shadow-lg shadow-brand/30 hover:shadow-xl hover:shadow-brand/40 transition-all duration-200 active:scale-95"
              >
                Done — Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal
