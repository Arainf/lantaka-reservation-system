import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import './navigationside.css';

const NavigationTop = (onSidebarToggle) => {
  const [profile, setProfile] = useState({
    imageUrl: "", // Will be dynamically fetched
    name: "Adrian Rainier Fabian",
    email: "220622@adzu.edu.ph",
  });

  return (
    <div className="flex p-0 justify-between flex-row items-center overflow-hidden w-screen text-white h-14" style={{backgroundColor: '#001932'}}>
      <div className="flex flex-row items-center">
        <div className="menu flex flex-row items-center mx-5 menu" onClick={onSidebarToggle}>
          <GiHamburgerMenu />
        </div>
      </div>
      <div>
        <div className="profile">
          {/* profile section */}
          <div className="profile_primary flex flex-row relative items-center justify-start h-14 w-auto p-5 no-underline text-white">
            <img src={profile.imageUrl} alt="Profile" className="profile-img w-12 h-10  " />
            <div className="profile-details flex justify-between flex-row items-center w-screen">
              <div className="profile-text flex flex-col ">
                <h4 className="profile-name">{profile.name}</h4>
                <p className="profile-email ">{profile.email}</p>
              </div>
              {/* <button
                  // onClick={handleLogout}
                  className='profile-logout-button'>
                  <SlLogout />
                </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>

    // {/* Spinner overlay */}
    // {loading && (
    //   <div className="spinner-overlay">
    //     <div className="loader"></div>
    //   </div>
    // )}
  );
};

export default NavigationTop;
