"use client";
import Link from "next/link";
import React, { useState } from "react";

const Input = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  return (
    <form className="flex-col mt-5">
      <input
        className="bg-gray-100 rounded-lg h-9 w-24 mr-3"
        placeholder="Enter City"
        value={city}
        type="text"
        onChange={(text) => setCity(text.target.value)}
      />
      <input
        className="bg-gray-100 rounded-lg w-32 h-9 placeholder"
        placeholder="Enter Country"
        value={country}
        type="text"
        onChange={(text) => setCountry(text.target.value)}
      />
      <Link className="ml-5 btn-primary"
        href={{
          pathname: "/weatherinfo",
          query: { city: city ? city : "Delhi", country: country ? country : "India" },
        }}
      >
        Search
      </Link>
    </form>
  );
};

export default Input;
