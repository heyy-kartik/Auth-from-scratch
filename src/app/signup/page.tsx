"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function SignupPage() {
  const [user, setuser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setbuttonDisabled] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setbuttonDisabled(false);
    } else {
      setbuttonDisabled(true);
    }
  }, [user]);
  const router = useRouter();
  const onSignup = async () => {
    try {
      setloading(true);
      const responce = await axios.post("/api/users/signup", user);
      console.log("Signup Sucess", responce.data);
    } catch (err) {
      console.log("Error Happen 404");
    } finally {
      setloading(false);
    }
  };
  return (
    <React.Fragment>
      <main>
        <div
          className="flex flex-col items-center justify-center
        py-2 p-5 mt-10"
        >
          <h2 className="font-mono">{loading ? "Processing " : "Signup   "}</h2>
          <br></br>
          <label htmlFor="username"> </label>
          Username{" "}
          <input
            className="p-2 border border-gray-700 focus:border-blue-500
            rounded-xl m-2"
            id="username "
            type="text"
            value={user.username}
            onChange={(e) => setuser({ ...user, username: e.target.value })}
            placeholder="Username "
          ></input>
          <label htmlFor="email"> </label>
          Email{" "}
          <input
            className="p-2 border border-gray-700 focus:border-blue-500
            rounded-xl m-2"
            id="email "
            type="text"
            value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
            placeholder="Email "
          ></input>
          <label htmlFor="password"> </label>
          Password{" "}
          <input
            className="p-2 border border-gray-700 focus:border-blue-500
            rounded-xl m-2"
            id="password "
            type="password"
            value={user.password}
            onChange={(e) => setuser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <p>
            <button
              className="pl-3.5 mt-3 cursor-pointer  font-mono align-middle pr-2.5 focus:border-blue-500 hover:scale-102  rounded-lg outline-3 border-2 border-gray-600 "
              onClick={onSignup}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "Fill all fields" : "Signup"}
            </button>{" "}
          </p>
          <Link
            className="mt-3 cursor-pointer font-mono underline underline-offset-1"
            href="/login"
          >
            {" "}
            Login Here
          </Link>
        </div>
      </main>
    </React.Fragment>
  );
}
