"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface UserData {
  _id: string;
  username: string;
  email: string;
}

const page = () => {
  const router = useRouter();
  const [data, setdata] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout Failed ", error.message);
      toast.error("Logout failed");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log(res.data);
      setdata(res.data.data);
      toast.success("User details loaded");
    } catch (error: any) {
      console.log("Get user details failed:", error.message);
      toast.error("Failed to load user details");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className=" align-middle items-center mt-5 ml-10 p-3">
      <h2 className="text-2xl font-mono ">This is the Profile page</h2>

      {data ? (
        <>
          <h2 className="text-lg font-mono ">User: {data.username}</h2>
          <h2 className="text-lg font-mono ">Email: {data.email}</h2>
          <h2 className="text-lg font-mono ">
            ID:
            <Link
              href={`/profile/${data._id}`}
              className="text-blue-500 underline ml-2"
            >
              {data._id}
            </Link>
          </h2>
        </>
      ) : (
        <>
          <h2 className="text-lg font-mono ">User: Not loaded</h2>
          <h2 className="text-lg font-mono ">Email: Not loaded</h2>
        </>
      )}

      <div className="mt-4">
        <button
          onClick={getUserDetails}
          disabled={loading}
          className="p-4 m-2 hover:border hover:border-blue-400 outline-blue-300 rounded-lg bg-green-800 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Get User Details"}
        </button>
        <button
          onClick={logout}
          disabled={loading}
          className="p-4 m-2 hover:border hover:border-blue-400 outline-blue-300 rounded-lg bg-red-600 disabled:opacity-50"
        >
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default page;
