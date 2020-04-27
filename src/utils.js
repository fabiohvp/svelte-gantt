export default {
	addDays: (date, days) => {
		const copy = new Date(Number(date));
		copy.setDate(date.getDate() + days);
		return copy;
	},
	getDaysInMonth: (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	},
	getNumberOfWeek: (date) => {
		const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
		const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
		return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
	},
	getDateOfWeek: (w, y) => {
		var d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week

		return new Date(y, 0, d);
	},
	offset: (el) => {
		var rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return {
			top: rect.top + scrollTop,
			left: rect.left + scrollLeft,
			bottom: rect.bottom + scrollTop,
			right: rect.right + scrollLeft
		};
	}
};
