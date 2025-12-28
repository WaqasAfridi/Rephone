export function generateId() {
	return crypto.randomUUID();
}

export function readLS(key, fallback) {
	try {
		const v = localStorage.getItem(key);
		return v ? JSON.parse(v) : fallback;
	} catch (e) {
		console.error("readLS error", e);
		return fallback;
	}
}

export function writeLS(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (e) {
		console.error("writeLS error", e);
	}
}

/** normalize date to yyyy-mm-dd string */
export function toISODate(d) {
	if (!d) return "";
	// if it's an input[type=date] value, leave it
	if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
	const dt = new Date(d);
	const y = dt.getFullYear();
	const m = String(dt.getMonth() + 1).padStart(2, "0");
	const day = String(dt.getDate()).padStart(2, "0");
	return `${y}-${m}-${day}`;
}
