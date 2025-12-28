function ConfirmModal({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "approve" // "approve" or "cancel"
}) {
  if (!isOpen) return null;

  const isApprove = type === "approve";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-title"
      aria-describedby="confirm-message"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 animate-fadeIn overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md my-8 transform transition-all animate-scaleIn">
        {/* Header with icon */}
        <div className={`px-6 pt-6 pb-4 border-b ${isApprove ? 'border-green-100' : 'border-red-100'}`}>
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${isApprove ? 'bg-green-100' : 'bg-red-100'
              }`}>
              {isApprove ? (
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </div>

            {/* Title */}
            <div className="flex-1">
              <h3 id="confirm-title" className="text-xl font-bold text-brand-dark">
                {title}
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p id="confirm-message" className="text-gray-600 leading-relaxed">
            {message}
          </p>
        </div>

        {/* Footer with actions */}
        <div className="px-6 pb-6 flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-lg font-semibold text-white active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isApprove
                ? 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500'
                : 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal