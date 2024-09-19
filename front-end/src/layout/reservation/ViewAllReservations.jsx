import React, { useEffect, useState } from "react";
import { listReservations } from "../../utils/api";
import ShowReservations from "../../dashboard/ShowReservations";
import ErrorAlert from "../ErrorAlert";

function ViewAllReservations() {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDashboard() {
      try {
        const reservationData = await listReservations(abortController.signal);
        setIsLoading(false);
        setReservations(reservationData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          setReservationsError(error);
        }
        setIsLoading(false);
      }
    }
    loadDashboard();
    return () => abortController.abort();
  }, []);

  return (
    <div className="container mt-4">
      {" "}
      {/* Bootstrap container and top margin */}
      <h2 className="mb-4">All Reservations</h2>{" "}
      {/* Bottom margin for spacing */}
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <ErrorAlert error={reservationsError} />
          <ShowReservations reservations={reservations} />
        </div>
      )}
    </div>
  );
}

export default ViewAllReservations;
