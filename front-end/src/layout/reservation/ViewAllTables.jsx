import React from "react";
import ListTable from "../table/ListTable";

function ViewAllTables() {
  return (
    <div className="container mt-4 p-3">
      {" "}
      {/* Add margin and padding */}
      <div className="mb-3">
        {" "}
        {/* Margin bottom for the heading */}
        <h2>List of all tables</h2>
      </div>
      <ListTable />
    </div>
  );
}

export default ViewAllTables;
