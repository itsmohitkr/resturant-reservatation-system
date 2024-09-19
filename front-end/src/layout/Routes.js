import React from "react";

import { Redirect, Route, Switch} from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import CreateReaservation from "./reservation/CreateReaservation";
import EditReservation from "./reservation/EditReservation";
import SeatReservation from "./reservation/SeatReservation";
import CreateTable from "./table/CreateTable";
import SearchReservation from "./Search/SearchReservation";
import useQuery from "../utils/useQuery";
import ViewAllReservations from "./reservation/ViewAllReservations";
import ViewAllTables from "./reservation/ViewAllTables";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const query = useQuery(); // req.query works on server side
  const date = query.get("date");
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <ViewAllReservations />
      </Route>
      <Route exact={true} path="/tables">
        <ViewAllTables />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReaservation />
      </Route>
      <Route exact={true} path="/dashboard">
        <Dashboard date={date ? date : today()} />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateTable />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <SeatReservation />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route exact={true} path="/search">
        <SearchReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
