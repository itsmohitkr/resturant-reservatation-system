import React, { useEffect, useState } from "react";
import ErrorAlert from "../../layout/ErrorAlert";
import { assignReservationToTable, listTable } from "../../utils/api";
import { useHistory, useParams } from "react-router-dom";

function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [tableId, setTableId] = useState("");
  const [tables, setTables] = useState([]);
  const [tableError, setTableError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDashboard() {
      try {
        const tableDate = await listTable(abortController.signal);
        setTableError(null);
        setTables(tableDate);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted");
        } else {
          setTableError(error);
        }
      }
    }
    loadDashboard();
    return () => abortController.abort();
  }, []);

const submitHandler = async (event) => {
  try {
    
    await assignReservationToTable(tableId, reservation_id);
    history.push("/");
  } catch (error) {
    setTableError(error);
  }
};

  const handleChange = ({ target }) => {
    setTableId(target.value);
  };

  if (tables.length > 0) {
    const allTable = tables.map((table, id) => {
      return (
        <option value={table.table_id} key={id}>
          {table.table_name} - {table.capacity}
        </option>
      );
    });
    return (
      <div>
        <h2>Select Table</h2>
        <ErrorAlert error={tableError} />

        <select
          className="form-select form-select-lg"
          aria-label=".form-select-lg example"
          name="table_id"
          onChange={handleChange}
          value={tableId}
        >
          <option value="">Select Table</option>
          {allTable}
        </select>

        <button
          type="submit"
          className="btn btn-secondary mx-5"
          onClick={() => history.goBack()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={submitHandler}
        >
          Submit
        </button>
      </div>
    );
  } else {
    return null;
  }
}

export default SeatReservation;
