import { Link, useLocation } from "react-router-dom";
import logo from "../../../../assets/Icon/logo.png";
import SmallButton from "../../../../Components/button/SmallButton";
function Footer() {
  const Quick_Links = [
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/services" },
    { name: "Doctors", path: "/doctors" },
    { name: "Departments", path: "/departments" },
    { name: "Online Payment", path: "/payment" },
    { name: "Contact Us", path: "/contact" },
    { name: "My Account", path: "/account" },
  ];
  const Doc_House_Services = [
    "Pediatric Clinic",
    "Diagnosis Clinic",
    "Cardiac Clinic",
    "Laboratory Analysis",
    "Gynecological Clinic",
    "Personal Counseling",
    "Dental Clinic",
  ];
  const location = useLocation()
  const appoint = location.pathname !== '/appointment'

  return (
    <div className="bg-[#F3F3F3] mt-12 md:mt-28">
      <footer className="footer footer-center text-base-content px-2 py-12 md:p-12">
        <div className="footer bg-base-200 text-base-content text-base p-10">
          <aside className="flex items-center  md:items-start gap-6 justify-center flex-col">
            <img src={logo} alt="" />
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. has been since the printer took.
            </p>
            <Link to={appoint? '/appointment':'/'}>
              <SmallButton color="#F7A582" value={appoint? "Appointment": "Home"}></SmallButton>
            </Link>
          </aside>
          <nav className="flex items-center md:items-start justify-center flex-col">
            <h6 className="footer-title">Quick Links</h6>
            <ul className=" text-base md:text-start">
              {Quick_Links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className="flex items-center justify-center flex-col md:items-start">
            <h6 className="footer-title">Doc House Services</h6>
            <div className="flex items-center md:items-start justify-center flex-col">
              {Doc_House_Services.map((service, index) => (
                <p key={index}>{service}</p>
              ))}
            </div>
          </nav>
          <nav className="flex items-center md:items-start justify-center flex-col">
            <h6 className=" md:text-start footer-title">Working Hours</h6>
            <p>Sunday-Monday - 10 am to 7 pm</p>
          </nav>
        </div>
        <div className="text-base">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
