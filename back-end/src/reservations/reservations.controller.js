/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties")
const hasRequiredProperties = hasProperties("first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people");

async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.json({ data });
}

 async function create(req, res) {
   const data = await service.create(req.body.data);
   res.status(201).json({ data });
 }

function hasValidDate(req, res, next) {
  
  const { data = {} } = req.body;
  const currentDate = new Date();
  const reservationDate = new Date(data.reservation_date);


  const dayIndex = reservationDate.getDay();

  if (reservationDate < currentDate && dayIndex === 2) {
    next({
      status: 400,
      message: "Reservation date must be in the future and should not be on Tuesday.",
    });
  }
  if (reservationDate < currentDate) {
    next({
      "status": 400,
      "message":"Reservation date must be in the future."
    })
  }
  if (dayIndex === 2) {
    next({
      status: 400,
      message: "Restaurant is closed on Tuesdays",
    });
  }

  else {
    next()
  }
}
 
function hasValidTime(req, res, next) {
  const { data = {} } = req.body;
  const reservationTime = data.reservation_time;
  const [hours, minutes,seconds] = reservationTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes;

  const validStartTime = 10 * 60 + 30; // 10:30 AM
  const validEndTime = 21 * 60 + 30; // 9:30 PM

  if (totalMinutes >= validStartTime && totalMinutes <= validEndTime) {
    next();
  } else {
    next({
      status: 400,
      message:
        "Invalid reservation time. Please choose a time between 10:30 AM and 9:30 PM.",
    });
  }
}

function isValidPeople(req, res, next) {
    const { data = {} } = req.body;
    const people = data.people;
    if (Number(people) > 0) {
      next();
    } else {
      next({
        status: 400,
        message: "Number of people should be > 0.",
      });
    }
}

async function isReservationExist(req, res, next) {
  const { reservation_id={} } = req.params;
  console.log(req.body.data);
  const reservationFound = await service.read(reservation_id);
  if (reservationFound) {
    res.locals.reservationFound = reservationFound;
    next();
  }
  else {
    next({
        status: 404,
        message: `there is no reservation with reservation_id: ${reservation_id}`,
      });
  }
}

function read(req, res, next) {
  
  const data = res.locals.reservationFound;
  const currentDateStr = data.reservation_date;

  // Parse current date string into a Date object
  const currentDate = new Date(currentDateStr);

  // Calculate next date
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);

  // Format the next date in the same format as the current date
  const nextDateFormatted = nextDate
    .toISOString()
    .slice(0, 10)
    .replace("T", " ");
  data.reservation_date=nextDateFormatted

  console.log(data.reservation_date);
  res.json({ data });
}

async function update(req,res,next) {
    const updatedReservation = {
      ...req.body.data,
      reservation_id:res.locals.reservationFound.reservation_id
    };
  
  res.json({ data: await service.update(updatedReservation) });
}

async function updateStatus(req, res, next) {
  const { status } = req.body.data;
  const updatedReservation = {
    ...res.locals.reservationFound,
    status: status,
  };
  await service.update(updatedReservation);
  res.status(200).json({ message: "Status updated to cancelled" });
}


module.exports = {
  list,
  create: [
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    isValidPeople,
    asyncErrorBoundary(create),
  ],
  read: [isReservationExist, asyncErrorBoundary(read)],
  update: [
    isReservationExist,
    hasRequiredProperties,
    hasValidDate,
    hasValidTime,
    isValidPeople,
    asyncErrorBoundary(update),
  ],
  updateStatus: [isReservationExist, asyncErrorBoundary(updateStatus)],
};
