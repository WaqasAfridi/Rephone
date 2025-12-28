import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, Calendar, Clock, User, CheckCircle } from "lucide-react";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import useBookingState from "../hooks/useBookingState";

import Stepper from "../components/booking-flow/Stepper";
import ServicePicker from "../components/booking-flow/ServicePicker";
import DatePicker from "../components/booking-flow/DatePicker";
import SlotSelector from "../components/booking-flow/SlotSelector";
import UserForm from "../components/booking-flow/UserForm";
import ConfirmSummary from "../components/booking-flow/ConfirmSummary";
import ConfirmationModal from "../components/booking-flow/ConfirmationModal";


function Booking() {
  const navigate = useNavigate();
  const {
    draft,
    busySlotsForDate,
    setDate,
    selectService,
    selectSlot,
    updateUserDetails,
    confirmBooking,
  } = useBookingState();

  function deriveStep(draft) {
    if (!draft) return 1;
    if (!draft.service) return 1;
    if (!draft.date) return 2;
    if (!draft.slot) return 3;
    if (!draft.userDetails || !draft.userDetails.name) return 4;
    return 5;
  }

  const [step, setStep] = useState(() => deriveStep(draft));
  // i am using math min to make the stepthe minimum number so we can not miss on any step behind
  const displayedStep = Math.min(step, deriveStep(draft));

  const [message, setMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [recentAppt, setRecentAppt] = useState(null);
  const [isConfirming, setIsConfirming] = useState(false);

  function handleConfirmClick() {
    setMessage(null);
    setIsConfirming(true);

    // Simulate a brief processing delay for better UX feedback
    setTimeout(() => {
      const result = confirmBooking();

      if (!result.success) {
        setMessage(result.message);
        if (result.focusStep) setStep(result.focusStep);
        setIsConfirming(false);
        return;
      }

      setRecentAppt(result.appt);
      setModalOpen(true);
      setStep(1);
      setIsConfirming(false);
    }, 600);
  }

  function closeModalAndGoHome() {
    setModalOpen(false);
    setRecentAppt(null);
    navigate("/");
  }

  return (
    <>
      <Navbar />

      <main className="flex-1 mt-22 bg-white">
        <div className="w-[98%] max-w-7xl mx-auto py-12 px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold">
              <span className="text-brand-dark">Appointment</span>{" "}
              <span className="text-brand">Booking</span>
            </h1>
            <p className="mt-2 text-gray-600 max-w-2xl">
              Choose a service, pick a date & time, enter your details, and confirm. Your booking will be saved locally.
            </p>
          </div>

          <div className="mb-10">
            <Stepper current={displayedStep} />
          </div>

          <div>
            {message && (
              <div className="mb-4 rounded-xl bg-red-50 border-2 border-red-200 px-5 py-4 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-red-800">{message}</p>
                  </div>
                  <button
                    onClick={() => setMessage(null)}
                    className="shrink-0 text-red-400 hover:text-red-600 transition-colors"
                    aria-label="Dismiss message"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {displayedStep === 1 && (
              <section aria-labelledby="service-heading" className="mb-8 animate-slideUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-brand" />
                  </div>
                  <h2 id="service-heading" className="text-xl font-semibold text-brand-dark">Choose a Service</h2>
                </div>
                <ServicePicker selectedService={draft.service} onSelect={(id) => selectService(id)} />
                <div className="mt-6 flex gap-3">
                  <button
                    disabled={!draft.service}
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-lg bg-brand text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-all active:scale-95"
                  >
                    Next: Choose date
                  </button>
                </div>
              </section>
            )}

            {displayedStep === 2 && (
              <section aria-labelledby="date-heading" className="mb-8 animate-slideUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-brand" />
                  </div>
                  <h2 id="date-heading" className="text-xl font-semibold text-brand-dark">Pick a Date</h2>
                </div>
                <p className="text-sm text-gray-600 mb-3">Available slots are shown after selecting a date.</p>
                <DatePicker
                  value={draft.date || ""}
                  onChange={(d) => setDate(d)}
                  minDate={new Date().toISOString().slice(0, 10)}
                />
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button
                    disabled={!draft.date}
                    onClick={() => setStep(3)}
                    className="px-4 py-2 rounded-lg bg-brand text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-all active:scale-95"
                  >
                    Next: Choose slot
                  </button>
                </div>
              </section>
            )}

            {displayedStep === 3 && (
              <section aria-labelledby="slot-heading" className="mb-8 animate-slideUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-brand" />
                  </div>
                  <h2 id="slot-heading" className="text-xl font-semibold text-brand-dark">Choose a Time Slot</h2>
                </div>
                <p className="text-sm text-gray-600 mb-4">Showing availability for <strong>{draft.date}</strong></p>
                <SlotSelector
                  busySlots={busySlotsForDate(draft.date)}
                  selectedSlot={draft.slot}
                  onSelect={(s) => selectSlot(s)}
                />
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button
                    disabled={!draft.slot}
                    onClick={() => setStep(4)}
                    className="px-4 py-2 rounded-lg bg-brand text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-all active:scale-95"
                  >
                    Next: Your details
                  </button>
                </div>
              </section>
            )}

            {displayedStep === 4 && (
              <section aria-labelledby="details-heading" className="mb-8 animate-slideUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-brand" />
                  </div>
                  <h2 id="details-heading" className="text-xl font-semibold text-brand-dark">Your Details</h2>
                </div>
                <UserForm userDetails={draft.userDetails} onChange={updateUserDetails} />
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button
                    disabled={!draft.userDetails?.name}
                    onClick={() => setStep(5)}
                    className="px-4 py-2 rounded-lg bg-brand text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 transition-all active:scale-95"
                  >
                    Next: Confirm
                  </button>
                </div>
              </section>
            )}

            {displayedStep === 5 && (
              <section aria-labelledby="confirm-heading" className="mb-8 animate-slideUp">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-brand" />
                  </div>
                  <h2 id="confirm-heading" className="text-xl font-semibold text-brand-dark">Confirm Booking</h2>
                </div>

                <ConfirmSummary
                  items={[
                    ["Service", draft.service],
                    ["Date", draft.date],
                    ["Time", draft.slot],
                    ["Name", draft.userDetails?.name],
                    ["Phone", draft.userDetails?.phone],
                    ["Issue", draft.userDetails?.issue || "—"],
                  ]}
                />

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => setStep(4)}
                    className="px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-95"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirmClick}
                    disabled={isConfirming}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white font-semibold disabled:opacity-70 disabled:cursor-not-allowed transition-all hover:bg-red-700 active:scale-95"
                  >
                    {isConfirming ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Confirming...</span>
                      </>
                    ) : (
                      <span>Confirm Booking</span>
                    )}
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <ConfirmationModal open={modalOpen} appointment={recentAppt} onClose={closeModalAndGoHome} />
    </>
  );
}

export default Booking