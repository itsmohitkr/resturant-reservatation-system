const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties(
  "table_name",
  "capacity"
);

async function list(req, res) {
  const user_id = req.user.id;
  const data = await service.list(user_id);
  res.json({ data });
}

async function create(req, res) {
  const user_id = req.user.id;
  const finalData = {
    ...req.body.data,
    user_id: user_id,
  };
   const data = await service.create(finalData);
   res.status(201).json({ data });
 }

async function hasValidTableId(req, res, next) {
  const { table_id = {} } = req.params;
  const user_id = req.user.id;
  const tableFound = await service.read(table_id,user_id);
  if (tableFound) {
    res.locals.tableFound = tableFound;
    next();
  } else {
    next({
      status: 400,
      message: "Inavlid table_id.",
    });
  }
}
 
function bodyHasValidData(req, res, next) {
  const { reservation_id = {} } = req.body.data;
  if (reservation_id != "") {
    next();
  } else {
    next({
      status: 400,
      message: "reservation id should not be empty.",
    });
  }
}
async function isReservationExists(req, res, next) {
  const { reservation_id = {} } = req.body.data;
  const user_id = req.user.id;
  const reservationFound = await reservationService.read(reservation_id,user_id);
  if (reservationFound) {
    res.locals.reservationFound = reservationFound;
    next();
  } else {
    next({
      status: 400,
      message: "No reservation found.",
    });
  }
}



function checkCapacity(req, res, next) {
  const { capacity } = res.locals.tableFound;
  const { people } = res.locals.reservationFound;

  if (Number(capacity) > Number(people)) {
    next();
  } else {
    next({
      status: 400,
      message: "Table capacity > no of people.",
    });
  }
}
function isOccupied(req,res,next) {
  const { reservation_id = {} } = res.locals.tableFound;
  if (reservation_id == null) {
    next();
  } else {
    next({
      status: 400,
      message: "Table is already occupied.",
    });
  }
}

async function vacantTable(req, res, next) {
  const updatedTable = {
    ...res.locals.tableFound,
    reservation_id: null
  };
  const { reservation_id } = res.locals.tableFound;
  const user_id = req.user.id;
  const reservationTObeUpdated = await reservationService.read(reservation_id,user_id);
  const updatedReservation = {
    ...reservationTObeUpdated,
    status: "finished",
  };
  // await service.update(updatedTable);
  await service.seat(updatedTable, updatedReservation,user_id);
  res.status(200).json({ message: "Table is vacant and reservation status is set to finished" });
}

async function seat(req, res, next) {
  const { reservation_id = {} } = req.body.data;
  const user_id = req.user.id;
  const updatedReservation = {
    ...res.locals.reservationFound,
    status: "seated",
  };
  const updatedTable = {
    ...res.locals.tableFound,
    reservation_id: reservation_id
  };
  await service.seat(updatedTable, updatedReservation, user_id);
  // await service.update(updatedTable);
  // await reservationService.update(updatedReservation);
  res.status(200).json({ message: "Seat updated successfully" });
}

module.exports = {
  list,
  create: [hasRequiredProperties, asyncErrorBoundary(create)],
  seat: [
    hasValidTableId,
    hasProperties("reservation_id"),
    bodyHasValidData,
    isReservationExists,
    checkCapacity,
    isOccupied,
    asyncErrorBoundary(seat),
  ],
  vacantTable: [hasValidTableId, asyncErrorBoundary(vacantTable)],
};
