import { useState } from "react";
import DatePicker from "react-datepicker";
const DatePicking = ({ setValue, name }) => {
  const [startDate, setStartDate] = useState(null);

  const handleDateChange = (date) => {
    setStartDate(date);
    setValue(name, date);
    console.log("Selected date:", date);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        placeholderText="Select date"
        className="form-control input text-white input-bordered w-full md:max-w-xs bg-[#133D39]"
      />
    </div>
  );
};

export default DatePicking;
