import React from 'react';
import { Parallax } from 'react-scroll-parallax'; // pastikan ini ada
import pulaumerah from '@/assets/pulaumerah.jpg';

const AboutUs = () => {
  return (

      <section className=" relative w-full overflow-hidden  h-[70vh]  ">
        {/* Background image */}
        <img
          src={pulaumerah}
          alt="Aerial view of resort"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

        {/* Text content */}
        <div className="relative z-20 flex items-center justify-start h-full px-6 md:px-16">
          <div className="max-w-xl text-white space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight drop-shadow-lg">
             About us
            </h2>
            <p className="text-lg md:text-xl drop-shadow-md">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio odio esse neque ad iste ea libero, pariatur magni id soluta laborum. Aliquam at consectetur nulla fugit ex quos dolor dicta delectus ab repellat magni in eligendi harum quae unde temporibus animi recusandae, laborum quis ea omnis. Iste saepe iusto voluptatum eum quo ad harum eligendi aperiam. Porro ea, a minus quidem voluptatum odit voluptates delectus architecto commodi recusandae dolore aspernatur nihil impedit, rem fugit enim eos? Accusamus, nesciunt enim! Soluta libero, ex rem incidunt labore laudantium perferendis distinctio ratione magni error cupiditate aliquid vel eius, totam quos rerum, sit vitae!
            </p>
          </div>
        </div>
      </section>
    
  );
};

export default AboutUs;
