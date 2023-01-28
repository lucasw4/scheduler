import React from "react";
import "./InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";

const InterviewerList = (props) => {
  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'>
        {props.interviewers.map((i) => {
          return (
            <InterviewerListItem
              key={i.id}
              id={i.id}
              avatar={i.avatar}
              name={i.name}
              selected={props.interviewer === i.id}
              setInterviewer={props.setInterviewer}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default InterviewerList;
