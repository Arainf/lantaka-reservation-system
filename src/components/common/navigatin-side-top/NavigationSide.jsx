import { NavLink } from "react-router-dom"
import { FaIdBadge, FaHome } from "react-icons/fa"
import { IoCalendarSharp } from "react-icons/io5";
import { FaCircleQuestion } from "react-icons/fa6"
import { FaPeopleGroup } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { IoMdArrowDropdown } from "react-icons/io";


import sidebarBg from '@/assets/images/sidebar.png'
import './navigationside.css';

const navLinks = [
  {
    icon: <FaHome style={{ height: '1rem', width: '1rem' }} />,
    display: "Dashboard",
    url: "/home"
  },
  {
    icon: <IoCalendarSharp style={{ height: '1rem', width: '1rem' }} />,
    display: "Reservations",
    url: "/account"
  },
  {
    icon: <FaPeopleGroup style={{ height: '1rem', width: '1rem' }} />,
    display: "Guest",
    
    icon2: <IoMdArrowDropdown style={{ }} />,
    url: "",
    dropdown: true // Add this property to indicate a dropdown
  },
  {
    icon: <IoPerson style={{ height: '1rem', width: '1rem' }} />,
    display: "Accounts",
    url: "/reservation"
  },
]

const navMoreInfo = [
  {
    icon: <BiLogOut style={{ height: '1rem', width: '1rem' }} />,
    display: "Logout",
    url: "/"
  },
]


const NavigationSide = ({ isOpen }) => {
  const sidebarStyle = {
    width: isOpen ? '15rem' : '4rem',
    // backgroundImage: `url(${sidebarBg})`,
  }

  const logoStyle = {
    marginRight: isOpen ? '0.5rem' : '0',
    marginLeft: isOpen ? '0' : 'auto',
    marginRight: isOpen ? '0' : 'auto',
    display: 'none',
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown state
  };

  const icon2style = {
    flexGrow: '1',
    paddingLeft: '60px', // Adjust as necessary
    display: isOpen ? 'block' : 'none',
  };

 
  const titleStyle = {
    display: isOpen ? 'block' : 'none',
  }

  const subtitleStyle = {
    display: isOpen ? 'block' : 'none',
  }

  const linkStyle = (isActive) => ({
    // justifyContent: isOpen ? 'flex-start' : 'center',
    // color: isActive ? '#ffcc00' : '#ccc',
    // backgroundColor: isActive ? '#001a33' : 'transparent',
    // color: isActive ? '#ffcc00' : '#ccc',
    // backgroundColor: isActive ? '#001a33' : 'transparent',
  })

  const linkTextStyle = {
    display: isOpen ? 'inline' : 'none',
  }

  console.log(isOpen)

  return (
    <div
      className="sidebarStyle"
      style={sidebarStyle}>

      <div
        className="headerStyle">
        <img
          src="/placeholder.svg?height=50&width=50"
          alt="AteneoSeal"
          className="logoStyle"
          style={logoStyle}
        />
        <h1
          className="titleStyle"
          style={titleStyle}>
          &lt; Lantaka Reservation System / &gt;
        </h1>
        <h6
          className="subtitleStyle"
          style={subtitleStyle}>
          "Database Management & Web System and Technologies"
        </h6>
      </div>

      <nav
        className="navStyle">
        {navLinks.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className="linkStyle"
            style={({ isActive }) => linkStyle(isActive)}
          >
            {item.icon}
            <span
              className="linkTextStyle"
              style={linkTextStyle}>
              {item.display}
            </span>

            <div
              style={icon2style}>
              {item.icon2}
            </div>

            
          </NavLink>
        ))}
      </nav>

      <hr style={{ height: '1px', borderWidth: '0', color: 'gray', backgroundColor: 'yellow', position: 'sticky', bottom: '7%' }} />
      
      <nav
        className="navstyleBottom">
        {navMoreInfo.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className="linkStyle navMoreInfo"

          >
            {item.icon}
            <span
              className="linkTextStyle"
              style={linkTextStyle}>
              {item.display}
            </span>
          </NavLink>
        ))}
      </nav>

    </div>
  )
}

export default NavigationSide
