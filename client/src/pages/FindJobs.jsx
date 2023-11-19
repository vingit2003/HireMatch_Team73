import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import { BsStars } from "react-icons/bs";
import Header from "../components/Header";
import { experience, jobTypes } from "../utils/data";
import { CustomButton, JobCard, ListBox } from "../components";
import { apiRequest, updateURL } from "../utils";
import { Loading } from "../components";

const FindJobs = () => {
  const [sort, setSort] = useState("Newest");
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [filterJobTypes, setFilterJobTypes] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const [expVal, setExpVal] = useState([]);

  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchJobs = async () => {
    setIsFetching(true);

    const newURL = updateURL({
      pageNum: page,
      query: searchQuery,
      cmpLoc: jobLocation,
      sort: sort,
      navigate: navigate,
      location: location,
      jType: filterJobTypes,
      exp: filterExp,
    });

    try {
      const res = await apiRequest({
        url: "/jobs" + newURL,
        method: "GET",
      });

      setNumPage(res?.numOfPage);
      setRecordsCount(res?.totalJobs);
      setData(res?.data);

      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el != val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
  };

  const filterExperience = async (e) => {
    if (expVal?.includes(e)) {
      setExpVal(expVal?.filter((el) => el != e));
    } else {
      setExpVal([...expVal, e]);
    }
  };

  useEffect(() => {
    if (expVal.length > 0) {
      let newExpVal = [];

      expVal?.map((el) => {
        const newEl = el?.split("-");
        newExpVal.push(Number(newEl[0]), Number(newEl[1]));
      });

      newExpVal?.sort((a, b) => a - b);

      setFilterExp(`${newExpVal[0]}-${newExpVal[newExpVal?.length - 1]}`);
    }
  }, [expVal]);

  useEffect(() => {
    fetchJobs();
  }, [sort, filterJobTypes, filterExp, page]);

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    await fetchJobs();
  };

  const handleShowMore = async (event) => {
    event.preventDefault();
    setPage((prev) => prev + 1);
  };

  return (
    <div>
      <Header
        type='home'
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}
      />

      <div className='container mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-[#f7fdfd]'>
        <div className='w-full md:w-5/6 px-5 md:px-0'>
          <div className='flex items-center justify-between mb-4'>
            <p className='text-sm md:text-base'>
              <span className='font-semibold'>{recordsCount}</span> Jobs
              Available
            </p>

            {/* <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
              <p className='text-sm md:text-base'>Sort By:</p>

              <ListBox sort={sort} setSort={setSort} />
            </div> */}
          </div>

          <div className='w-full flex flex-wrap gap-4'>
            {data?.map((job, index) => {
              const newJob = {
                name: job?.company?.name,
                logo: job?.company?.profileUrl,
                ...job,
              };
              return <JobCard job={newJob} key={index} />;
            })}
          </div>

          {isFetching && (
            <div className="py-10">
              <Loading />
            </div>
          )}

          {numPage > page && !isFetching && (
            <div className='w-full flex items-center justify-center pt-16'>
              <CustomButton
                title='Load More'
                containerStyles={`text-[#005b54] py-1.5 px-5 focus:outline-none hover:bg-[#01332f] hover:text-white rounded-full text-base`}
                onClick={handleShowMore}
              />
            </div>
          )}
        </div>

        <div className='px-5 hidden md:flex flex-col w-1/4 h-fit bg-white shadow-sm'>
          <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center'>
            <p className='text-lg font-semibold md:text-base text-[#005b54]'>Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
          <br />
          <p className='text-lg font-semibold text-[#005b54] mt-5'>Filter Search</p>

          <div className='py-2'>
            <div className='flex justify-between mb-3'>
              <p className='flex items-center gap-2 font-semibold'>
                <BiBriefcaseAlt2 />
                Job Type
              </p>
            </div>

            <div className='flex flex-col gap-2'>
              {jobTypes.map((jtype, index) => (
                <div key={index} className='flex gap-2 text-sm md:text-base '>
                  <input
                    type='checkbox'
                    value={jtype}
                    className='w-4 h-4'
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{jtype}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindJobs;
