"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaCamera,
  FaEdit,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
const DashboardProfile: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string>("");
  const [bannerImage, setBannerImage] = useState<string>("");
  useEffect(() => {
    const storedProfileImage = localStorage.getItem("profileImage");
    const storedBannerImage = localStorage.getItem("bannerImage");
    if (storedProfileImage) setProfileImage(storedProfileImage);
    if (storedBannerImage) setBannerImage(storedBannerImage);
  }, []);
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setProfileImage(imageDataUrl);
        localStorage.setItem("profileImage", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        setBannerImage(imageDataUrl);
        localStorage.setItem("bannerImage", imageDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
  <div className="px-2 sm:ml-[-7px] lg:ml-[-30px] xl:ml-0 flex justify-center xl:justify-end items-center w-full">
      <div className="bg-gray-800 text-white flex flex-col items-center w-full max-w-full mx-auto rounded-lg shadow-lg overflow-hidden">
      <div className="relative w-full">
        <Image
          height={160}
          width={100}
          src={bannerImage || "/banner-default.jpg"}
          alt="Banner"
          className="w-full h-40 object-cover"
        />
        <label className="absolute top-2 right-2 bg-gray-800 p-2 rounded-full cursor-pointer">
          <FaEdit className="text-white text-lg" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBannerChange}
          />
        </label>
      </div>
      <div className="relative -mt-14">
        <Image
          height={112}
          width={112}
          src={profileImage || "/profile-default.jpg"}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-white object-cover"
        />
        <label className="absolute bottom-1 right-1 bg-gray-800 p-2 rounded-full cursor-pointer">
          <FaCamera className="text-white text-sm" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileChange}
          />
        </label>
      </div>
      <h2 className="mt-4 text-2xl font-bold font-integralCf tracking-wider">
        Areesha Sattar
      </h2>
      <p className="text-gray-400 text-sm font-satoshi xxl:text-[18px]">Full Stack Developer</p>
      <div className="flex justify-center mt-4 w-full border-t border-gray-700 py-3 font-satoshi">
        <div className="text-center px-6">
          <p className="text-xl font-semibold font-satoshi xxl:text-[23px]">50</p>
          <p className="text-gray-400 text-sm font-satoshi xxl:text-[18px]">Posts</p>
        </div>
        <div className="text-center px-6 border-l border-gray-700 border-r">
          <p className="text-xl font-semibold font-satoshi xxl:text-[23px]">1.2K</p>
          <p className="text-gray-400 text-sm font-satoshi xxl:text-[18px]">Followers</p>
        </div>
        <div className="text-center px-6">
          <p className="text-xl font-semibold font-satoshi xxl:text-[23px]">400</p>
          <p className="text-gray-400 text-sm font-satoshi xxl:text-[18px]">Following</p>
        </div>
      </div>
      <div className="px-6 w-full mt-4">
        <h3 className="text-lg xxl:text-[23px] font-semibold border-b border-gray-700 pb-2 text-center font-satoshi">
          About Me
        </h3>
        <p className="text-gray-300 text-sm xxl:text-[18px] mt-2 text-center md:px-20 font-satoshi">
          Passionate Full Stack Developer with expertise in Next.js, Tailwind
          CSS, and modern web technologies.
        </p>
      </div>
      <div className="mt-4 mb-6">
        <h3 className="text-lg font-semibold xxl:text-[23px]">Follow Me On</h3>
        <div className="flex space-x-4 mt-2">
          <Link href="#" className="text-gray-400 hover:text-white">
            <FaGithub size={20} className="h-[20px] w-[20px] xxl:h-[25px] xxl:w-[25px]"/>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <FaLinkedin size={20} className="h-[20px] w-[20px] xxl:h-[25px] xxl:w-[25px]" />
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <FaTwitter size={20} className="h-[20px] w-[20px] xxl:h-[25px] xxl:w-[25px]"/>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-white">
            <FaInstagram size={20} className="h-[20px] w-[20px] xxl:h-[25px] xxl:w-[25px]"/>
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default DashboardProfile;
