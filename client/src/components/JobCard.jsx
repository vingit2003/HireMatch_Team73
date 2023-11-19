import { GoLocation } from "react-icons/go";
import moment from "moment";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  return (
    <Link to={`/job-detail/${job?._id}`}>
      <div
        className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] bg-white flex flex-col justify-between shadow-lg 
    rounded-md px-3 py-5 border border-black hover:bg-[#005b54]/40 transition-all'
        style={{ transition: 'background-color 1s ease, transform 1s ease' }}
      >
        <div className="w-full h-full flex flex-col justify-between">
          <div className='flex gap-3'>
            <img
              src={job?.logo}
              alt={job?.name}
              className='w-14 h-14'
            />

            <div className='w-full h-16 flex flex-col justify-center'>
              <p className='w-full h-12 flex item-center text-lg font-semibold overflow-hidden leading-5'>{job?.jobTitle}</p>
              <span className='flex gap-2 items-center'>
                <GoLocation className='text-slate-900 text-sm' />
                {job?.location}
              </span>
            </div>
          </div>

          <div className='py-3'>
            <p className='text-sm'>
              {job?.detail[0]?.desc?.slice(0, 150) + "..."}
            </p>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-gray-500 text-sm'>
              {moment(job?.createdAt).fromNow()}
            </span>
            <p className='bg-[#ffffff] text-[#005b54] py-0.5 px-1.5 rounded font-semibold text-sm'>
              {job?.jobType}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
