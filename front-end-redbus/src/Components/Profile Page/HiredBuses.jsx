import React from "react";
import styles from "./HiredBuses.module.css";
import SingleHiredBus from "./SingleHiredBus";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const HiredBuses = () => {
  const [allBookingsHire, setAllBookingsHire] = React.useState([]);

  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  React.useEffect(async () => {
    if (currentCustomer) {
      let email = currentCustomer.email;
      console.log("current customer email: ", email);
      let res = await axios.get(
        `http://localhost:8000/v1/api/bookingHire/${email}`
      );
      console.log("all bookings hire of this customer: ", res.data);
      setAllBookingsHire(res.data);
    }
  }, [currentCustomer]);

  const renderHiredBookings = () => {
    console.log("All Hired bookings: ", allBookingsHire);
    if (allBookingsHire.length === 0) {
      return <h1>No Hired Bus Bookings Found!</h1>;
    }
    return allBookingsHire
      .reverse()
      .map((booking) => <SingleHiredBus key={uuidv4()} booking={booking} />);
  };
  return <div className={styles.HiredBuses}>{renderHiredBookings()}</div>;
};

export default HiredBuses;
