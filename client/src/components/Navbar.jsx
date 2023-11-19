import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import CustomButton from "./CustomButton";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../redux/userSlice";
import { Logo } from "../assets";
import { NoProfile } from "../assets";
 
const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
 
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
 
      setIsNavbarVisible(
        currentScrollPos <= 0 || currentScrollPos < prevScrollPos
      );
 
      setPrevScrollPos(currentScrollPos);
    };
 
    window.addEventListener("scroll", handleScroll);
 
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);
 
  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };
 
  const handleProfileClick = () => {
    setIsProfileMenuVisible((prev) => !prev);
  };
 
  const closeProfileMenu = () => {
    setIsProfileMenuVisible(false);
  };
 
  return (
    <>
      <div
        style={{
          transition: "top 2s ease-in-out",
          top: isNavbarVisible ? "0" : "-80px",
          position: "fixed",
          width: "100%",
          backgroundColor: "#005b54",
          zIndex: "50",
        }}
      >
        <nav className='container mx-auto flex items-center justify-between p-3 h-20'>
          <Link to="/">
            <img src={Logo} alt='logo' className='w-28 h-28 rounded-full mt-7 object-cover' />
       
            </Link>
          <ul className='hidden lg:flex gap-8 text-sm'>
            <li>
              <i className="fa-solid fa-users" style={{ marginRight: "10px", color: "#000000" }}></i>
              <Link to='/about-us' className='text-white'>
                About Us
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-building" style={{ marginRight: "10px", color: "#000000" }}></i>
              <Link to='/companies' className='text-white'>
                Companies
              </Link>
            </li>
            <li>
              <i className="fa-solid fa-magnifying-glass-dollar" style={{ marginRight: "10px", color: "#000000" }}></i>
              <Link to='/' className='text-white'>
                Find Job
              </Link>
            </li>
          </ul>
 
          <div className='hidden lg:block'>
            {!user?.token ? (
              <Link to='/'>
                <CustomButton
                  title='Sign Up'
                  containerStyles='mx-2 text-white py-1.5 px-5 focus:outline-none text-white rounded-full text-base hover:bg-black'
                />
              </Link>
            ) : (
              <div className='flex items-center relative'>
                <div
                  className='cursor-pointer'
                  onClick={handleProfileClick}
                >
                  <img
                    src={user?.profileUrl || NoProfile}
                    alt='user profile'

                    className='w-14 h-14 rounded-full object-cover mr-5'
                  />
                </div>
                {isProfileMenuVisible && (
                  <div className='absolute right-0 top-14 bg-black p-0 rounded-md shadow-md' style={{ width: '150px' }}>
                    <div className='flex flex-col items-start'>
                      <Link to={`${user?.accountType ? "user-profile" : "company-profile"}`}>
                        <CustomButton
                          title={user?.accountType ? "User Profile" : "Company Profile"}
                          containerStyles='py-1 px-3 focus:outline-none text-white rounded-full text-xs mb-2'
                          onClick={closeProfileMenu}
                        />
                      </Link>
                      <CustomButton
                        title='Log Out'
                        containerStyles='py-1 px-3 focus:outline-none text-white rounded-full text-xs'
                        onClick={handleLogout}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
 
          <button
            className='block lg:hidden text-slate-900'
            onClick={() => setIsNavbarVisible((prev) => !prev)}
          >
            {isNavbarVisible ? <AiOutlineClose size={20} /> : <HiMenuAlt3 size={20} />}
          </button>
        </nav>
      </div>
    </>
  );
};
 
export default Navbar;