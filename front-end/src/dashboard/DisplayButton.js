import React from "react";
import { useHistory } from "react-router-dom";
import { next, previous, today } from "../utils/date-time";

function DisplayButton({ date, setCurrentdate }) {
    const history = useHistory();

  function showPrevious() {
    const newdate = previous(date);
    setCurrentdate(newdate);
    history.push(`/dashboard?date=${newdate}`);
  }

  function showToday() {
    const newdate = today();
    setCurrentdate(newdate);
    history.push(`/dashboard?date=${newdate}`);
  }

  function showNext() {
    const newdate = next(date);
    setCurrentdate(newdate);
    history.push(`/dashboard?date=${newdate}`);
  }
    
    return (
      <div>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => showPrevious()}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary mx-2"
          onClick={() => showToday()}
        >
          Today
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => showNext()}
        >
          Next
        </button>
      </div>
    );
}

export default DisplayButton;