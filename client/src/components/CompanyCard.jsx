import React from "react";
import { Link } from "react-router-dom";

const CompanyCard = ({ cmp: { _id, profileUrl, name, email, location } }) => {
  const cardStyle = {
    wordWrap: "break-word",
  };

  return (
    <div
      className='w-80 h-32 flex gap-4 items-center border border-black shadow-md rounded mb-4 hover:bg-[#005b54]/40 hover:scale-105 transform'
      style={{ transition: 'background-color 1s ease, transform 1s ease' }}
    >
      <div className='w-1/3 h-full flex items-center'>
        <div className='w-20 h-20 md:w-24 md:h-24 rounded overflow-hidden p-1'>
          <Link to={`/company-profile/${_id}`}>
            <img src={profileUrl} alt={name} className='w-full h-full object-cover' />
          </Link>
        </div>
      </div>

      <div className='w-2/3 h-full flex flex-col justify-between px-4 py-2'>
        <div style={cardStyle}>
          <Link
            to={`/company-profile/${_id}`}
            className='text-base md:text-lg font-semibold text-gray-600 truncate'
          >
            {name}
          </Link>
          <span className='text-sm text-[#074742] block'>{email}</span>
          <p className='text-sm text-gray-600 truncate'>{location}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;


