import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(relativeTime);

/**
 * * Format only date.
 * @param input Date to format, either `Date` or `string` type.
 * @returns Formatted date.
 */
export const formatDateOnly = (input: string | Date): string => {
	return dayjs(input).format('dddd, MMMM DD, YYYY');
};

/**
 * * Format only time.
 * @param input Date to format, either `Date` or `string` type.
 * @returns Formatted time.
 */
export const formatTimeOnly = (input: string | Date): string => {
	return dayjs(input).format('hh:mm:ssa');
};

/**
 * * Get time stamp from date.
 * @param date Date to get time stamp from, either `Date` or `string` type.
 * @returns Time stamp in unix format.
 */
export const getTimeStamp = (date: string | Date): number => {
	return dayjs(date).unix();
};

/**
 * * Format both date and time dynamically.
 * @param input Date to format, either `Date` or `string` type.
 * @returns Formatted date and time.
 */
export const formatDateTimeDynamic = (input: string | Date): string => {
	const now = dayjs();
	const iDate = dayjs(input);

	const minutesDiff = now.diff(iDate, 'minutes');

	// Show recent times (a few seconds/minutes ago, like "45 minutes ago")
	if (minutesDiff < 60) {
		return iDate.fromNow();
	}

	// If the date is today, return as "Today 12:50 am/pm"
	if (iDate.isToday()) {
		return `Today ${iDate.format('hh:mm A')}`;
	}

	// If the date is yesterday, return as "Yesterday 12:50 am/pm"
	if (iDate.isYesterday()) {
		return `Yesterday ${iDate.format('hh:mm A')}`;
	}

	// For any date before yesterday, return as "Sat, Oct 23, 2024 12:50 am/pm"
	return iDate.format('ddd, MMM DD, YYYY hh:mm A');
};

/**
 * * Get current age calculated from a specific date.
 *
 * @param input Date from which age will be calculated, either `Date` or `string` type.
 * @returns Return current age in formatted string.
 */
export const getCurrentAge = (input: string | Date): string => {
	const now = dayjs();
	const iDate = dayjs(input);

	const yearDiff = now.diff(iDate, 'year');
	const monthDiff = now.diff(iDate.add(yearDiff, 'year'), 'month');
	const dayDiff = now.diff(
		iDate.add(yearDiff, 'year').add(monthDiff, 'month'),
		'day'
	);

	const ageParts = [];

	if (yearDiff > 1) ageParts.push(`${yearDiff} years`);
	else if (yearDiff === 1) ageParts.push('1 year');

	if (monthDiff > 1) ageParts.push(`${monthDiff} months`);
	else if (monthDiff === 1) ageParts.push('1 month');

	if (dayDiff > 1) ageParts.push(`${dayDiff} days`);
	else if (dayDiff === 1) ageParts.push('1 day');

	return ageParts.join(' ');
};
