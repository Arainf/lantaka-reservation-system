import React, { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom"; // Import NavLink for routing
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
    icon: <FaHome style={{ height: '1rem', width: '1rem', margin: '5px 0'}} />, // Icon for Dashboard
    display: "Dashboard", // Text displayed for Dashboard
    url: "/dashboard" // URL for Dashboard
  },
  {
    icon: <IoCalendarSharp style={{ height: '1rem', width: '1rem' , margin: '5px 0'}} />, // Icon for Reservations
    display: "Reservations", // Text displayed for Reservations
    url: "/reservations" // URL for Reservations
  },
  {
    icon: <FaPeopleGroup style={{ height: '1rem', width: '1rem' , margin: '5px 0'}} />, // Icon for Guest
    display: "Guest", // Text displayed for Guest
    icon2: <IoMdArrowDropdown style={{}} />, // Icon for dropdown
    url: "guests", // No URL since it's a dropdown
    dropdown: true // Indicate this item is a dropdown
  },
  {
    icon: <IoPerson style={{ height: '1rem', width: '1rem' , margin: '5px 0'}} />, // Icon for Accounts
    display: "Accounts", // Text displayed for Accounts
    url: "/accounts" // URL for Accounts
  },
];

// Array of additional navigation links (bottom)
const navMoreInfo = [
  {
    icon: <BiLogOut style={{ height: '1rem', width: '1rem' , margin: '5px 0'}} />, // Icon for Logout
    display: "Logout", // Text displayed for Logout
  },
];

const NavigationSide = ({ isOpen }) => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setLoading(true); // Show spinner
      try {
        // Simulate a delay for logout process (replace with actual logout logic)
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async logout
        // Perform any logout logic here if needed (e.g., clearing tokens)
        navigate('/');  // Redirect to the login page
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        setLoading(false); // Hide spinner
      }
    }
  };

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
        src="src/assets/images/logo1.png?height=50&width=50" // Logo image
        alt="AteneoSeal" // Alt text for logo
        className="logoStyle" // Logo styling class
        style={{ display: isOpen ? 'block' : 'block' }}
      />
      <div className="title">
        <h1 className={`titleStyle ${isOpen ? 'visible' : 'invisible'}`}>
          &lt; Lantaka Reservation System / &gt;
        </h1>
        <h6 className={`subtitleStyle ${isOpen ? 'visible' : 'invisible'}`}>
          "Database Management & Web System and Technologies"
        </h6>
      </div>
    </div>

    <nav className="navStyle">
    {navLinks.map((item, index) => ( // Iterate through navLinks array
        <div key={index}> 
            {item.dropdown ? ( // Check if the current item has a dropdown
                <div onClick={toggleDropdown} className="linkStyle" style={{ cursor: 'pointer' }}>
                    {item.icon} {/* Icon for dropdown (e.g., could be a dashboard icon) */}
                    <span className="linkTextStyle" style={linkTextStyle}>
                        {item.display} {/* Display text (e.g., "Dashboard") */}
                    </span>
                    <div style={{ flexGrow: '1', paddingLeft: '70px', display: isOpen ? 'block' : 'none' }}>
                        {item.icon2} {/* Dropdown arrow icon */}
                    </div>
                </div>
            ) : (
                <NavLink
                    to={item.url} // Navigation link to specific URL (e.g., /reservations)
                    className="linkStyle"
                    style={({ isActive }) => ({ color: isActive ? '#FCB813' : 'white' })} // Active link color
                >
                    {item.icon} {/* Link icon (e.g., could be an icon for reservations) */}
                    <span className="linkTextStyle" style={linkTextStyle}>
                        {item.display} {/* Link text (e.g., "Reservations") */}
                    </span>
                </NavLink>
            )}
            {item.dropdown && dropdownOpen && ( // Render dropdown items if the dropdown is open
                <div className="dropdownMenu">
                    <NavLink to="/guest-list" className="dropdownItem">Guest List</NavLink> {/* Dropdown item (link to guest list) */}
                    <NavLink to="/guest-details" className="dropdownItem">Guest Details</NavLink> {/* Dropdown item (link to guest details) */}
                </div>
            )}
        </div>
    ))}
</nav>


      <hr style={{ height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'yellow', position: 'sticky', bottom: '7%' }} /> {/* Divider */}

      <nav className="navstyleBottom" onClick={handleLogout}>
        {navMoreInfo.map((item, index) => ( // Iterate through navMoreInfo
          <NavLink key={index} to={item.url} className="navMoreInfo">
            {item.icon} {/* Icon for bottom links */}
            <span className="linkTexStyle" style={linkTextStyle}>
              {item.display} {/* Display text for bottom links */}
            </span>
          </NavLink>
        ))}
      </nav>

            {/* Spinner overlay */}
      {loading && (
        <div className="spinner-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default NavigationSide; // Export the component for use in other parts of the app
