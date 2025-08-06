export const minuteToHour = minutes => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    const hourText = hours > 0 ? `${hours} ساعت` : '';
    const minuteText = remainingMinutes > 0 ? `${remainingMinutes} دقیقه` : '';

    return [hourText, minuteText].filter(Boolean).join(' و ');
}