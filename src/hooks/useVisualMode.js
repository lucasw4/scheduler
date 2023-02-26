import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * @param newMode - The name of the mode to switch to
   * @param replace - Whether to replace the current mode with the new
   */
  const transition = function (newMode, replace = false) {
    // Set the mode to the new mode.
    if (!replace) {
      setMode(newMode);
      setHistory((prev) => [...prev, newMode]);
    } else {
      setMode(newMode);
    }
  };

  const back = function () {
    // pop the history and set mode to the last one
    if (history.length >= 1) {
      let historyCopy = [...history];
      historyCopy.pop();
      setHistory(historyCopy);
      setMode(historyCopy[historyCopy.length - 1]);
    }
  };

  return { mode, transition, back };
}
