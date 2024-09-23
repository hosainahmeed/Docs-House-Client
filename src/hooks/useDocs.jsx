import { useEffect, useState } from "react";

function useDocs() {
  let [doctorDetails, setDoctorsDetails] = useState([]);

  useEffect(() => {
    fetch("/JSON/Doctors.json")
      .then((res) => res.json())
      .then((data) => {
        setDoctorsDetails(data);
      });
  }, []);
  return doctorDetails;
}

export default useDocs;
