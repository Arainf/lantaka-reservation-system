import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import { FaHome } from "react-icons/fa"; // Import home icon
import { IoCalendarSharp } from "react-icons/io5"; // Import calendar icon
import { FaPeopleGroup } from "react-icons/fa6"; // Import people group icon
import { IoPerson } from "react-icons/io5"; // Import person icon
import { BiLogOut } from "react-icons/bi"; // Import logout icon
import { IoMdArrowDropdown } from "react-icons/io"; // Import dropdown arrow icon
import { MdOutlineRoomService } from "react-icons/md";
import { RiListSettingsFill } from "react-icons/ri";
import './navigationside.css'; // Import CSS for styling
import { ListCheck, SquareMenu } from "lucide-react";

// Array of navigation links for the sidebar
const navLinks = [
  {
    icon: <FaHome style={{ height: '1rem', width: '1rem', margin: '5px 0' }} />, // Icon for Dashboard
    display: "Dashboard", // Text displayed for Dashboard
    url: "/dashboard" // URL for Dashboard
  },
  {
    icon: <IoCalendarSharp style={{ height: '1rem', width: '1rem', margin: '5px 0' }} />, // Icon for Reservations
    display: "Reservations", // Text displayed for Reservations
    url: "/reservations", 
  },
  {
    icon: <FaPeopleGroup style={{ height: '1rem', width: '1rem', margin: '5px 0' }} />, // Icon for Guest
    display: "Guest", // Text displayed for Guest
    url: "/guestlist", 
  },


  {
    icon: <MdOutlineRoomService style={{ height: '1rem', width: '1rem', margin: '5px 0' }} />, // Icon for Venue
    display: "Room/Venue", // Text displayed for Accounts
    url: "/roomvenue" // URL for Accounts
  },

  {
    icon: <RiListSettingsFill style={{ height: '1rem', width: '1rem', margin: '5px 0' }} />, // Icon for Venue
    display: "Utilities", // Text displayed for Accounts
    url: "/Utilities" // URL for Accounts
  },
  {
    icon: <IoPerson style={{ height: '1rem', width: '1rem', margin: '5px 0' }} />, // Icon for Accounts
    display: "Accounts", // Text displayed for Accounts
    url: "/accounts" // URL for Accounts
  },
  
];

const handleLogout = async () => {
  setIsLoading(true);
  try {
    localStorage.clear();
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    navigate("/");
  } catch (error) {
    console.error("Error logging out:", error);
  } finally {
    setIsLoading(false);
  }
};

// Array of additional navigation links (bottom) 
const navMoreInfo = [
  {
    icon: <BiLogOut style={{ height: '1rem', width: '1rem', margin: '5px 0' }} />, // Icon for Logout
    display: "Logout", // Text displayed for Logout
    url: handleLogout // URL for Logout
  },
];

const NavigationSide = ({ isOpen }) => {
 

  const ParentComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <NavigationSide isOpen={isOpen} setIsOpen={setIsOpen} />
    );
  };

  

  // Style for the sidebar depending on whether it's open or not
  const sidebarStyle = {
    width: isOpen ? '15rem' : '5rem', // Expand or collapse sidebar
  };

  // Style for the text links based on sidebar state
  const linkTextStyle = {
    display: isOpen ? 'inline' : 'none', // Show or hide text based on sidebar state
  };

  return (
    <div className="sidebarStyle" style={sidebarStyle}>
      <div className="headerStyle">
      <img
          src="src/assets/images/SchoolLogo.png?height=50&width=50" // Logo image
          alt="AteneoSeal" // Alt text for logo
          className="logoStyle" // Logo styling class
          style={{ display: isOpen ? 'none' : 'block' }}
        />
        <div className="title">
          <h1 className={`titleStyle ${isOpen ? 'visible' : 'invisible'}`} style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}>
          &lt; Lantaka Reservation System / &gt;
          </h1>
        </div>
      </div>

      <nav className="navStyle">
        {navLinks.map((item, index) => (
          <div key={index}>
            {item.dropdown ? (
              <div onClick={toggleDropdown } className="linkStyle" style={{ cursor: 'pointer' }}>
                {item.icon}
                <span className="linkTextStyle" style={linkTextStyle}>
                  {item.display}
                </span>
                <div style={{ flexGrow: '1', paddingLeft: '44px', display: isOpen ? 'block' : 'none' }}>
                  {item.icon2}
                </div>
              </div>
            ) : (
              <NavLink
                to={item.url}
                className="linkStyle"
                style={({ isActive }) => ({ color: isActive ? '#FCB813' : 'white' })}
              >
                {item.icon}
                <span className="linkTextStyle" style={linkTextStyle}>
                  {item.display}
                </span>
              </NavLink>
            )}
              {item.dropdown && dropdownOpen && isOpen && (
                <div className="dropdownMenu">
                  <NavLink to="/reservations" className="dropdownItem">Room List</NavLink>
                 
              </div>
            )}
           
          </div>
        ))}
      </nav>

      <hr style={{ height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'yellow', position: 'sticky', bottom: '7%' }} />

      <nav className="navstyleBottom">
        {navMoreInfo.map((item, index) => (
          <NavLink key={index} onClick={item.url} className="navMoreInfo">
            {item.icon}
            <span className="linkTextStyle" style={linkTextStyle}>
              {item.display}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavigationSide;