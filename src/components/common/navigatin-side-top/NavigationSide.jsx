import React, { useState } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink for routing
import { FaHome } from "react-icons/fa"; // Import home icon
import { IoCalendarSharp } from "react-icons/io5"; // Import calendar icon
import { FaPeopleGroup } from "react-icons/fa6"; // Import people group icon
import { IoPerson } from "react-icons/io5"; // Import person icon
import { BiLogOut } from "react-icons/bi"; // Import logout icon
import { IoMdArrowDropdown } from "react-icons/io"; // Import dropdown arrow icon

import sidebarBg from '@/assets/images/sidebar.png'; // Sidebar background image
import './navigationside.css'; // Import CSS for styling

// Array of navigation links for the sidebar
const navLinks = [
  {
    icon: <FaHome style={{ height: '1rem', width: '1rem' }} />, // Icon for Dashboard
    display: "Dashboard", // Text displayed for Dashboard
    url: "/dashboard" // URL for Dashboard
  },
  {
    icon: <IoCalendarSharp style={{ height: '1rem', width: '1rem' }} />, // Icon for Reservations
    display: "Reservations", // Text displayed for Reservations
    url: "/account" // URL for Reservations
  },
  {
    icon: <FaPeopleGroup style={{ height: '1rem', width: '1rem' }} />, // Icon for Guest
    display: "Guest", // Text displayed for Guest
    icon2: <IoMdArrowDropdown style={{}} />, // Icon for dropdown
    url: "", // No URL since it's a dropdown
    dropdown: true // Indicate this item is a dropdown
  },
  {
    icon: <IoPerson style={{ height: '1rem', width: '1rem' }} />, // Icon for Accounts
    display: "Accounts", // Text displayed for Accounts
    url: "/reservation" // URL for Accounts
  },
];

// Array of additional navigation links (bottom)
const navMoreInfo = [
  {
    icon: <BiLogOut style={{ height: '1rem', width: '1rem' }} />, // Icon for Logout
    display: "Logout", // Text displayed for Logout
    url: "/" // URL for Logout
  },
];

const NavigationSide = ({ isOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for controlling dropdown visibility

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle the current state
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
          src="src/assets/images/logo.png?height=50&width=50" // Logo image
          alt="AteneoSeal" // Alt text for logo
          className="logoStyle" // Logo styling class
          style={{ display: isOpen ? 'none' : 'block' }}
        />
        <h1 className="titleStyle" style={{ display: isOpen ? 'block' : 'none' }}>
          &lt; Lantaka Reservation System / &gt; {/* Title text for the system */}
        </h1>
        <h6 className="subtitleStyle" style={{ display: isOpen ? 'block' : 'none' }}>
          "Database Management & Web System and Technologies" {/* Subtitle */}
        </h6>
      </div>

      <nav className="navStyle">
        {navLinks.map((item, index) => ( // Iterate through navLinks
          <div key={index}>
            {item.dropdown ? ( // If the item is a dropdown
              <div onClick={toggleDropdown} className="linkStyle" style={{ cursor: 'pointer' }}>
                {item.icon} {/* Icon for dropdown */}
                <span className="linkTextStyle" style={linkTextStyle}>
                  {item.display} {/* Display text */}
                </span>
                <div style={{ flexGrow: '1', paddingLeft: '60px', display: isOpen ? 'block' : 'none' }}>
                  {item.icon2} {/* Dropdown arrow icon */}
                </div>
              </div>
            ) : (
              <NavLink
                to={item.url} // Navigation link
                className="linkStyle"
                style={({ isActive }) => ({ color: isActive ? '#FCB813' : 'white' })} // Active link color
              >
                {item.icon} {/* Link icon */}
                <span className="linkTextStyle" style={linkTextStyle}>
                  {item.display} {/* Link text */}
                </span>
              </NavLink>
            )}
            {item.dropdown && dropdownOpen && ( // Render dropdown items if open
              <div className="dropdownMenu">
                <NavLink to="/guest-list" className="dropdownItem">Guest List</NavLink> {/* Dropdown item */}
                <NavLink to="/guest-details" className="dropdownItem">Guest Details</NavLink> {/* Dropdown item */}
              </div>
            )}
          </div>
        ))}
      </nav>

      <hr style={{ height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'yellow', position: 'sticky', bottom: '7%' }} /> {/* Divider */}

      <nav className="navstyleBottom">
        {navMoreInfo.map((item, index) => ( // Iterate through navMoreInfo
          <NavLink key={index} to={item.url} className="linkStyle">
            {item.icon} {/* Icon for bottom links */}
            <span className="linkTextStyle" style={linkTextStyle}>
              {item.display} {/* Display text for bottom links */}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default NavigationSide; // Export the component for use in other parts of the app
