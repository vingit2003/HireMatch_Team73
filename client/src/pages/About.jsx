import React from "react";

const About = () => {
  return (
    <div className='container mx-auto flex flex-col gap-8 2xl:gap-14 py-6 '>
      <div className='w-full flex flex-col-reverse md:flex-row gap-10 items-center p-5'>
        <div className='w-full md:2/3 2xl:w-2/4'>
          <br></br><br></br><br></br>
          <h1 className='text-3xl text-[#04833e]600 font-bold mb-5'>About Us</h1>
          <p className='text-justify leading-7'>
            Welcome to Hire Match - Your Gateway to Career Opportunities!

            At Hire Match, we are passionate about connecting talented individuals with exciting career opportunities. Our platform is designed to streamline the job search process, making it easier for both job seekers and employers to find their perfect match.
          </p>
        </div>
      </div>
      <div className='leading-8 px-5 text-justify'>
        <p>
          <h1 className='text-3xl font-bold mb-5'>Our Mission</h1>
          Empowering Careers, Transforming Lives

          We are on a mission to empower individuals by providing a platform that not only helps them find fulfilling jobs but also fosters professional growth. We believe that the right career move can transform lives, and we are dedicated to facilitating that transformation.
        </p>
      </div>

      <div className='leading-8 px-5 text-justify'>
        <p>
          <h1 className='text-3xl font-bold mb-5'>What Sets Us Apart</h1>
          <ul className='list-disc list-inside'>
            <li>User-Friendly Interface: Our user-friendly interface ensures a seamless and intuitive job search experience.</li>
            <li>Diverse Job Listings: We collaborate with a wide range of companies to bring you diverse job opportunities across various industries.</li>
            <li>Personalized Recommendations: Our intelligent algorithms provide personalized job recommendations tailored to your skills and preferences.</li>
          </ul>
        </p>
      </div>

      <div className='leading-8 px-5 text-justify'>
        <p>
          <h1 className='text-3xl font-bold mb-5'>Join Us on the Journey</h1>
          Whether you are a job seeker ready to embark on a new career path or an employer seeking top-notch talent, Hire Match is here for you. Join us on this journey of growth, discovery, and success.
        </p>
      </div>
      <div className='leading-8 px-5 text-justify'>
        <p>
          <h1 className='text-3xl font-bold mb-5'>Contact Us
          </h1>
          Have questions or suggestions? We'd love to hear from you! Reach out to our team at HireMatch@yourjobportal.com for any inquiries.

          Thank you for choosing Hire Match. Let's build your future together!

          Feel free to customize the content based on the specific features, values, and goals of your job portal website.
        </p>
      </div>
    </div>
  );
};

export default About;
