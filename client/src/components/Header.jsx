import React from "react";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import CustomButton from "./CustomButton";
import { HeroImage } from "../assets";

const headerBackgroundStyle = {
  backgroundImage: `url(${HeroImage})`,
  backgroundSize: "cover",
  filter: "brightness(100%)",
};

const SearchInput = ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  return (
    <div className={`flex w-full md:w-1/2 items-center ${styles}`}>
      {icon}

      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type='text'
        className='w-full md:w-64 p-2 outline-none bg-transparent text-base'
        placeholder={placeholder}
      />

      <AiOutlineCloseCircle
        className='hidden md:flex text-[gray-600] text-xl cursor-pointer'
        onClick={clearInput}
      />
    </div>
  );
};

const Header = ({
  title,
  type,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
}) => {
  return (
    <div className='bg-[#ffffff]' style={headerBackgroundStyle}>
      <div
        className={`container mx-auto px-5 ${type ? "h-[500px]" : "h-[350px]"
          } flex items-center relative`}
      >
        <div className='w-full z-10 mt-52'>
          <div className='w-2/3 flex items-center justify-around bg-white px-2 md:px-5 py-2.5 md:py-6 shadow-2xl rounded-full h-10 mb-36 mx-auto border border-black'>
            <SearchInput
              placeholder='Location'
              icon={<CiLocationOn className='text-black text-xl' />}
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            />
            <SearchInput
              placeholder='Job related keywords'
              icon={<AiOutlineSearch className='text-black text-xl' />}
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <div>
              <CustomButton
                onClick={handleClick}
                title='Search'
                containerStyles={
                  "text-white py-1 md:py3 px-3 md:px-3 focus:outline-none bg-[#005b54] rounded-full md:rounded-md text-sm md:text-base hover:bg-black hover:scale-105 transition-all duration-300 ease-in-out"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
