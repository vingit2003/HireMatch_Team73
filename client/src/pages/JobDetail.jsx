import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { CustomButton, Loading } from "../components";
import { useSelector } from "react-redux";
import { apiRequest } from "../utils";
import { FaRupeeSign } from "react-icons/fa";

const JobDetail = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [job, setJob] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [selected, setSelected] = useState("0");
  const [isFetching, setIsFetching] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [capability, setCapability] = useState("");

  const fetchJobDetails = async () => {
    setIsFetching(true);

    try {
      const res = await apiRequest({
        url: "/jobs/get-job-detail/" + id,
        method: "GET",
      });

      setJob(res?.data);
      setSimilarJobs(res?.similarJobs);
      setIsFetching(false);

    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const handleDeletePost = async () => {
    setIsFetching(true);
    try {
      if (window.confirm("Confirm to delete the post!")) {
        const res = await apiRequest({
          url: "/jobs/delete-job/" + job?._id,
          token: user?.token,
          method: "DELETE",
        });
        if (res?.success) {
          alert(res?.message);
          window.location.replace("/");
        }
      }
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };

  const handleUploadResume = (event) => {
    const uploadedFile = event.target.files[0];
    setResumeFile(uploadedFile);
  };

  const handleRemoveResume = () => {
    setResumeFile(null);
  };

  const handleCapabilityChange = (event) => {
    setCapability(event.target.value);
  };

  const isFormValid = () => {
    if (!capability || !resumeFile) {
      alert("Please complete all details before submitting.");
      return false;
    }
    return true;
  };

  const handleApplyJob = async () => {
    try {
      setIsFetching(true);
  
      if (!isFormValid()) {
        setIsFetching(false);
        return;
      }

      setTimeout(async () => {
        setIsFetching(false);
  
        const updatedJob = {
          ...job,
          application: job.application ? job.application.concat("New Applicant") : ["New Applicant"],
        };
  
        setJob(updatedJob);
  
        alert("Your job application has been submitted!");
        setResumeFile(null);
        setCapability("");
      }, 2000);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  };
  

  useEffect(() => {
    id && fetchJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  const isSeeker = user?.accountType === "seeker";

  return (
    <div className='container'><br></br>
      {isFetching ? (
        <Loading />
      ) : (
        <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md mx-auto mt-20'>
          <div className='w-full flex items-center justify-between'>
            <div className='w-3/4 flex gap-2'>
              <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className='w-20 h-20 md:w-24 md:h-20 rounded'
              />

              <div className='flex flex-col'>
                <p className='text-xl font-semibold text-gray-600'>
                  {job?.jobTitle}
                </p>

                <span className='text-base'>{job?.location}</span>

                <span>
                  {job?.company?.name}
                </span>

                <span className='text-gray-500 text-sm'>
                  {moment(job?.createdAt).fromNow()}
                </span>
              </div>
            </div>
          </div>

          <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>
            <div className='bg-[#bae5f4] w-40 h-16 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Job</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.jobType}
              </p>
            </div>

            <div className='bg-[#bdf4c8] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Applicants</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.application?.length}
              </p>
            </div>

            <div className='bg-[#cecdff] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Vacancies</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.vacancies}
              </p>
            </div>

            <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>
              <span className='text-sm'>Experience</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.experience}
              </p>
            </div>
            <div className='bg-[#ffcddf] w-40 h-16 rounded-lg flex flex-col items-center justify-center mx-auto mt-2'>
              <span className='text-sm'>Salary</span>
              <p className='text-lg font-semibold text-gray-700 flex items-center'>
                <FaRupeeSign className="mr-1" /> <span>{job?.salary}</span>
              </p>
            </div>

          </div>

          <div className='w-full flex gap-4 py-5'>
          <CustomButton
              onClick={() => setSelected("1")}
              title='Company Details'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${selected === "1"
                ? "bg-[#005b54] text-white"
                : "bg-white text-[#005b54] border border-[#005b54]"
                }`}
            />
            <CustomButton
              onClick={() => setSelected("0")}
              title='Job Details'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${selected === "0"
                ? "bg-[#005b54] text-white"
                : "bg-white text-[#005b54] border border-[#005b54]"
                }`}
            />
          </div>

          <div className='my-6'>
            {selected === "0" ? (
              <>
                <p className='text-xl font-semibold'>Job Description</p>
                <span className='text-base'>{job?.detail[0]?.desc}</span>

                {job?.detail[0]?.requirements && (
                  <>
                    <p className='text-xl font-semibold mt-8'>Requirements (Skills)</p>
                    <span className='text-base'>
                      {job?.detail[0]?.requirements}
                    </span>
                  </>
                )}
              </>
            ) : (
              <>
                <div className='mb-6 flex flex-col'>
                  <p className='text-xl text-black italic font-semibold'>
                    Company name: {job?.company?.name}
                  </p>
                  <p><b>Location: </b><span className='text-base'>{job?.company?.location}</span></p>
                  <p><b>Email: </b><span>{job?.company?.email}</span></p>
                </div>

                <p className='text-xl font-semibold'>About Company</p>
                <span>{job?.company?.about}</span>
              </>
            )}
          </div>
          {isSeeker && (
            <>
              <div className='w-full flex flex-col mt-4 '>
                <div className="font-semibold text-xl text-black">
                  Skills:
                </div>

                <textarea
                  placeholder="Your skills for this job . . . "
                  value={capability}
                  onChange={handleCapabilityChange}
                  className='w-full p-2 border rounded'
                />
              </div>

              <div className='w-full flex items-center justify-between mt-4'>
                {!resumeFile ? (
                  <>
                    <label
                      htmlFor="resume-upload"
                      className='cursor-pointer bg-black text-white py-2 px-4 rounded flex mx-auto'
                    >
                      Upload Resume
                    </label>
                    <input
                      type="file"
                      id="resume-upload"
                      className="hidden"
                      onChange={handleUploadResume}
                      accept=".pdf"
                    />
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <p className="mr-2">{resumeFile.name}</p>
                      <button
                        type="button"
                        onClick={handleRemoveResume}
                        className="text-red-500"
                      >
                        &#10006;
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          <div className='w-full flex items-center justify-center mt-4'>
            {user?._id === job?.company?._id && (
              <CustomButton
                title='Delete Job'
                containerStyles='w-50 flex items-center justify-center text-white bg-pink-900 py-3 px-5 outline-none rounded-full text-base'
                onClick={handleDeletePost}
              />
            )}

            {!user || (user.accountType === 'seeker' && (
              <CustomButton
                title='Apply to Job'
                containerStyles='w-50 flex items-center justify-center text-white bg-[#5f9d83] py-3 px-5 outline-none rounded-full text-base'
                onClick={handleApplyJob}
              />
            ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetail;
