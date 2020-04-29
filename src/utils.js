export default {
  addHours: (date, hours) => {
    const copy = new Date(Number(date));
    copy.setHours(copy.getHours() + hours);
    return copy;
  },
  addDays: (date, days) => {
    const copy = new Date(Number(date));
    copy.setDate(copy.getDate() + days);
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
  offset: (el) => {
    const rect = el.getBoundingClientRect();
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
      bottom: rect.bottom + scrollTop,
      right: rect.right + scrollLeft,
    };
  },
};
