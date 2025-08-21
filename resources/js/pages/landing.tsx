  import { useState, useRef } from 'react';
  import AppLayout from '@/layouts/app-layout';
  import { Head, Link } from '@inertiajs/react';
  import NavbarLanding from '@/components/NavbarLanding';
  import { Swiper, SwiperSlide } from 'swiper/react';
  import { Swiper as SwiperType } from 'swiper/types';
  import 'swiper/css';
  import { ParallaxProvider } from 'react-scroll-parallax';
  import { Parallax } from 'react-scroll-parallax'; 
  import ijenImage from '@/assets/ijen.jpg';
  import djawatan from '@/assets/djawatan.jpg';
  import pulaumerah from '@/assets/pulaumerah.jpg';
  import bedil from '@/assets/bedil.jpeg';
  import  {MarqueeDemo} from '../layouts/app/MarqueeDemo';
  import AboutUs from '../layouts/app/AboutUs';
  import Open from '@/components/Open';
  interface Destination {
    id: number;
    name: string;
    subtitle: string;
    location: string;
    description: string;
    images: string[];
    package: string[];
    rundown: string[];
    price: string[];
    duration: string;
  }

  interface LandingProps {
    destinations: Destination[];
    auth: {
      user: {
        id: number;
        username: string;
        email: string;
      } | null;
    };
  }

  export default function Landing({ destinations, auth }: LandingProps) {
    const user = auth.user;
    const [activeDestination, setActiveDestination] = useState({
      id: 1,
      name: 'KAWAH IJEN',
      subtitle: 'GUNUNG',
      location: 'Kawah Ijen',
      description: 'Kawah Ijen terkenal dengan fenomena api biru yang langka dan pemandangan kawah belerangnya yang spektakuler.',
      image: ijenImage
    });

    const swiperRef = useRef<SwiperType | null>(null);

    const destinationsswiper = [
      {
        id: 1,
        name: 'KAWAH IJEN',
        subtitle: 'GUNUNG',
        location: 'Kawah Ijen',
        description: 'Kawah Ijen terkenal dengan fenomena api biru yang langka dan pemandangan kawah belerangnya yang spektakuler.',
        image: ijenImage
      },
      {
        id: 2,
        name: 'PULAU MERAH',
        subtitle: 'PANTAI',
        location: 'Banyuwangi',
        description: 'Pulau Merah terkenal dengan pantainya yang berpasir merah kecoklatan dan ombak yang ideal untuk surfing.',
        image: pulaumerah
      },
      {
        id: 3,
        name: 'DJAWATAN',
        subtitle: 'HUTAN',
        location: 'Benculuk',
        description: 'Djawatan terkenal dengan suasana hutan yang indah dengan pohon Trembesi yang rindang dan suasana magis.',
        image: djawatan
      },
      {
        id: 4,
        name: 'BEDIL',
        subtitle: 'PANTAI',
        location: 'Banyuwangi',
        description: 'Pantai Bedil dikenal dengan keindahan pasir putih dan suasananya yang tenang.',
        image: bedil
      }
    ];

    const handlePrev = () => {
      if (swiperRef.current) {
        swiperRef.current.slidePrev();
      }
    };

    const handleNext = () => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    };

    return (
      <>
  <     NavbarLanding user={user} />
        <ParallaxProvider>
      

        <section className="relative h-[80vh] w-full overflow-hidden  ">
          <img
            src={activeDestination.image}
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="container relative z-10 mx-auto flex h-full flex-col items-start justify-center px-4">
            <div className="">
              <div className="lg:max-w-xl lg:pr-5">
                <p className="flex text-sm uppercase text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-1 inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                  An agency for high growth startups
                </p>
                <h2 className="mb-6 max-w-lg text-5xl font-bold leading-snug tracking-tight text-white sm:text-7xl sm:leading-snug">
                  {activeDestination.name}
                  <span className="my-1 inline-block border-b-8 border-white px-4 font-bold text-white">{activeDestination.subtitle}</span>
                </h2>
                <p className="text-base text-white">{activeDestination.description}</p>
              </div>
              <div className="mt-10 flex flex-col items-center md:flex-row">
            <a 
    href="/" 
    className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-[#2563EB]     px-6 font-medium tracking-wide text-white shadow-md transition md:mr-4 md:mb-0 md:w-auto focus:outline-none hover:bg-[#465658] "
  >
    Stream Now
  </a>
    
                <a href="/" aria-label="" className="group inline-flex items-center font-semibold text-white"
                  >Watch how it works
                  <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-2 ml-4 h-6 w-6 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-4 w-full max-w-md hidden xl:block">
            <div className="relative">
              {/* Navigation Buttons */}
              <button 
                onClick={handlePrev}
                className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/30 p-2 text-white backdrop-blur-sm hover:bg-white/50"
                aria-label="Previous"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={handleNext}
                className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/30 p-2 text-white backdrop-blur-sm hover:bg-white/50"
                aria-label="Next"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
  <Swiper
    spaceBetween={12}
    slidesPerView={3}
    breakpoints={{
      640: { slidesPerView: 3 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 3 }
    }}
    onSwiper={(swiper: SwiperType) => {
      swiperRef.current = swiper;
    }}
    onSlideChange={(swiper: SwiperType) => {
      const activeIndex = swiper.activeIndex;
      if (destinationsswiper[activeIndex]) {
        setActiveDestination(destinationsswiper[activeIndex]);
      }
    }}
    className="!w-full "
  >
    {destinationsswiper.map((destination) => (
      <SwiperSlide  key={destination.id}>
        <div
          onClick={() => setActiveDestination(destination)}
          className={` h-56 cursor-pointer overflow-hidden rounded-lg border-2 transition-transform duration-300 ${
            activeDestination.id === destination.id ? 'border-blue-500 scale-105' : 'border-white/50'
          }`}
        >
        <img
        src={destination.image}
        alt={destination.name}
        className="w-full h-full object-cover sm:h-40 md:h-48 lg:h-56"
      />

        </div>
      </SwiperSlide>
    ))}
  </Swiper>
            </div>
          </div>
        </section>
      <section className="relative z-20 py-6 xl:hidden">
    <div className="container mx-auto px-4 max-w-md">
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-white/30 p-2 text-white backdrop-blur-sm hover:bg-white/50"
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 z-30 -translate-y-1/2 transform rounded-full bg-white/30 p-2 text-white backdrop-blur-sm hover:bg-white/50"
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <Swiper
          spaceBetween={12}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 3 },
          }}
          onSwiper={(swiper: SwiperType) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper: SwiperType) => {
            const activeIndex = swiper.activeIndex;
            if (destinationsswiper[activeIndex]) {
              setActiveDestination(destinationsswiper[activeIndex]);
            }
          }}
          className="!w-full"
        >
          {destinationsswiper.map((destination) => (
            <SwiperSlide key={destination.id}>
              <div
                onClick={() => setActiveDestination(destination)}
                className={`aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border-2 transition-transform duration-300 ${
                  activeDestination.id === destination.id ? 'border-blue-500 scale-105' : 'border-white/50'
                }`}
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>

    
        <MarqueeDemo/>
    





  </ParallaxProvider>
    <AboutUs />
        {/* Destination Cards Section */}
      <section id="card" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-3xl font-bold text-center">Explore Our Destinations</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {destinations.map((destination) => (
                <div key={destination.id} className="group overflow-hidden rounded-2xl bg-white shadow-xl transition duration-200 hover:-translate-y-2">
                  <div className="h-60 overflow-hidden">
                    {destination.images[0] && (
                      <img 
                        src={destination.images[0]} 
                        alt={destination.name}
                        className="h-full w-full object-cover transition duration-200 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{destination.name}</h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {destination.subtitle}
                      </span>
                    </div>
                    
                    <p className="mb-3 text-gray-600">{destination.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-1">Paket Wisata:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {destination.package.slice(0, 3).map((pkg, i) => (
                          <li key={i}>• {pkg}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold mb-1">Harga Mulai:</h4>
                      <p className="text-blue-600 font-medium">
                        {destination.price[0] || 'Hubungi kami'}
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          {destination.location}
                        </p>
                        <p className="text-sm text-gray-500">
                          <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {destination.duration}
                        </p>
                      </div>
                                  <Link 
                  href={`/destinations/${destination.id}?user_id=${auth.user?.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  Detail <span className="ml-1">→</span>
                </Link>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }