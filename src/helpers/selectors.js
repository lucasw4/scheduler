/**
 * Get all appointments for a day.
 *
 * @param state - The state of the application.
 * @param day - The name of the day to look for.
 *
 * @return { Array } An array of appointments for the day or an empty array if there are none
 */
export function getAppointmentsForDay(state, day) {
  let filteredDay;

  let appointmentsForDay = [];

  state["days"].forEach((ele) => {
    // Set the day element to the filtered day.
    if (ele["name"] === day) {
      filteredDay = ele;
    }
  });

  // push appointments for each day in the filtered day
  if (filteredDay) {
    filteredDay["appointments"].forEach((num) => {
      appointmentsForDay.push(state["appointments"][num]);
    });
  }

  return appointmentsForDay;
}

/**
 * Get all interviewers for a day
 *
 * @param state - The state of the application
 * @param day - The name of the day to look for.
 *
 * @return { Array } An array of objects with the date of each interviewer for the given day or an empty array if no interviewers are
 */
export function getInterviewersForDay(state, day) {
  let filteredDay;

  let interviewersForDay = [];

  state["days"].forEach((ele) => {
    // Set the day element to the filtered day.
    if (ele["name"] === day) {
      filteredDay = ele;
    }
  });

  // Add interviewers to the list of interviewers for each day.
  if (filteredDay) {
    filteredDay["interviewers"].forEach((num) => {
      interviewersForDay.push(state["interviewers"][num]);
    });
  }

  return interviewersForDay;
}

/**
 * Gets information about an interview.
 *
 * @param state - The state of the application. Must be populated before calling this function.
 * @param interview - The interview to get information about.
 *
 * @return { StudentInterviewer } The information about the interview or null if there is no interview
 */
export function getInterview(state, interview) {
  // Returns the current view or null if the view is not currently in use.
  if (!interview) {
    return null;
  }

  const interviewerData = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerData,
  };
}
