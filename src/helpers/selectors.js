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

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;

  for (const id in state.interviewers) {
    if (Number(id) === interviewerId) {
      return {
        student: interview.student,
        interviewer: state.interviewers[id],
      };
    }
  }
}

export function getInterviewersByDay(state, day) {
  const filteredDay = state.days.filter(days => days.name === day)

  if (filteredDay === undefined || filteredDay.length === 0) {
    return filteredDay;
  } 

  const arrayOfInterviwers = filteredDay.map(element => {
    return element.interviewers;
  })

  const interviewers = [];

  arrayOfInterviwers[0].forEach(element => {
    for (const appt in state.interviewers) {
      if (state.interviewers[appt]['id'] === element) {
        interviewers.push(state.interviewers[appt]);
      }
    }
  })

  return interviewers
}