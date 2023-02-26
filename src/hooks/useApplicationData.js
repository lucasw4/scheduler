import axios from "axios";
import { getAppointmentsForDay, getDay } from "helpers/selectors";
import { useEffect, useState } from "react";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function getDayIndex(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return daysOfWeek[day];
  }

  function updateSpots(state, dayName) {
    const dayIndex = getDayIndex(dayName);
    const day = state.days[dayIndex];
    const appointmentsForDay = getAppointmentsForDay(state, dayName);

    let spots = 0;
    day.appointments.forEach((app) => {
      appointmentsForDay.forEach((appointment) => {
        if (appointment.id === app && appointment.interview === null) {
          spots += 1;
        }
      });
    });

    return spots;
  }

  function bookInterview(id, interview) {
    const dayIndex = getDayIndex(state.day);
    let foundDay = state.days[dayIndex];
    const updatedSpots = updateSpots(state, foundDay["name"]);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    if (!state.appointments[id].interview) {
      foundDay = {
        ...foundDay,
        spots: updatedSpots - 1,
      };
    }

    let days = state.days;
    days[dayIndex] = foundDay;

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayIndex = getDayIndex(state.day);
    let foundDay = state.days[dayIndex];
    const updatedSpots = updateSpots(state, foundDay["name"]);

    foundDay = {
      ...foundDay,
      spots: updatedSpots + 1,
    };

    let days = state.days;
    days[dayIndex] = foundDay;

    // console.log(days);

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      setState({ ...state, appointments, days });
    });
  }

  return {
    state,
    bookInterview,
    cancelInterview,
    setDay,
  };
}
