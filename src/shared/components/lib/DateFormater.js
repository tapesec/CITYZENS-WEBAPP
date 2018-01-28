import { Interval, DateTime } from 'luxon';

const DateFormater = ({ labelPrefix, date }) => {
    if (!date) return null;
    const eventDate = DateTime.fromISO(date);
    const now = DateTime.local();
    const interval = Interval.fromDateTimes(eventDate, now)
        .toDuration(['years', 'months', 'days', 'hours', 'minutes', 'seconds'])
        .toObject();
    const { years, months, days, hours, minutes, seconds } = interval;
    const prefixDelay = 'Il y a';
    const prefixDate = 'le';
    let dateFormated = labelPrefix? `${labelPrefix} `: '';
    if (days >= 1 || months >= 1 || years >= 1) {
        dateFormated += `${prefixDate} `;
        dateFormated = eventDate.toLocaleString({
            weekday: 'long',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    } else if (hours > 0)
        dateFormated += `${prefixDelay} ${hours} ${hours === 1 ? 'heure' : 'heures'}`;
    else if (minutes > 0)
        dateFormated += `${prefixDelay} ${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    else if (seconds > 0) dateFormated += `${prefixDelay} ${parseInt(seconds, 10)} secondes`;
    return dateFormated;
};

export default DateFormater;
