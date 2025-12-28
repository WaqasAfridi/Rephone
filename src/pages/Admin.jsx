import { useMemo, useState } from "react";
import { Calendar, Clock, User, CheckCircle, XCircle, Eye, Wrench } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import ConfirmModal from "../components/admin-dashboard/ConfirmModal";
import AppointmentDetailsModal from "../components/admin-dashboard/AppointmentDetailsModal";
import { readLS, writeLS } from "../utils";

const PAGE_SIZES = [10, 25, 50];

function Admin() {
  const [appointments, setAppointments] = useState(() =>
    readLS("appointments", [])
  );
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    appointmentId: null,
    newStatus: null,
    type: "approve",
  });

  // persist appointments whenever they change
  writeLS("appointments", appointments);

  function requestStatusChange(id, status) {
    setConfirmModal({
      isOpen: true,
      appointmentId: id,
      newStatus: status,
      type: status === "Cancelled" ? "cancel" : "approve",
    });
  }

  function handleConfirmStatusChange() {
    const { appointmentId, newStatus } = confirmModal;
    setAppointments((prev) =>
      prev.map((a) => (a.id === appointmentId ? { ...a, status: newStatus } : a))
    );
    // After a status change, reset to first page (user expects to see top of list)
    setPage(1);

    setConfirmModal({ isOpen: false, appointmentId: null, newStatus: null, type: "approve" });
  }

  function handleCancelConfirmation() {
    setConfirmModal({ isOpen: false, appointmentId: null, newStatus: null, type: "approve" });
  }

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((a) => {
        const statusMatch = filter === "All" || a.status === filter;
        const dateMatch = !dateFilter || a.date === dateFilter;
        return statusMatch && dateMatch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [appointments, filter, dateFilter]);

  // total pages based on current filter & pageSize
  const totalPages = Math.max(1, Math.ceil(filteredAppointments.length / pageSize));

  // currentPage is derived (clamped) so we don't call setState in effects
  const currentPage = Math.min(Math.max(1, page), totalPages);

  // Desktop: slice for current page (use derived currentPage)
  const paginatedAppointments = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAppointments.slice(start, start + pageSize);
  }, [filteredAppointments, currentPage, pageSize]);

  // Mobile: display cumulative pages so "Load more" feels natural
  const mobileDisplayedAppointments = useMemo(() => {
    const end = currentPage * pageSize;
    return filteredAppointments.slice(0, end);
  }, [filteredAppointments, currentPage, pageSize]);

  // UI helpers (clamp when setting)
  function goToPage(n) {
    const next = Math.min(Math.max(1, n), totalPages);
    setPage(next);
    // scroll to top of table list (simple UX)
    const el = document.querySelector(".admin-table-anchor");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function prevPage() {
    setPage((p) => Math.max(1, p - 1));
  }

  function nextPage() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  function loadMoreMobile() {
    setPage((p) => Math.min(totalPages, p + 1));
  }

  function showLessMobile() {
    setPage(1);
  }

  // Handlers that change filters must also reset page to 1 (do it at event time)
  function handleSetFilter(s) {
    setFilter(s);
    setPage(1);
  }

  function handleDateFilterChange(value) {
    setDateFilter(value);
    setPage(1);
  }

  function handleClearDateFilter() {
    setDateFilter("");
    setPage(1);
  }

  function handlePageSizeChange(v) {
    setPageSize(v);
    setPage(1); // reset to first page when page size changes
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 mt-22 bg-gray-50">
        <div className="w-[98%] max-w-7xl mx-auto py-12 px-4 sm:px-6">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              <span className="text-brand-dark">Admin</span>{" "}
              <span className="text-brand">Dashboard</span>
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Manage appointments, review details, and update booking statuses.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between bg-white p-4 rounded-xl border shadow-sm">
            {/* Status pills */}
            <div className="flex flex-wrap gap-2">
              {["All", "Pending", "Approved", "Cancelled"].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSetFilter(s)}
                  className={[
                    "px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all",
                    filter === s
                      ? "bg-brand text-white border-brand shadow-md shadow-brand/30"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Date filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => handleDateFilterChange(e.target.value)}
                className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-brand transition-colors"
              />

              {dateFilter && (
                <button
                  onClick={handleClearDateFilter}
                  className="px-3 py-2 rounded-lg border-2 border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* MOBILE VIEW (cards) */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {mobileDisplayedAppointments.map((a) => (
              <div
                key={a.id}
                className="bg-white border-2 border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <div className="font-bold text-brand-dark">
                        {a.service}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {a.date}
                        <Clock className="w-3.5 h-3.5 ml-1" />
                        {a.slot}
                      </div>
                    </div>
                  </div>
                  <StatusBadge status={a.status} />
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-lg">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">{a.customer.name}</span>
                  <span className="text-gray-400">·</span>
                  <span>{a.customer.phone}</span>
                </div>

                <div className="flex gap-2">
                  {a.status !== "Approved" && (
                    <button
                      onClick={() => requestStatusChange(a.id, "Approved")}
                      className="flex-1 px-3 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  )}

                  {a.status !== "Cancelled" && (
                    <button
                      onClick={() => requestStatusChange(a.id, "Cancelled")}
                      className="flex-1 px-3 py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-sm font-bold hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => setSelected(a)}
                    className="flex-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-gray-700 text-sm font-bold hover:bg-gray-50 transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            ))}

            {/* mobile load more / show less */}
            {filteredAppointments.length === 0 && <EmptyState />}

            {filteredAppointments.length > 0 && mobileDisplayedAppointments.length < filteredAppointments.length && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={loadMoreMobile}
                  className="px-4 py-2 rounded-lg bg-brand text-white font-semibold shadow-sm"
                >
                  Load more
                </button>
              </div>
            )}

            {mobileDisplayedAppointments.length >= filteredAppointments.length && filteredAppointments.length > pageSize && (
              <div className="flex justify-center mt-2">
                <button
                  onClick={showLessMobile}
                  className="px-4 py-2 rounded-lg border"
                >
                  Show less
                </button>
              </div>
            )}
          </div>

          {/* DESKTOP TABLE */}
          <div className="hidden md:block bg-white rounded-2xl border-2 border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto admin-table-anchor">
              <table className="w-full">
                <thead>
                  <tr className="bg-linear-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        <Wrench className="w-4 h-4 text-brand" />
                        Service
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        <User className="w-4 h-4 text-brand" />
                        Customer
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        <Calendar className="w-4 h-4 text-brand" />
                        Date
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        <Clock className="w-4 h-4 text-brand" />
                        Time
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <div className="flex items-center gap-2 text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Status
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center">
                      <div className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                        Actions
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedAppointments.map((a, index) => (
                    <tr
                      key={a.id}
                      className={[
                        "transition-all hover:bg-red-50/30 group",
                        index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                      ].join(" ")}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                            <Wrench className="w-5 h-5 text-brand" />
                          </div>
                          <span className="font-bold text-brand-dark">{a.service}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{a.customer.name}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{a.customer.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-medium">{a.date}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-700 font-medium">{a.slot}</span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={a.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {a.status !== "Approved" && (
                            <button
                              onClick={() => requestStatusChange(a.id, "Approved")}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
                              title="Approve booking"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              Approve
                            </button>
                          )}
                          {a.status !== "Cancelled" && (
                            <button
                              onClick={() => requestStatusChange(a.id, "Cancelled")}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-red-200 text-red-600 text-xs font-bold hover:bg-red-50 transition-all active:scale-95"
                              title="Cancel booking"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => setSelected(a)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border-2 border-gray-200 text-gray-700 text-xs font-bold hover:bg-gray-50 transition-all active:scale-95"
                            title="View details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Desktop pagination controls */}
            <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min((currentPage - 1) * pageSize + 1, filteredAppointments.length)}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-gray-900">
                  {Math.min(currentPage * pageSize, filteredAppointments.length)}
                </span>{" "}
                of <span className="font-semibold text-gray-900">{filteredAppointments.length}</span> appointments
              </div>

              <div className="flex items-center gap-3">
                {/* Page size selector */}
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">Rows:</label>
                  <select
                    value={pageSize}
                    onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    className="px-2 py-1 border rounded-lg text-sm"
                    aria-label="Rows per page"
                  >
                    {PAGE_SIZES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prev */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border bg-white text-sm disabled:opacity-50"
                  aria-label="Previous page"
                >
                  Prev
                </button>

                {/* Page numbers - show a small window around current */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const n = i + 1;
                    // show only the first, last, current, and ±1 around current
                    if (
                      n === 1 ||
                      n === totalPages ||
                      Math.abs(n - currentPage) <= 1
                    ) {
                      return (
                        <button
                          key={n}
                          onClick={() => goToPage(n)}
                          aria-current={n === currentPage ? "page" : undefined}
                          className={[
                            "px-3 py-1 rounded-md text-sm font-medium",
                            n === currentPage ? "bg-brand text-white" : "bg-white border",
                          ].join(" ")}
                        >
                          {n}
                        </button>
                      );
                    }
                    // render ellipsis when skipping a range
                    const isLeftEllipsis = n === currentPage - 2 && n > 1;
                    const isRightEllipsis = n === currentPage + 2 && n < totalPages;
                    if (isLeftEllipsis || isRightEllipsis) {
                      return (
                        <span key={`ell-${n}`} className="px-2">…</span>
                      );
                    }
                    return null;
                  })}
                </div>

                {/* Next */}
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border bg-white text-sm disabled:opacity-50"
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </div>

            {filteredAppointments.length === 0 && <EmptyState />}
          </div>
        </div>
      </main>

      <Footer />

      <AppointmentDetailsModal
        appointment={selected}
        onClose={() => setSelected(null)}
      />

      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onConfirm={handleConfirmStatusChange}
        onCancel={handleCancelConfirmation}
        type={confirmModal.type}
        title={confirmModal.type === "approve" ? "Approve Booking?" : "Cancel Booking?"}
        message={
          confirmModal.type === "approve"
            ? "Are you sure you want to approve this booking? The customer will be notified of the approval."
            : "Are you sure you want to cancel this booking? This action will update the booking status to cancelled."
        }
        confirmText={confirmModal.type === "approve" ? "Yes, Approve" : "Yes, Cancel"}
        cancelText="Go Back"
      />
    </>
  );
}

function StatusBadge({ status }) {
  const config = {
    Pending: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-200",
      dot: "bg-yellow-500",
    },
    Approved: {
      bg: "bg-green-100",
      text: "text-green-700",
      border: "border-green-200",
      dot: "bg-green-500",
    },
    Cancelled: {
      bg: "bg-red-100",
      text: "text-red-700",
      border: "border-red-200",
      dot: "bg-red-500",
    },
  };

  const { bg, text, border, dot } = config[status] || config.Pending;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border-2 ${bg} ${text} ${border}`}>
      <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
      {status}
    </span>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 px-4">
      <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
        <Calendar className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">No appointments found</h3>
      <p className="text-gray-500">Try adjusting your filters or check back later.</p>
    </div>
  );
}

export default Admin