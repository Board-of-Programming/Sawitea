"use strict";
// Shared utilities
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = formatDate;
exports.truncateText = truncateText;
function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
}
function truncateText(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return text.slice(0, maxLength) + '...';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG1CQUFtQjs7QUFFbkIsZ0NBTUM7QUFFRCxvQ0FHQztBQVhELFNBQWdCLFVBQVUsQ0FBQyxJQUFVO0lBQ25DLE9BQU8sSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRTtRQUN0QyxJQUFJLEVBQUUsU0FBUztRQUNmLEtBQUssRUFBRSxNQUFNO1FBQ2IsR0FBRyxFQUFFLFNBQVM7S0FDZixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBWSxFQUFFLFNBQWlCO0lBQzFELElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxTQUFTO1FBQUUsT0FBTyxJQUFJLENBQUM7SUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNoYXJlZCB1dGlsaXRpZXNcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREYXRlKGRhdGU6IERhdGUpOiBzdHJpbmcge1xyXG4gIHJldHVybiBuZXcgSW50bC5EYXRlVGltZUZvcm1hdCgnaWQtSUQnLCB7XHJcbiAgICB5ZWFyOiAnbnVtZXJpYycsXHJcbiAgICBtb250aDogJ2xvbmcnLFxyXG4gICAgZGF5OiAnbnVtZXJpYycsXHJcbiAgfSkuZm9ybWF0KGRhdGUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdHJ1bmNhdGVUZXh0KHRleHQ6IHN0cmluZywgbWF4TGVuZ3RoOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gIGlmICh0ZXh0Lmxlbmd0aCA8PSBtYXhMZW5ndGgpIHJldHVybiB0ZXh0O1xyXG4gIHJldHVybiB0ZXh0LnNsaWNlKDAsIG1heExlbmd0aCkgKyAnLi4uJztcclxufVxyXG4iXX0=