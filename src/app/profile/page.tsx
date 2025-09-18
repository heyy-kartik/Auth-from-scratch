"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

import User from "@/model/userModel";
import connectToDatabase from "@/dbConfig/dbconfig";
import toast from "react-hot-toast";
const page = () => {
  const router = useRouter();
  const logout = () => {
    try {
      const res = axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed ", error.message);
      router.push("/login");
      toast.error(error.message);
    }
  };
  return (
    <div className=" align-middle items-center mt-5 ml-10 p-3">
      <h2 className="text-2xl font-mono ">This is this Login page </h2>
      <h2 className="text-lg font-mono ">User : </h2>
      <h2 className="text-lg font-mono ">Email : </h2>

      <button
        onClick={logout}
        className="p-4 m-2 hover:border hover: border-blue-400 outline-blue-300 rounded-lg bg-green-800 "
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};

export default page;
