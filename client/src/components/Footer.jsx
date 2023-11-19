import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className='text-white mp-20 position-fixed '>
      <div className='overflow-x-hidden mt-96'></div>
      <div className='bg-[#005b54]'>
        <div className='container px-5 py-20 mx-auto'>
          <div className='w-full flex flex-wrap gap-10 justify-around -mb-10 -mt-10 -px-4'>
            <div className='w-auto px-4'>
              <h2 className='font-medium text-white tracking-widest text-sm mb-3'>
                Company
              </h2>

              <div className='mb-10 flex flex-col gap-3 '>
                <Link
                  to="/"
                  className='text-gray-300 text-sm hover:text-white'
                >
                  Home
                </Link>
                <Link
                  to="/about-us"
                  className='text-gray-300 text-sm hover:text-white'
                >
                  About Us
                </Link>
              </div>
            </div>

            <div className='w-auto px-4'>
              <h2 className='font-medium text-white tracking-widest text-sm mb-3'>
                Support
              </h2>

              <div className='mb-10 flex flex-col gap-3'>
                <Link
                  to="https://docs.google.com/forms/d/e/1FAIpQLSdRWiANHH80Gi-bl9rv9MY_Mjq8SNtBatHybEnPtmhuvWf1vw/viewform?usp=sf_link"
                  target="_blank"
                  className='text-gray-300 text-sm hover:text-white '
                >
                  Feedback
                </Link>
                <Link
                  to="https://docs.google.com/forms/d/e/1FAIpQLSe5d8DAVA8EWcGt92xOXf4ve0TJohezkQFI8Hpq_AvjcTVTNA/viewform?usp=sf_link"
                  target="_blank"
                  className='text-gray-300 text-sm hover:text-white '
                >
                  Support Center
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-[#01332f]'>
          <div className='container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row'>
            <p className='text-gray-300 text-sm text-center sm:text-left'>
              &copy; 2023 HireMatch
            </p>

            <span className='inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto'>
              <a className='text-white text-2xl hover:text-2xl hover:scale-125 ease-in-out duration-300'>
                <FaFacebookF />
              </a>
              <a className='ml-10 text-white text-2xl hover:text-1.5xl hover:scale-125 ease-in-out duration-300'>
                <FaTwitter />
              </a>
              <a className='ml-10 text-white text-2xl hover:text-1.5xl hover:scale-125 ease-in-out duration-300'>
                <FiInstagram />
              </a>
              <a className='ml-10 text-white text-2xl hover:text-1.5xl hover:scale-125 ease-in-out duration-300'>
                <FaLinkedinIn />
              </a>
              <a className='ml-10 text-white text-2xl hover:text-1.5xl hover:scale-125 ease-in-out duration-300'>
                <FaGithub />
              </a>
            </span>

            <span className='sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-300 text-sm'>
              Project by Team 73
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;