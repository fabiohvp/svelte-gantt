export default {
	addHours: (date, hours) => {
		const copy = new Date(Number(date));
		copy.setHours(copy.getHours() + hours);
		return copy;
	},
	addDays: (date, days) => {
		const copy = new Date(Number(date));
		copy.setDate(copy.getDate() + days);
		copy.setHours(0, 0, 0, 0); //fix: needs to ignore dst
		return copy;
	},
	addMonths: (date, months) => {
		const copy = new Date(Number(date));
		copy.setMonth(copy.getMonth() + months);
		return copy;
	},
	addYears: (date, years) => {
		const copy = new Date(Number(date));
		copy.setFullYear(copy.getFullYear() + years);
		return copy;
	},
	getLastDayOfMonth: (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0);
	},
	getNumberOfWeek: (date) => {
		const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
		const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
		return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
	},
	getDateOfWeek: (w, y) => {
		const d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week
		return new Date(y, 0, d);
	},
	groupBy: (array, fnKey) => {
		return array.reduce(function (map, item) {
			const key = fnKey(item);
			(map[key] = map[key] || []).push(item);
			return map;
		}, {});
	},
	offset: (el) => {
		const rect = el.getBoundingClientRect();
		const computedStyle = window.getComputedStyle(el);
		const borderTop = convertPixelToInt(computedStyle["border-top-width"]);
		const borderLeft = convertPixelToInt(computedStyle["border-left-width"]);
		const borderBottom = convertPixelToInt(
			computedStyle["border-bottom-width"]
		);
		const borderRight = convertPixelToInt(computedStyle["border-right-width"]);

		return {
			top: el.offsetTop + borderTop,
			left: el.offsetLeft + borderLeft,
			bottom: el.offsetTop + rect.height - borderBottom,
			right: el.offsetLeft + rect.width - borderRight,
		};
	},
};

function convertPixelToInt(pixels) {
	return parseInt(pixels.replace("px", "")) || 0;
}
