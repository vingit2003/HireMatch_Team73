import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyCard, CustomButton, Header, ListBox } from "../components";
import { apiRequest } from "../utils";
import { Loading } from "../components";
import { updateURL } from "../utils";

const Companies = () => {
  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cmpLocation, setCmpLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const fetchCompanies = async () => {
    setIsFetching(true);

    const newURL = updateURL({
      pageNum: page,
      query: searchQuery,
      cmpLoc: cmpLocation,
      sort: sort,
      navigate: navigate,
      location: location,
    });

    try {
      const res = await apiRequest({
        url: newURL,
        method: "GET",
      });
      console.log(res);
      setNumPage(res?.numOfPage);
      setRecordsCount(res?.total);
      setData(res?.data);

      setIsFetching(false);

    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    await fetchCompanies();
  };
  const handleShowMore = () => { };

  useEffect(() => {
    fetchCompanies();
  }, [page, sort]);

  return (
    <div className='w-full'>
      <Header
        title='Find your DREAM Company'
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setCmpLocation}
      />

      <div className='container mx-auto flex flex-col gap-5 2xl:gap-10 px-7 py-6 bg-[#f7fdfd]'>
        <div className='flex items-center justify-between mb-4'>
          <p className='text-sm md:text-base'>
            <span className='font-semibold'>{recordsCount}</span> {" "} Companies
            Available
          </p>
        </div>

        <div className='w-full flex flex-row flex-wrap gap-6'>
          {data?.map((cmp, index) => (
            <CompanyCard cmp={cmp} key={index} />
          ))}

          {isFetching && (
            <div className='mt-10'>
              <Loading />
            </div>
          )}
        </div>
        <p className='text-sm text-right mx-auto'>
          {data?.length} companies of {recordsCount}
        </p>

        {numPage > page && !isFetching && (
          <div className='w-full flex items-center justify-center pt-16'>
            <CustomButton
              onClick={handleShowMore}
              title='Load More'
              containerStyles={`text-[#005b54] py-1.5 px-5 focus:outline-none hover:bg-[#01332f] hover:text-white rounded-full text-base`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;
