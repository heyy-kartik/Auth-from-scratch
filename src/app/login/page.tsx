"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
export default function LoginPage() {
  const [user, setuser] = useState({
    user: "",
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    try {
      setloading(true);
      const res = await axios.post("/api/users/login", user);
      console.log("Login Sucessful ", res.data);
      toast.success("Login Sucess");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed ", error.message);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  return (
    <React.Fragment>
      <main>
        <div
          className="flex flex-col items-center justify-center
        py-2 p-5 align-middle "
        >
          <h2 className=""> {loading ? "Processing " : " Login"} </h2>
          <br></br>
          <label htmlFor="email"> </label>
          email{" "}
          <input
            className="p-2 border border-gray-700 focus:border-blue-500
            rounded-xl m-2"
            id="email "
            type="text"
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            placeholder="email "
          ></input>
          <label htmlFor="password"> </label>
          password{" "}
          <input
            className="p-2 border border-gray-700 focus:border-blue-500
            rounded-xl m-2"
            id="password "
            type="password"
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <p>
            <button
              className="pl-3.5 cursor-pointer  font-mono align-middle pr-2.5 focus:border-blue-500 hover:scale-102  rounded-lg outline-3 border-2 border-gray-600 "
              onClick={onLogin}
            >
              {" "}
              Login Here !
            </button>{" "}
          </p>
          <Link
            className="mt-3 cursor-pointer font-mono underline underline-offset-1"
            href="/signup"
          >
            {" "}
            Signup Here
          </Link>
        </div>
      </main>
    </React.Fragment>
  );
}
