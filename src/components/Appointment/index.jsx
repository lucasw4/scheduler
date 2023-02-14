import useVisualMode from "hooks/useVisualMode";
import React, { Fragment } from "react";
import Empty from "./Empty";
import Form from "./Form";
import Header from "./Header";
import Show from "./Show";
import "./styles.scss";

const Appointment = (props) => {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className='appointment'>
      <Header time={props.time} />
      {mode === EMPTY && (
        <Empty
          onAdd={() => {
            transition(CREATE);
          }}
        />
      )}
      {mode === CREATE && <Form interviewers={[]} onCancel={back} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
};

export default Appointment;
