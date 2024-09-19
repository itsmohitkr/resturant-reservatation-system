import React from "react";
import { Link } from "react-router-dom";
import { next } from "../utils/date-time";
import { upadteReservationStatus } from "../utils/api";

function ShowReservations({ reservations, currentdate }) {
  const cancelHandler = async (reservation_id) => {
    const confirm = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (confirm) {
      await upadteReservationStatus(reservation_id).then(() => {
        window.location.reload();
      });
    }
  };

  if (reservations.length > 0) {
    const allReservation = reservations.map((reservation, id) => {
      if (reservation.status !== "finished" && reservation.status!=="cancelled") {
        return (
          <tr key={id}>
            <th scope="row">{id + 1}</th>
            <td>{reservation.first_name}</td>
            <td>{reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{next(reservation.reservation_date)}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>
              {reservation.status}
            </td>
            <td>
              <div>
                {reservation.status !== "seated" ? (
                  <Link to={`/reservations/${reservation.reservation_id}/seat`}>
                    <button type="button" className="btn btn-sm btn-success ">
                      Seat
                    </button>
                  </Link>
                ) : null}

                <Link to={`/reservations/${reservation.reservation_id}/edit`}>
                  <button
                    type="button"
                    className="btn btn-sm btn-secondary mx-2 "
                  >
                    Edit
                  </button>
                </Link>

                <button
                  type="button"
                  className="btn btn-sm btn-danger "
                  data-reservation-id-cancel={reservation.reservation_id}
                  onClick={() => cancelHandler(reservation.reservation_id)}
                >
                  Cancel
                </button>
              </div>
            </td>
          </tr>
        );
      } else {
        return null;
      }
    });
    return (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Reservation Date</th>
            <th scope="col">Reservation Time</th>
            <th scope="col">People</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{allReservation}</tbody>
      </table>
    );
  } else {
    return (
      <div className="alert alert-primary" role="alert">
        <div>
          No reservation for date: {currentdate}
          <Link to="/reservations/new" className="mx-4">
            + New Reservation
          </Link>
        </div>
      </div>
    );
  }
}

export default ShowReservations;
