import { User, Phone, FileText } from "lucide-react";

function UserForm({ userDetails = {}, onChange }) {
  return (
    <div className="space-y-4">
      {/* Name Field */}
      <div className="space-y-2">
        <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <User className="w-4 h-4 text-brand" />
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter your full name"
          value={userDetails.name || ""}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
          required
        />
      </div>

      {/* Phone Field */}
      <div className="space-y-2">
        <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <Phone className="w-4 h-4 text-brand" />
          Phone Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="03XX-XXXXXXX (11 digits)"
          value={userDetails.phone || ""}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, ''); // Only numbers
            onChange({ phone: value.slice(0, 11) }); // enforce max length defensively
          }}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all"
          pattern="[0-9]{11}"
          maxLength={11}
          required
        />
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Enter 11-digit mobile number (e.g., 03001234567)
        </p>
      </div>

      {/* Issue Description Field */}
      <div className="space-y-2">
        <label htmlFor="issue" className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FileText className="w-4 h-4 text-brand" />
          Issue Description <span className="text-gray-400 font-normal">(Optional)</span>
        </label>
        <textarea
          id="issue"
          placeholder="Describe the problem with your device..."
          value={userDetails.issue || ""}
          onChange={(e) => onChange({ issue: e.target.value })}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-base focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all resize-none"
          rows={4}
        />
      </div>
    </div>
  );
}

export default UserForm