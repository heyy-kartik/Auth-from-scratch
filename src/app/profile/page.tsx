import React from "react";
import User from "@/model/userModel";
import connectToDatabase from "@/dbConfig/dbconfig";

const page = () => {
  return (
    <div className=" align-middle items-center mt-5 ml-10 p-3">
      <h2 className="text-2xl font-mono ">This is this Login page </h2>
      <h2 className="text-lg font-mono ">User : </h2>
      <h2 className="text-lg font-mono ">Email : </h2>
    </div>
  );
};

export default page;
