import { useState, useEffect } from "react";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../ErrorAlert";
import { useHistory, useParams } from "react-router-dom";
import { editReservation, readReservations } from "../../utils/api";

function EditReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [reservations, setReservations] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [reservationsError, setReservationsError] = useState(null);
  const [formData, setFormData] = useState({ ...initialFormData });

  useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      try {
        const reservationData = await readReservations(
          reservation_id,
          abortController.signal
        );
        setReservations(reservationData);
        setIsFetched(true);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          setReservationsError(error);
        }
      }
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

  useEffect(() => {
    if (reservations) {
      setFormData({
        first_name: reservations.first_name,
        last_name: reservations.last_name,
        mobile_number: reservations.mobile_number,
        reservation_date: reservations.reservation_date,
        reservation_time: reservations.reservation_time,
        people: reservations.people,
      });
    }
  }, [reservations]);

  

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function updateReservation() {
      try {
        await editReservation(formData, reservation_id, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setReservationsError(error);
      }
    }
    updateReservation();
    return () => abortController.abort();
  };

  return (
    <div>
      <h2>Edit Reservation.</h2>
      <ErrorAlert error={reservationsError} />
      <ReservationForm formData={formData} setFormData={setFormData} />
      <button
        type="submit"
        className="btn btn-secondary"
        onClick={history.goBack}
      >
        Cancel
      </button>
      {isFetched ? (
        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={submitHandler}
        >
          Submit
        </button>
      ) : (
        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={submitHandler}
          disabled
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default EditReservation;
