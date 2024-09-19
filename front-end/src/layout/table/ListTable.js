import React, { useEffect, useState } from "react";
import { listTable, vacantTable } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";

function ListTable() {
  const [tables, setTables] = useState([]);
  const [tableError, setTableError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadDashboard() {
      try {
        const tableDate = await listTable(abortController.signal);
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
  const clearTable = async (table_id) => {
    const confirm = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );
    if (confirm) {
      await vacantTable(table_id);
      window.location.reload();
    }
  };

  if (tables.length > 0) {
    const allTable = tables.map((table, id) => {
      return (
        <tr key={id}>
          <th scope="row">{id + 1}</th>
          <td style={{ width: "35%" }}>{table.table_name}</td>
          <td style={{ width: "35%" }}>{table.capacity}</td>
          <td style={{ width: "30%" }}>
            {table.reservation_id == null ? (
              <div
                className="p-1 mb-1 bg-success text-white col-3 text-center rounded"
                data-table-id-status={table.table_id}
              >
                Free
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div
                  className="p-1 mb-1 bg-secondary text-white col-3 text-center rounded"
                  data-table-id-status={table.table_id}
                >
                  Occupied
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success mx-2"
                    onClick={() => clearTable(table.table_id)}
                  >
                    Finish
                  </button>
                </div>
              </div>
            )}
          </td>
        </tr>
      );
    });
    return (
      <div>
        <ErrorAlert error={tableError} />
        <div style={{ maxHeight: "400px", overflowY: "auto" }}>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Table name</th>
                <th scope="col">Capacity</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>{allTable}</tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default ListTable;
