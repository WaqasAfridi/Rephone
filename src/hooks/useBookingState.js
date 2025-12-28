import { useEffect, useMemo, useState } from "react";
import { services } from "../constants";
import { readLS, writeLS, generateId, toISODate } from "../utils";

/*
 useBookingState is created to manage the "in-process" booking, and the booked appointments (to store in local storage) and returns the helpers used by the page and components
 */
function useBookingState() {
	const [draft, setDraft] = useState(() =>
		readLS("bookingData", {
			service: null,
			date: null,
			slot: null,
			userDetails: { name: "", phone: "", issue: "" },
		})
	);

	const [appointments, setAppointments] = useState(() =>
		readLS("appointments", [])
	);

	// persist draft & appointments
	useEffect(() => {
		writeLS("bookingData", draft);
	}, [draft]);

	useEffect(() => {
		writeLS("appointments", appointments);
	}, [appointments]);

	const busySlotsForDate = useMemo(
		() => (date) => {
			if (!date) return [];
			return appointments.filter((a) => a.date === date).map((a) => a.slot);
		},
		[appointments]
	);

	function setDate(dateString) {
		const iso = toISODate(dateString);
		setDraft((prev) => ({ ...prev, date: iso, slot: null }));
	}

	function selectService(serviceIdOrName) {
		if (!serviceIdOrName) {
			setDraft((prev) => ({ ...prev, service: null, slot: null }));
			return;
		}

		const svc =
			typeof serviceIdOrName === "number" ||
			/^\d+$/.test(String(serviceIdOrName))
				? services.find((s) => s.id === Number(serviceIdOrName))
				: services.find((s) => s.name === String(serviceIdOrName));

		setDraft((prev) => ({
			...prev,
			service: svc ? svc.name : String(serviceIdOrName),
			slot: null,
		}));
	}

	function selectSlot(slot) {
		setDraft((prev) => ({ ...prev, slot }));
	}

	function updateUserDetails(patch) {
		setDraft((prev) => ({
			...prev,
			userDetails: { ...prev.userDetails, ...patch },
		}));
	}

	/**
	 * confirmBooking
	 * returns -> success: boolean, appt?: object, message?: string, focusStep?: number }
	 */
	function confirmBooking() {
		// basic validation
		if (
			!draft.service ||
			!draft.date ||
			!draft.slot ||
			!draft.userDetails?.name ||
			!draft.userDetails?.phone
		) {
			return {
				success: false,
				message: "Please complete all required fields including phone number.",
			};
		}

		// Add phone format validation
		if (draft.userDetails.phone.length < 11) {
			return {
				success: false,
				message: "Please enter a valid 11-digit phone number.",
			};
		}

		// Race-check
		const taken = appointments.some(
			(a) => a.date === draft.date && a.slot === draft.slot
		);
		if (taken) {
			// reset slot on race and request user to re-pick
			setDraft((prev) => ({ ...prev, slot: null }));
			return {
				success: false,
				message: "Sorry — the slot was just taken. Please select another.",
				focusStep: 3,
			};
		}

		const newAppt = {
			id: generateId(),
			service: draft.service,
			date: draft.date,
			slot: draft.slot,
			customer: {
				name: draft.userDetails.name,
				phone: draft.userDetails.phone,
				issue: draft.userDetails.issue,
			},
			status: "Pending",
			createdAt: new Date().toISOString(),
		};

		// persist
		setAppointments((prev) => {
			const next = [...prev, newAppt];
			writeLS("appointments", next);
			return next;
		});

		// clear draft
		const cleared = {
			service: null,
			date: null,
			slot: null,
			userDetails: { name: "", phone: "", issue: "" },
		};
		setDraft(cleared);

		return { success: true, appt: newAppt };
	}

	// Expose everything needed by the page / components
	return {
		draft,
		appointments,
		busySlotsForDate,
		setDate,
		selectService,
		selectSlot,
		updateUserDetails,
		confirmBooking,
		setDraft,
		setAppointments,
	};
}

export default useBookingState