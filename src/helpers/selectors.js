export function getAppointmentsForDay(state, day) {
  let filteredDay;

  let appointmentsForDay = [];

  state["days"].forEach((ele) => {
    if (ele["name"] === day) {
      filteredDay = ele;
    }
  });

  if (filteredDay) {
    filteredDay["appointments"].forEach((num) => {
      appointmentsForDay.push(state["appointments"][num]);
    });
  }

  return appointmentsForDay;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerData = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewerData,
  };
}