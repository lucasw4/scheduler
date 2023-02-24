import axios from "axios";
import { getDay } from "helpers/selectors";
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

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    let foundDay = getDay(state.day, state.days);
    const dayIndex = getDayIndex(state.day);

    if (!state.appointments[id].interview) {
      foundDay = {
        ...foundDay,
        spots: foundDay.spots - 1,
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

    let foundDay = getDay(state.day, state.days);
    const dayIndex = getDayIndex(state.day);

    foundDay = {
      ...foundDay,
      spots: foundDay.spots + 1,
    };

    let days = state.days;
    days[dayIndex] = foundDay;

    console.log(days);

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
