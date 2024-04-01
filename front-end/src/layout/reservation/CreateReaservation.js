import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function CreateReaservation() {
  const history = useHistory();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [reservationsError, setReservationsError] = useState(null);

  const changeHandler = ({ target }) => {
    if (target.name === "people" && target.value <= 0) {
      target.value = "";
    }
    setFormData({ ...formData, [target.name]: target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addReservation() {
      try {
        await createReservation(formData, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setReservationsError(error);
      }
    }
    addReservation();
    return () => abortController.abort();
  };

  return (
    <div>
      <h2>Create new reservation</h2>
      <ErrorAlert error={reservationsError} />

      <ReservationForm formData={formData} changeHandler={changeHandler} />

      <button
        type="submit"
        className="btn btn-secondary"
        onClick={history.goBack}
      >
        Cancel
      </button>
      <button
        type="submit"
        className="btn btn-primary mx-2"
        onClick={submitHandler}
      >
      
        Submit
      </button>
    </div>
  );
}

export default CreateReaservation;
