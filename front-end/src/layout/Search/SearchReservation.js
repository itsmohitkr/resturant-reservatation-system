import React, { useState } from "react";
import { listReservationsByMobileNumber } from "../../utils/api";
import ShowAllReservation from "./ShowAllReservation";
import ErrorAlert from "../ErrorAlert";
import { Link } from "react-router-dom";

function SearchReservation() {
  const [mobile_number, setMobile_number] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const changeHandler = ({ target }) => {
    setMobile_number(target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const abortController = new AbortController();
    try {
      const reservationData = await listReservationsByMobileNumber(
        { mobile_number },
        abortController.signal
      );
      setReservations(reservationData);
      setIsSearchPerformed(true); 
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
      } else {
        setReservationsError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Search Reservation</h2>
      <ErrorAlert error={reservationsError} />
      <form>
        <div className="form-row align-items-center">
          <div className="col-sm-3 my-1">
            <label className="sr-only" htmlFor="mobile_number">
              Mobile number
            </label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              placeholder="Mobile number"
              name="mobile_number"
              onChange={changeHandler}
              value={mobile_number}
            />
          </div>

          <div className="col-auto my-1">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              Find
            </button>
          </div>
        </div>
      </form>
      {isLoading ? (
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          {isSearchPerformed && reservations.length === 0 ? (
            <div className="alert alert-primary" role="alert">
              <div>
                No reservations found.
                <Link to="/reservations/new" className="mx-4">
                  + New Reservation
                </Link>
              </div>
            </div>
          ) : (
            <ShowAllReservation reservations={reservations} />
          )}
        </div>
      )}
    </div>
  );
}

export default SearchReservation;
