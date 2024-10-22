import { Helmet } from "react-helmet";
import PageHeader from "../../../Components/Common/PageHeader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaDeleteLeft } from "react-icons/fa6";
import { Card, Skeleton } from "@nextui-org/react";
import notFound from '../../../assets/404/404.jpg'
function Appointment() {

  const {
    data: doctorData =[],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["doctor"],
    queryFn: async () => {
      const res = await axios.get(
        "https://docs-point-server-bw7y6chty-hosains-projects-1e2169e4.vercel.app/appointment"
      );
      return res.data;
    },
  });

  if (isLoading) {
    // Show skeleton loader when loading
    return (
      <div className="flex justify-center py-10">
        <Card className="w-[200px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
      </div>
    );
  }

  if (!doctorData || doctorData.length === 0) {
    // Show 404 image or message if no data is found
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <img
          src={notFound}
          alt="404 Not Found"
          className="w-1/2 h-auto"
        />
        <p className="text-xl text-red-500 mt-5">No appointments found!</p>
      </div>
    );
  }

  const convertToDate = (dateStr) => {
    const [month, day, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const appointmentData = doctorData.map((data) => {
    const appointmentDate = convertToDate(data.date);
    const today = new Date();

    data.isPast = appointmentDate < today;
    return data;
  });

  const deletePassAppointment = (id) => {
    axios
      .delete(
        `https://docs-point-server-bw7y6chty-hosains-projects-1e2169e4.vercel.app/appointment/${id}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  return (
    <div>
      <Helmet>
        <title>Docs House | Service</title>
      </Helmet>
      <PageHeader pageSubTitle="Home / Appointment" pageTitle="Appointment" />
      <div>
        <div className="overflow-x-auto max-w-screen-2xl mx-auto py-12 text-black">
          <table className="table">
            <thead className="text-white bg-[#07332F]">
              <tr className="border-black">
                <th>#</th>
                <th>Name</th>
                <th>SERVICE</th>
                <th>TIME</th>
                <th>Action</th>
              </tr>
            </thead>
            {appointmentData.map((data, index) => (
              <tbody
                className={`${index % 2 === 0 ? "bg-slate-300" : "bg-slate-200"}`}
                key={data._id}
              >
                <tr>
                  <th>{index + 1}</th>
                  <td>{data?.name}</td>
                  <td>{data?.services}</td>
                  <td>{data?.date}</td>
                  <td>
                    {!data.isPast && (
                      <FaDeleteLeft
                        onClick={() => deletePassAppointment(data._id)}
                        style={{ fontSize: "24px" }}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
