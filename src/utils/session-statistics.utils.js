const moment = require('moment');


function getNumbers(sessions, day) {
    return sessions.filter(session => moment(session.attendance_at).format('DD/MM/YY') === day).length;
}

function enumerateDaysBetweenDates(startDate, endDate) {
    const dates = [];
    let currentDate = moment(startDate);
    let lastDate = moment(endDate);
    while (currentDate <= lastDate) {
        dates.push(currentDate.format('DD/MM/YY'));
        currentDate = currentDate.add(1, 'day');
    }
    return dates;
}

function getTotalHours(sessions) {
    const durations = sessions.map(session => session.duration);
    let hours = 0;
    let minutes = 0;

    durations.forEach(duration => {
        hours += parseInt(duration[0] + duration[1]);
        minutes += parseInt(duration[3] + duration[4]);
    });

    while (minutes >= 60) {
        hours += 1;
        minutes -= 60;
    }

    return `${hours < 10 ? '0' : ''}${hours}:${minutes > 10 ? '' : '0'}${minutes}`;
}

function getTotalPatients(sessions) {
    let counter = 0;
    let patientsId = sessions.map(session => session.patients_id);
    sessions.forEach((session) => {
        if (patientsId.indexOf(session.patients_id) !== -1) {
            counter += 1;
            patientsId = patientsId.filter(id => id !== session.patients_id);
        }
    });
    return counter;
}

module.exports = {
    getNumbers,
    getTotalHours,
    getTotalPatients,
    enumerateDaysBetweenDates
}