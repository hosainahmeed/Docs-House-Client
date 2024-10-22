import { DateRangePicker } from "@nextui-org/react";


function DatePicker(dates) {
  const currentDate = new Date(); // Get today's date
  
  console.log(`The range of dates that got picked is: ${dates.text}`);
  console.log(`The min date that got picked is: ${dates.minDate}`);
  console.log(`The max date that got picked is: ${dates.maxDate}`);
  console.log(
    `The number of days that got picked is: ${dates.numberOfDaysPicked}`
  );
  console.log(`All dates: ${dates.allDates}`);

  // Callback function for date range picker
  function callbackFunction(selectedDates) {
    console.log("Selected dates:", selectedDates);
  }

  return (
    <div>
      <h1 className="title">Date Range Picker Component</h1>

      <div className="sub-title">Simple date picker</div>
      <DateRangePicker
        language="English"
        colorsPalette="enabled"
        format="DD-MM-YYYY"
        selectAllButton="disabled"
        minDate={currentDate} // Disable past dates
        firstDayOfWeekIndex={0}
        pickMethod="date"
        defaultColor="#178905"
        daysAmountTab="disabled"
        boardsNum={1}
        callback={callbackFunction}
      />

      <div className="sub-title">Range picker (default values)</div>
      <DateRangePicker
        minDate={currentDate} // Disable past dates
        callback={callbackFunction}
      />

      <div className="sub-title">Multiple ranges picker</div>
      <DateRangePicker
        selectAllButton="enabled"
        pickMethod="ranges"
        minDate={currentDate} // Disable past dates
        callback={callbackFunction}
      />

      <div className="sub-title">
        Hebrew version (right to left). All features enabled with ranges pick method
      </div>
      <DateRangePicker
        language="Hebrew"
        colorsPalette="enabled"
        format="DD-MM-YYYY"
        selectAllButton="enabled"
        minDate={currentDate} // Disable past dates
        firstDayOfWeekIndex={0}
        pickMethod="ranges"
        defaultColor="#178905"
        daysAmountTab="enabled"
        boardsNum={2}
        callback={callbackFunction}
      />
    </div>
  );
}

export default DatePicker;
