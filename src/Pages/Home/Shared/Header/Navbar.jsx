import { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Helmet } from "react-helmet";
import logo from '../../../../assets/Icon/logo.png'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Appointment", path: "/appointment" },
    { label: "Login", path: "/login" },
    { label: "SignuUp", path: "/signup" },
  ];

  return (
    <div className="fixed w-full bg-[#111111a4] z-[999]">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between p-4">
        <Helmet>
          <title>Doc House | Home page</title>
        </Helmet>
        <div>
        <img className={isMenuOpen?"hidden":"h-[60px]"} src={logo} alt="logo image" />
        </div>
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center text-white justify-between gap-12 z-[999] transition-all">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        {/* Mobile Menu Toggle */}
        <label
          className="btn md:hidden text-black btn-circle transition-all"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <RxCross2 /> : <IoMdMenu />}
        </label>
        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-0 z-[-1] transition-all right-0 w-full bg-base-100 shadow-md p-4 md:hidden">
            <ul className="flex flex-col items-center">
              {menuItems.map((item, index) => (
                <li key={index} className="py-2">
                  <Link to={item.path} onClick={() => setIsMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
