import { startOfWeek, endOfWeek, subWeeks, format, startOfMonth, subMonths, endOfMonth } from 'date-fns';

export const convertTimeStamp = (timestamp, format) => {
    if (timestamp === null) return null;
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (day === 'NaN' || year === 'NaN' || month === 'NaN') {
        return null;
    }
    let formattedDate;
    switch (format) {
        case 'dd/MM/yyyy': 
            formattedDate = `${day}/${month}/${year}`;
            break;
        case 'dd-MM':
            formattedDate = `${day}-${month}`;
            break;
        case 'dd/MM':
            formattedDate = `${day}/${month}`;
            break;
        case 'yyyy-MM-dd':
            formattedDate = `${year}-${month}-${day}`;
            break;
        default:
            formattedDate = `${day}/${month}/${year}`;
            break;;
    }
    return formattedDate;
}

export const setDateFormat = (buttonType, startDate, endDate) => {
    let newStartDate = '';
    let newEndDate = '';

    switch (buttonType) {
        case 'homnay':
            newStartDate = format(new Date(), 'yyyy-MM-dd');
            newEndDate = format(new Date(), 'yyyy-MM-dd');
            break;
        case 'homqua':
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            newStartDate = format(yesterday, 'yyyy-MM-dd');
            newEndDate = format(yesterday, 'yyyy-MM-dd');
            break;
        case 'tuannay':
            newStartDate = format(startOfWeek(new Date()), 'yyyy-MM-dd');
            newEndDate = format(new Date(), 'yyyy-MM-dd');
            break;
        case 'tuantruoc':
            const lastWeekStart = startOfWeek(subWeeks(new Date(), 1));
            newStartDate = format(lastWeekStart, 'yyyy-MM-dd');
            newEndDate = format(endOfWeek(subWeeks(new Date(), 1)), 'yyyy-MM-dd');
            break;
        case 'thangnay':
            newStartDate = format(startOfMonth(new Date()), 'yyyy-MM-dd');
            newEndDate = format(new Date(), 'yyyy-MM-dd');
            break;
        case 'thangtruoc':
            const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
            newStartDate = format(lastMonthStart, 'yyyy-MM-dd');
            newEndDate = format(endOfMonth(subMonths(new Date(), 1)), 'yyyy-MM-dd');
            break;
        default:
            newStartDate = startDate;
            newEndDate = endDate;
            break;
    }
    return [newStartDate, newEndDate];

}

export const endOfDate = (date) => {
    if(!date) return null;
    date.setHours(date.getHours() + 23);
    date.setMinutes(date.getMinutes() + 59);
    date.setSeconds(date.getSeconds() + 59);
    return date;
}