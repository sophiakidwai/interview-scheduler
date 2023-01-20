import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(state => ({ ...state, day }));

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }));
      })
      .catch(err => console.log(err));

  }, []);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments);
    return new Promise((resolve, reject) => {
      axios.put(`/api/appointments/${id}`, { interview })
        .then(res => {
          setState(prev => ({
            ...prev,
            appointments,
            days
          }));
          resolve(res);
        })
        .catch(err => reject(err));
    });
  };

  const cancelInterview = (id) => {
    const interview = null;

    const appointment = {
      ...state.appointments[id],
      interview
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments);
    return new Promise((resolve, reject) => {
      axios.delete(`/api/appointments/${id}`, { interview })
        .then(res => {
          setState(prev => ({
            ...prev,
            appointments,
            days
          }));
          resolve(res);
        })
        .catch(err => reject(err));
    })
  };

  const updateSpots = (state, appointments) => {
    const days = [...state.days]
    return days.map(day => {
      const newDay = { ...day }
      let spots = 0;
      newDay.appointments.forEach(id => {
        if (appointments[id].interview === null) {
          spots++;
        }
      })
      newDay.spots = spots;
      return newDay;
    })
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}