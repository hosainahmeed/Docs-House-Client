import { useState } from "react";
import DatePicking from "../../Components/DatePicker/DatePicking";
import Contact from "../Home/Contact/Contact";

function AdminPanel() {
  const [minTime, setMinTime] = useState("10:00");
  const [maxTime, setMaxTime] = useState("19:00");

  // Handle changes for the minTime input
  const handleMinTimeChange = (e) => {
    setMinTime(e.target.value);
  };

  // Handle changes for the maxTime input
  const handleMaxTimeChange = (e) => {
    setMaxTime(e.target.value);
  };

  // Prevent default form submission
  const handleTimeManage = (e) => {
    e.preventDefault();
    console.log("Start Time:", minTime);
    console.log("End Time:", maxTime);
  };

  console.log(minTime,maxTime);
  

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <h2>Admin Panel</h2>
        <form onSubmit={handleTimeManage}>
          <label>
            Set Start Time:
            <input type="time" value={minTime} onChange={handleMinTimeChange} />
          </label>
          <br />
          <label>
            Set End Time:
            <input type="time" value={maxTime} onChange={handleMaxTimeChange} />
          </label>
          <br />
          <input type="submit" value="Save Time" />
        </form>
      </div>
      <div>
        <h3>User Time Picker</h3>
        
        <Contact></Contact>
      </div>
    </>
  );
}

export default AdminPanel;
