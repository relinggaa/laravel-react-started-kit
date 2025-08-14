import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { ComponentProps, useState, useEffect } from 'react';
import { Link as ScrollLink } from "react-scroll";
import logo from '@/assets/logo.png';

// Mendefinisikan tipe LinkProps yang diperoleh dari Inertia.js
type LinkProps = ComponentProps<typeof Link>;

const NavbarLanding: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 800);
      console.log('Window resized, isDesktop:', window.innerWidth >= 800);  // Debugging resize
    };

    const handleScroll = () => {

      if (isDesktop && window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isDesktop) {
      window.addEventListener("scroll", handleScroll);
    } else {
      window.removeEventListener("scroll", handleScroll);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup event listeners saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktop]);  // Pastikan hanya merespons perubahan isDesktop

  useEffect(() => {
    console.log('isScrolled:', isScrolled);  // Debugging isScrolled state
  }, [isScrolled]);


  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 shadow transition-all duration-300  ${
          isScrolled && isDesktop ? "w-full" : "mx-auto navbar-responsive"
        } bg-white`}
        style={{ width: isScrolled && isDesktop ? "100%" : "70%" }}
      >
        <div
          className={`relative flex flex-col overflow-hidden px-4 py-4 md:flex-row md:items-center container ${
            isScrolled && isDesktop ? "nav-content" : ""
          }`}
        >
          <a
            href="#"
            className="flex items-center whitespace-nowrap text-2xl font-black"
          >
            <img
              src={logo}
              alt="Logo"
              className="mr-2 text-4xl text-blue-600 w-auto h-11"
            />
            <span className="text-black">
              Banyuwangi<span className="geast text-blue-400">trip</span>
            </span>
          </a>
          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label
            className="absolute pt-2 top-5 right-7 cursor-pointer xl:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <nav
            aria-label="Header Navigation"
            className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all xl:flex xl:flex-row xl:ml-24 xl:max-h-full xl:items-start"
          >
            <ul className="flex flex-col items-center space-y-2 xl:flex-row xl:ml-auto xl:space-y-0 oswald">
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink
                  to="home"
                  spy={true}
                  smooth={true}
                  duration={500}
                  hashSpy={true}
                  className="cursor-pointer"
                >
                  Home
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink
                  to="opentrip"
                  spy={true}
                  smooth={true}
                  duration={500}
                  hashSpy={true}
                  className="cursor-pointer"
                >
                  Open Trip
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink
                  to="eventorganizer"
                  spy={true}
                  smooth={true}
                  duration={500}
                  hashSpy={true}
                  className="cursor-pointer"
                >
                  Event Organizer
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink
                  to="aboutus"
                  spy={true}
                  smooth={true}
                  duration={500}
                  hashSpy={true}
                  className="cursor-pointer"
                >
                  About Us
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12">
                <div className="my-4 flex items-center space-x-6 space-y-2 xl:my-0 xl:ml-auto xl:space-x-8 xl:space-y-0">
                  <a
                    href="/login"
                    title="Contact Now"
                    className="whitespace-nowrap rounded-xl bg-blue-500 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600"
                  >
                  Login
                  </a>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavbarLanding;
