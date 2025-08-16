import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { Link as ScrollLink } from "react-scroll";
import logo from '@/assets/logo.png';

interface User {
  username: string;
  id: number;
  email: string;
}

interface NavbarLandingProps {
  user: User | null;
}

const NavbarLanding: React.FC<NavbarLandingProps> = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(window.innerWidth >= 800);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 800);
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

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDesktop]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`nav fixed top-0 left-0 right-0 z-50 shadow transition-all duration-300 ${
          isScrolled && isDesktop ? "w-full" : "mx-auto navbar-responsive"
        } bg-white`}
        style={{ width: isScrolled && isDesktop ? "100%" : "70%" }}
      >
        <div
          className={`relative flex flex-col ${dropdownOpen ? 'overflow-visible' : 'overflow-hidden'} px-4 py-4 md:flex-row md:items-center container ${isScrolled && isDesktop ? "nav-content" : ""}`}
        >
          <a href="#" className="flex items-center whitespace-nowrap text-2xl font-black">
            <img src={logo} alt="Logo" className="mr-2 text-4xl text-blue-600 w-auto h-11" />
            <span className="text-black">Banyuwangi<span className="geast text-blue-400">trip</span></span>
          </a>

          <input type="checkbox" className="peer hidden" id="navbar-open" />
          <label className="absolute pt-2 top-5 right-7 cursor-pointer xl:hidden" htmlFor="navbar-open">
            <span className="sr-only">Toggle Navigation</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <nav
            aria-label="Header Navigation"
            className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all xl:flex xl:flex-row xl:ml-24 xl:max-h-full xl:items-start"
          >
            <ul className="flex flex-col items-center space-y-2 xl:flex-row xl:ml-auto xl:space-y-0 oswald">
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink to="home" spy={true} smooth={true} duration={500} hashSpy={true} className="cursor-pointer">
                  Home
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink to="opentrip" spy={true} smooth={true} duration={500} hashSpy={true} className="cursor-pointer">
                  Open Trip
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink to="eventorganizer" spy={true} smooth={true} duration={500} hashSpy={true} className="cursor-pointer">
                  Event Organizer
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12 hover:text-blue-400">
                <ScrollLink to="aboutus" spy={true} smooth={true} duration={500} hashSpy={true} className="cursor-pointer">
                  About Us
                </ScrollLink>
              </li>
              <li className="text-gray-600 xl:mr-12">
                <div className="my-4 flex items-center space-x-6 space-y-2 xl:my-0 xl:ml-auto xl:space-x-8 xl:space-y-0">
                  {user ? (
                    <div className="m-4 relative">
                      <button
                        className="relative inline-flex cursor-pointer select-none items-center  text-gray-600 px-4 py-2.5 text-center text-sm font-medium   hover:text-blue-400"
                        onClick={toggleDropdown}
                      >
                        <span>{user.username}</span>
                        <svg className="ml-2 h-4 w-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <Link href="/user/register" className="whitespace-nowrap rounded-xl px-5 py-3 font-medium text-gray-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:text-blue-400">
                        Register
                      </Link>
                      <Link href="/user/login" className="whitespace-nowrap rounded-xl bg-blue-500 px-5 py-3 font-medium text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 hover:bg-blue-600">
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </li>
            </ul>
          </nav>
        </div>

        {/* Dropdown yang dipindahkan ke luar container utama */}
        {dropdownOpen && (
          <div 
            className="fixed top-16 right-4 w-44 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white shadow-lg z-50"
            style={{ 
              right: isScrolled && isDesktop ? 'calc(15% + 1rem)' : 'calc(15% + 1rem)',
              top: '4.5rem'
            }}
          >
            <ul className="py-1 text-sm text-gray-700">
              <li>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100">Pesanan saya</a>
              </li>
          
            </ul>
            <ul className="py-1 text-sm text-gray-700">
                  <li>
        <Link 
          href="/logout" 
          method="post" 
          as="button" 
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Sign out
        </Link>
      </li>
                  </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default NavbarLanding;