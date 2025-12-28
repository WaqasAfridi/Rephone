import { X, Wrench, Calendar, Clock, User, Phone, FileText, AlertCircle } from "lucide-react";

const statuses = {
  Pending: { label: "bg-yellow-100 text-yellow-700 border-yellow-200", dot: "bg-yellow-500" },
  Approved: { label: "bg-green-100 text-green-700 border-green-200", dot: "bg-green-500" },
  Cancelled: { label: "bg-red-100 text-red-700 border-red-200", dot: "bg-red-500" },
};

const icons = {
  Service: Wrench,
  Date: Calendar,
  Time: Clock,
  Name: User,
  Phone: Phone,
  Issue: FileText,
};

function AppointmentDetailsModal({ appointment, onClose }) {
  if (!appointment) return null;

  const style = statuses[appointment.status] || statuses.Pending;
  const dataPoints = [
    { key: "Service", val: appointment.service },
    { key: "Date", val: appointment.date },
    { key: "Time", val: appointment.slot },
    { key: "Name", val: appointment.customer.name },
    { key: "Phone", val: appointment.customer.phone },
    { key: "Issue", val: appointment.customer.issue || "None provided" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scaleIn">
        <div className="flex items-center justify-between px-8 py-6 bg-slate-50 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-brand rounded-xl shadow-lg shadow-brand/20">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Appointment Overview</h3>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-tighter">ID: {appointment.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataPoints.map(({ key, val }) => {
              const Icon = icons[key];
              return (
                <div key={key} className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-widest">{key}</span>
                    <span className="text-slate-900 font-semibold">{val}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <AlertCircle size={18} className="text-slate-400" />
                <span className="text-sm font-medium text-slate-600">Current Status</span>
              </div>
              <div className={`px-4 py-1.5 rounded-full border ${style.label} text-sm font-bold flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full ${style.dot} animate-pulse`} />
                {appointment.status}
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors">
            Dismiss
          </button>
          <button onClick={onClose} className="px-8 py-2.5 bg-brand text-white rounded-xl font-bold shadow-lg shadow-brand/20 hover:brightness-110 active:scale-95 transition-all">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsModal