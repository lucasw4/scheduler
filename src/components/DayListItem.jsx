import classNames from "classnames";
import "components/DayListItem.scss";
import React from "react";

// Formats spots remaining for better readability in UI
const formatSpots = (spots) => {
  if (spots === 1) {
    return "1 spot remaining";
  }

  if (spots === 0) {
    return "no spots remaining";
  }

  return `${spots} spots remaining`;
};

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      onClick={() => props.setDay(props.name)}
      className={dayClass}
      data-testid='day'
    >
      <h2 className='text--regular'>{props.name}</h2>
      <h3 className='text--light'>{formatSpots(props.spots)}</h3>
    </li>
  );
}
