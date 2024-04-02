import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function CreateTable() {
  const history = useHistory();

  const initialFormData = {
    table_name: "",
    capacity: 0,
  };
    
  const [formData, setFormData] = useState({ ...initialFormData });
  const [reservationsError, setReservationsError] = useState(null);

  const changeHandler = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addTable() {
      try {
        await createTable(formData, abortController.signal);
        history.push(`/dashboard`);
      } catch (error) {
        setReservationsError(error);
      }
    }
    addTable();
    return () => abortController.abort();
  };

  return (
    <div>
      <h2>Create New Table.</h2>
    <ErrorAlert error={reservationsError} />
          
      <form>
        <div className="form-row">
          <div className="form-group col-md-3">
            <label htmlFor="table_name">Table Name</label>
            <input
              type="text"
              className="form-control"
              id="table_name"
              name="table_name"
              placeholder="Table Name"
              onChange={changeHandler}
              value={formData.table_name}
            />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="last_name">Capacity </label>
            <input
              type="number"
              className="form-control"
              min="1"
              id="capacity"
              name="capacity"
              placeholder="capacity"
              onChange={changeHandler}
              value={formData.capacity}
            />
          </div>
        </div>
      </form>
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

export default CreateTable;
