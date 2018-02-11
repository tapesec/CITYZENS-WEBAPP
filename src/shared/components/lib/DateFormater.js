import { Interval, DateTime } from 'luxon';

const DateFormater = ({ labelPrefix, date, duration, countdown }) => {
    const toDuration = () => {
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
    }

    const toInterval = () => {
        const eventDate = DateTime.fromISO(date);
        const now = DateTime.local();
        const interval = Interval.fromDateTimes(now, eventDate)
            .toDuration(['years', 'months', 'days', 'hours', 'minutes', 'seconds'])
            .toObject();
        const { months, days, hours, minutes, seconds } = interval;
        let dateFormated = '';
        if (months > 0) dateFormated += `${months} mois `;
        if (days > 0) dateFormated += `${days} ${days === 1 ? 'jour' : 'jours'} `;
        if (hours > 0) dateFormated += `${hours} ${hours === 1 ? 'heure' : 'heures'} `;
        if (minutes > 0) dateFormated += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} `;
        if (seconds > 0) dateFormated += `${parseInt(seconds, 10)} ${parseInt(seconds, 10) === 1 ? 'seconde' : 'secondes'} `;
        return dateFormated;
    }

    if (!date) return null;
    if (duration) return toDuration();
    if (countdown) return toInterval();
    return DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE);
};

export default DateFormater;
