import React from "react";
import DayListItem from "./DayListItem";

const DayList = (props) => {
  return (
    <ul>
      {props.days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.value}
            setDay={props.onChange}
          />
        );
      })}
    </ul>
  );
};

export default DayList;
