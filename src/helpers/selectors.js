export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day);

  if (filteredDay === undefined || filteredDay.length === 0) {
    return filteredDay;
  };

  const arrayOfDays = filteredDay.map(element => {
    return element.appointments;
  })


  const appts = [];
  arrayOfDays[0].forEach(element => {
    for (const appt in state.appointments) {
      if (state.appointments[appt]['id'] === element) {
        appts.push(state.appointments[appt])
      };
    };
  });

  return appts;
};