import { Helmet } from "react-helmet";
import PageHeader from "../../../Components/Common/PageHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

function Appointment() {
  const [isPast, setIsPast] = useState(false);

  const {
    data: doctorData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const res = await axios.get("https://docs-point-server-prrajnxiu-hosains-projects-1e2169e4.vercel.app/appointment");
      return res.data;
    },
  });
  if (isLoading) {
    return <p>...loading</p>;
  }
  const appointmentData = doctorData.map((d) => d);
  appointmentData.map((data) => {
    const convertToDate = (dateStr) => {
      const [month, day, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    };
    console.log(data.date);

    if (convertToDate > data?.date) {
      setIsPast(true);
    }
  });

  const deletePassAppointment = (id) => {
    axios.delete(`https://docs-point-server-prrajnxiu-hosains-projects-1e2169e4.vercel.app/appointment/${id}`).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  return (
    <div>
      <Helmet>
        <title>Docs House | Service</title>
      </Helmet>
      <PageHeader pageSubTitle="Home / Appointement" pageTitle="Appointment" />
      <div>
        <div className="overflow-x-auto max-w-screen-2xl mx-auto py-12 text-black">
          <table className="table">
            {/* head */}
            <thead className="text-white bg-[#07332F] ">
              <tr className="border-black">
                <th>#</th>
                <th>Name</th>
                <th>SERVICE</th>
                <th>TIME</th>
                <th>{isPast ? "" : "Action"}</th>
              </tr>
            </thead>
            {appointmentData.map((data, index) => (
              <tbody
                className={`${
                  index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"
                } `}
                key={data._id}
              >
                <tr
                  className={`${
                    isPast ? "bg-red-500 animate-pulse" : ""
                  } border-black`}
                >
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.services}</td>
                  <td>{data?.date}</td>
                  <td>
                    {isPast ? (
                      ""
                    ) : (
                      <FaDeleteLeft
                        onClick={() => deletePassAppointment(data._id)}
                        style={{ fontSize: "24px" }}
                      ></FaDeleteLeft>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
        ;
      </div>
    </div>
  );
}

export default Appointment;
