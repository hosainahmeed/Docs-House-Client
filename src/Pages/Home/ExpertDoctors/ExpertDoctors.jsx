import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import ReactStars from "react-rating-stars-component";
import { CiLocationOn } from "react-icons/ci";
import { ImCoinDollar } from "react-icons/im";
import { MdEventAvailable } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

function ExpertDoctors() {
  // const doctorDetails = useDocs([]);
  const [axiosPublic] = useAxiosPublic();
  const {
    data: doctorsProfile = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["doctorsProfile"],
    queryFn: async () => {
      const response = await axiosPublic.get("/doctorsProfile");
      return response.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    onError: (err) => {
      console.error("Error fetching doctors profile:", err);
    },
  });

  // Check for loading and error states

  let expert = doctorsProfile.filter(
    (detail) => detail.experience === "expert"
  );
  const navigate = useNavigate(); // To navigate programmatically

  // Function to handle the button click and log the doctor's details
  const handleViewProfile = (doctor) => {
    navigate("/docsprofile", { state: { doctor } });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;
  return (
    <>
      {isLoading ? (
        <div>.....loading</div>
      ) : (
        <div className="mt-12 md:mt-28">
          <SectionTitle
            heading="Our Expert Doctors"
            subHeading="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inve ntore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
          ></SectionTitle>
          <div className="flex items-center flex-col md:flex-row justify-center gap-4 py-12 px-4">
            {expert.map((dets) => (
              <div
                key={dets._id}
                className="card bg-base-100 w-full md:w-96 shadow-2xl overflow-hidden"
              >
                <div className="px-4 pt-4 h-[300px] overflow-hidden">
                  <img
                    src={dets.image}
                    alt="Doctor"
                    className="rounded-xl object-cover object-top h-full w-full"
                  />
                </div>
                <div className="card-body items-start overflow-hidden">
                  <h2 className="card-title text-ellipsis whitespace-nowrap">
                    {dets.name}
                  </h2>
                  <p className="text-ellipsis whitespace-nowrap">
                    BTP - {dets.expertise}
                  </p>
                  <ReactStars count={dets.rating} size={24} color="#ffd700" />
                  <div className="divider"></div>
                  <div className="text-start text-base overflow-hidden">
                    <div className="flex items-center">
                      <CiLocationOn />
                      <h1 className="ml-2 text-ellipsis whitespace-nowrap">
                        {dets.location}
                      </h1>
                    </div>
                    <div className="flex items-center">
                      <MdEventAvailable />
                      <h1 className="ml-2">{dets.available_on}</h1>
                    </div>
                    <div className="flex items-center">
                      <ImCoinDollar />
                      <h1 className="ml-2">${dets.price}</h1>
                    </div>
                  </div>
                  {/* Use a button instead of wrapping in a Link */}
                  <button
                    className="btn"
                    onClick={() => handleViewProfile(dets)} // Log and navigate
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ExpertDoctors;
