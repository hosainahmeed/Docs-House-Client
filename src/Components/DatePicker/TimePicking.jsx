import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimePicking() {
  const [startTime, setStartTime] = useState(null);
  const handleTimeChange = (date) => {
    setStartTime(date);
    const formattedTime = new Intl.DateTimeFormat(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    }).format(date);
    console.log("Selected time (local):", formattedTime);
  };
  return (
    <div>
      <DatePicker
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        selected={startTime}
        onChange={handleTimeChange}
        placeholderText="Select Time"
        className="form-control input text-white input-bordered w-full md:max-w-xs bg-[#133D39]"
        minTime={new Date().setHours(10, 0, 0)}
        maxTime={new Date().setHours(19, 0, 0)}
      />
    </div>
  );
}

export default TimePicking;
