'use client';

import { useEffect, useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { MdDashboard, MdGeneratingTokens } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa";

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
});

const SideNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="p-4 z-50 fixed top-0 left-0">
        <button onClick={toggleSidebar} className="text-gray-800 dark:text-white">
          {!isOpen && <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-40 w-64 max-w-[264px] h-full
          bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-3 flex flex-col h-full relative">

          {/* Close Button inside (optional if already in toggle) */}
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 text-gray-800 dark:text-white"
            aria-label="Close Sidebar"
          >
            <FaTimes size={20} />
          </button>

          {/* Dashboard Link */}
          <Link href="/" className='mt-8' onClick={() => setIsOpen(false)}>
            <div className='px-3 py-4 flex items-center hover:bg-gray-700 rounded-2xl cursor-pointer'>
              <span className='flex items-center gap-2'>
                <MdDashboard className='text-gray-600 text-[16px]' size={24} />
                <h1 className={`${poppins.className} text-lg font-semibold`}>Dashboard</h1>
              </span>
            </div>
          </Link>

          {/* Credit Tokens */}
          <Link href="/tses-dashboard" onClick={() => setIsOpen(false)}>
            <div className='px-3 py-4 flex items-center hover:bg-gray-700 rounded-2xl cursor-pointer'>
              <span className='flex items-center gap-2'>
                <MdGeneratingTokens className='text-gray-600 text-[16px]' size={24} />
                <h1 className={`${poppins.className} text-lg font-semibold`}>Credit Tokens</h1>
              </span>
            </div>
          </Link>

        </div>
      </div>
    </>
  );
};

export default SideNav;
