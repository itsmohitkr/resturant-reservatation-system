import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ShowReservations from "../dashboard/ShowReservations";
import DisplayButton from "../dashboard/DisplayButton";
import ListTable from "../layout/table/ListTable";
/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currentdate, setCurrentdate] = useState(date);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDashboard() {
      try {
        const reservationData = await listReservations(
          { date },
          abortController.signal
        );
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
  }, [date]);



  return (
    <div>
      <h2>Dashboard</h2>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date: {currentdate}</h4>
      </div>
      <DisplayButton date={date} setCurrentdate={setCurrentdate} />

      <hr></hr>
      <h3>Reservations</h3>

      {isLoading ? (
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>
          <ErrorAlert error={reservationsError} />
          <ShowReservations
            reservations={reservations}
            currentdate={currentdate}
          />
        </div>
      )}
      <h3>Tables</h3>
      <ListTable />
    </div>
  );
}

export default Dashboard;
