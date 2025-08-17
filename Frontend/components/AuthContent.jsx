"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "@/utils/firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AuthContent() {

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        uid: user.uid,
        userEmail: user.email,
        userName: user.displayName,
        userPhoto: user.photoURL,
        emailVerified: user.emailVerified,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/sign`,
        { userData },
        { withCredentials: true }
      );
      router.push("/dashboard");
    } catch (error) {
      console.error(
        "Login error:",
        error?.response?.data?.message || error.message
      );
    }
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row h-screen w-full bg-white">
      {/* Left */}
      <div className="w-full py-5 lg:w-1/2 flex flex-col justify-center items-center px-8 lg:px-20 bg-gradient-to-br from-[#1a1a1a] via-[#222] to-[#111] text-white">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <svg className="w-7 h-7 mt-1" xmlns="http://www.w3.org/2000/svg" fill="url(#grad)">
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3EC1F3" />
                <stop offset="100%" stopColor="#7B3DED" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" />
          </svg>
          <span className="text-xl font-bold">DevSyntra</span>
        </Link>

        <h1 className="lg:text-4xl text-2xl font-extrabold mb-3">
          Welcome To Freelenso👋
        </h1>
        <p className="text-gray-300 mb-8">
          Sign in/up to manage your projects, track clients, and stay on top of deadlines.
        </p>

        <button
          onClick={handleLogin}
          className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-lg font-medium shadow-lg hover:scale-105 transition"
        >
          <FcGoogle size={24} /> Continue with Google
        </button>

        <p className="mt-6 text-sm text-gray-400">
          Developed by{" "}
          <span className="text-[#3EC1F3] font-medium cursor-pointer hover:underline">
            DevSyntra
          </span>
        </p>
      </div>

      {/* Right */}
      <div className="flex lg:w-1/2 w-full h-full relative bg-white">
        <Image
          src="/auth_img.avif"
          alt="Freelance work background"
          fill
          className="object-cover opacity-70"
        />
        <div className="absolute hidden inset-0 bg-gradient-to-t from-black/70 to-transparent lg:flex flex-col justify-end p-10">
          <h3 className="text-2xl font-bold mb-2">
            Manage Your Freelance Business in One Place
          </h3>
          <p className="text-gray-300 max-w-sm">
            Organize projects, handle client communication, send invoices, and get paid faster — all from one dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
