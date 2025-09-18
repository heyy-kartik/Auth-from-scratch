import React from "react";
import User from "@/model/userModel";
import connectToDatabase from "@/dbConfig/dbconfig";

const page = () => {
  return (
    <div>
      <h2 className="text-2xl font-mono ">This is this Login page </h2>
      <h2 className="text-2xl font-mono ">User : </h2>
      <h2 className="text-2xl font-mono ">Email : </h2>
    </div>
  );
};

export default page;
