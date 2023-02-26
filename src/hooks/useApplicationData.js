import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";
import { useEffect, useState } from "react";

/**
 * Get data from the appointments and interviewers. It is possible to use this function multiple times in a single render.
 *
 *
 * @return Promise that resolves to an object with data for day appointments and interviewers.
 */
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

  /**
   * Returns the index of a given day in the week.
   *
   * @param day - The name of the day to look up.
   *
   * @return { Number } The zero - based index of the given day in the week ( 0 - 4 )
   */
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

  /**
   * Counts how many spots are in the day. This is used to determine when an appointment is no longer visible to the user
   *
   * @param state - The state of the game
   * @param dayName - The name of the day to look up
   *
   * @return { number } The number of spots for a day that aren't booked with appointments.
   */
  function updateSpots(state, dayName) {
    const dayIndex = getDayIndex(dayName);
    const day = state.days[dayIndex];
    const appointmentsForDay = getAppointmentsForDay(state, dayName);

    let spots = 0;
    day.appointments.forEach((app) => {
      appointmentsForDay.forEach((appointment) => {
        // Increment spots of the appointment
        if (appointment.id === app && appointment.interview === null) {
          spots += 1;
        }
      });
    });

    return spots;
  }

  /**
   * Books interview for appointment. Will update spots and add to day if not already booked
   *
   * @param id - ID of the appointment to book
   * @param interview - Object with details about the booking.
   *
   * @return Promise that resolves when booking is complete or rejects with an error message if there was a problem
   */
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

    // Update the day of the apppointments.
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

  /**
   * Cancels an interview and updates spots.
   *
   * @param id - The id of the interview to cancel.
   *
   * @return A promise that resolves when the request completes or rejects if there was an error canceling the interview
   */
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
