function ReservationForm({formData,changeHandler}) {
    return (
      <div>
        <form>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                onChange={changeHandler}
                value={formData.first_name}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                onChange={changeHandler}
                value={formData.last_name}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobile_number"
                name="mobile_number"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                placeholder="xxx-xxx-xxxx"
                onChange={changeHandler}
                value={formData.mobile_number}
              />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="reservation_date">Reservation date</label>
              <input
                type="date"
                className="form-control"
                id="reservation_date"
                name="reservation_date"
                placeholder="Reservation Date"
                onChange={changeHandler}
                value={formData.reservation_date}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="reservation_time">Reservation Time</label>
              <input
                type="time"
                className="form-control"
                id="reservation_time"
                name="reservation_time"
                placeholder="Reservation Time"
                onChange={changeHandler}
                value={formData.reservation_time}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="people">People</label>
              <input
                type="number"
                className="form-control"
                id="people"
                name="people"
                placeholder="People"
                onChange={changeHandler}
                value={formData.people}
              />
            </div>
          </div>
        </form>
      </div>
    );
}

export default ReservationForm;
