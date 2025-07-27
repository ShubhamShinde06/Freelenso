"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function AuthPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 bg-[#f2f2f2] dark:bg-[#262626] flex flex-col justify-center px-10 lg:px-20 py-10 rounded-r-[50px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
                  {/* Logo Icon */}
                  <div className="">
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <defs>
                        <linearGradient
                          id="freelensoGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#3EC1F3" />
                          <stop offset="100%" stopColor="#7B3DED" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#freelensoGradient)"
                        fillRule="evenodd"
                        d="M12 8a1 1 0 0 0-1 1v10H9a1 1 0 1 0 0 2h11a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-8Zm4 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"
                        clipRule="evenodd"
                      />
                      <path
                        fill="url(#freelensoGradient)"
                        fillRule="evenodd"
                        d="M5 3a2 2 0 0 0-2 2v6h6V9a3 3 0 0 1 3-3h8c.35 0 .687.06 1 .17V5a2 2 0 0 0-2-2H5Zm4 10H3v2a2 2 0 0 0 2 2h4v-4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>

                  {/* Logo Text/Name */}
                  <div className="relative w-[140px] h-[60px]">
                    <Image
                      src="/logo.png"
                      alt="Logo Text"
                      fill
                      priority
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 140px"
                    />
                  </div>
                </Link>

        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-white mb-4">
          Get started!
        </h1>
        <p className="text-white mb-2">
          Welcome to Medio. Start for free to create a new 3D project!
        </p>
        <p className="text-white mb-6">
          Already have an account?{" "}
          <span className="text-green-600 font-semibold cursor-pointer hover:underline">
            Sign In
          </span>
        </p>

        {/* Social Logins */}
        <div className="flex flex-col gap-4">
          <button className="flex items-center justify-center gap-3 border  py-3 rounded-md bg-[black] ">
            <FcGoogle size={24} /> Log in with Google
          </button>
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:block w-1/2 relative">
        <Image
          src="/authImge.jpg" // replace with your actual image in /public
          alt="Login Visual"
          fill
          className="object-cover"
        />
        {/* Overlay Content (optional) */}
        <div className="absolute bottom-10 left-10 text-white">
          <h3 className="text-2xl font-semibold">
            More Than Just A Creative Platform
          </h3>
        </div>

        {/* Carousel Indicators & Language */}
        <div className="absolute bottom-4 right-6 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
          <button className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center">
            &larr;
          </button>
          <button className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center">
            &rarr;
          </button>
          <div className="ml-4 px-3 py-1 bg-white text-sm rounded-full shadow-md flex items-center gap-2">
            🇪🇸 <span>ES</span>
          </div>
        </div>
      </div>
    </div>
  );
}
