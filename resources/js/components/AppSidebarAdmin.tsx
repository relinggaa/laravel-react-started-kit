import React from "react";
import { Link } from "@inertiajs/react";

export default function AppSidebarAdmin() {
  return (
    <div className="h-screen w-64 pb-10">
      <div className="flex h-full flex-grow flex-col overflow-y-auto rounded-br-lg rounded-tr-lg bg-white pt-5 shadow-md">
        <div className="flex mt-10 items-center px-4">
          <img
            className="h-12 w-auto max-w-full align-middle"
            src="/images/R-Wx_NHvZBci3KLrgXhp1.png"
            alt="Logo"
          />
          <div className="ml-3 flex flex-col">
            <h3 className="font-medium">Admin Panel</h3>
            <p className="text-xs text-gray-500">Destinasi Wisata</p>
          </div>
        </div>

        <span className="ml-3 mt-10 mb-2 block text-xs font-semibold text-gray-500">
          Menu Utama
        </span>

        <nav className="flex-1">
          <Link
            href={route("dashboard")}
            className={`flex items-center py-2 px-4 text-sm font-medium transition-all duration-100 ease-in-out ${
              route().current("dashboard")
                ? "border-l-4 border-l-rose-600 text-rose-600"
                : "text-gray-600 hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600"
            }`}
          >
            <svg
              className="mr-4 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>

          <Link
               href="/admin/destinations/create"
            className={`flex items-center py-2 px-4 text-sm font-medium transition-all duration-100 ease-in-out ${
              route().current("destinations.create")
                ? "border-l-4 border-l-rose-600 text-rose-600"
                : "text-gray-600 hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600"
            }`}
          >
            <svg
              className="mr-4 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Tambah Destinasi
          </Link>

          <Link
                href={route('admin.orders')}
                className={`flex items-center py-2 px-4 text-sm font-medium transition-all duration-100 ease-in-out ${
                    route().current('admin.orders')
                        ? "border-l-4 border-l-rose-600 text-rose-600"
                        : "text-gray-600 hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600"
                }`}
            >
                <svg
                    className="mr-4 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
                Daftar Order
            </Link>
                <Link
                  href={route('admin.testimonials')}
                  className={`flex items-center py-2 px-4 text-sm font-medium transition-all duration-100 ease-in-out ${
                      route().current('admin.testimonials')
                          ? "border-l-4 border-l-rose-600 text-rose-600"
                          : "text-gray-600 hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600"
                  }`}
              >
                  <svg
                      className="mr-4 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                  >
                      <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                  </svg>
                  Testimoni
              </Link>

          <Link
              method="post" 
          as="button" 
                href="/logout" 
            className={`flex items-center py-2 px-4 text-sm font-medium transition-all duration-100 ease-in-out ${
              route().current("destinations.create")
                ? "border-l-4 border-l-rose-600 text-rose-600"
                : "text-gray-600 hover:border-l-4 hover:border-l-rose-600 hover:text-rose-600"
            }`}
          >
            <svg
              className="mr-4 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
             Sign out
          </Link>

 
        
  
        </nav>
      </div>
    </div>
  );
}