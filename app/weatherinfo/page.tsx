"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { IoSearchOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import Image from "next/image";

interface WeatherData {
  coord: {
      lon: number;
      lat: number;
  };
  weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
  }[];
  base: string;
  main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
  };
  visibility: number;
  wind: {
      speed: number;
      deg: number;
      gust: number;
  };
  rain: {
      "1h": number;
  };
  clouds: {
      all: number;
  };
  dt: number;
  sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const weatherinfo = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const searchParams = useSearchParams();
  const city = searchParams.get("city");
  const country = searchParams.get("country");

  console.log(process.env.NEXT_PUBLIC_APIKEY);

  const weatherData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${process.env.NEXT_PUBLIC_APIKEY}`
      ).then((res) => res.json());
      if (response.cod === 200) {
        setData(response);
      }
      else {
        setData(null);
      }
    } catch (error) {
      console.log("Error retrieving data", error);
    }
  };

  console.log(data);

  useEffect(() => {
    weatherData();
  }, []);

  const date = new Date().toDateString();

  return (
    data && (
      <div className="flex-col mt-4 ml-7">
        {/* NAVBAR */}
        <div className="flex justify-between">
          <Link className="font-bold text-lg mt-1" href="/">
            WeatherVista
          </Link>

          <div className="flex mr-12">
            <div className="flex bg-gray-100 rounded-lg w-44 h-10 -mt-0.5 mr-7">
              <IoSearchOutline className="mt-2.5 ml-2" size={20} />
              <p className="ml-4 mt-2">Search</p>
            </div>

            <Link
              href="/"
              className="rounded-full w-10 h-9 bg-gray-200 hover:bg-gray-300 mr-3"
            >
              <CiGlobe size={24} className="ml-2 mt-1.5" />
            </Link>

            <Link href="/">
              <Image
                className="ml-5 -mt-2"
                src="/avatar.jpg"
                width={50}
                height={50}
                alt="No"
              />
            </Link>
          </div>
        </div>

        <hr className="mt-3 -ml-7"></hr>

        <div className="py-12 px-72">
          <p className="font-bold text-5xl">
            {city}, {country}
          </p>
          <p className="mt-5 ml-2 text-lg text-gray-500 font-light">
            {date.slice(0, 3) + "," + date.slice(3)}
          </p>

          {/* IMAGE COMPONENT */}
          <div className="mt-10 relative">
            <Image
              className="mt-15 rounded-3xl object-contain"
              alt="Loading..."
              src="/weatherdisplay.jpg"
              width={900}
              height={100}
            />
            <div className="absolute bottom-28 ml-10">
              {data && (
                <p className="font-semibold text-5xl text-white">
                  {data.main.temp} K
                </p>
              )}
            </div>
            <div className="absolute bottom-20 ml-10">
              {data && (
                <p className="font-extralight text-lg text-white ml-1">
                  {data?.weather[0].description} with a high of{" "}
                  {data?.main.temp_max} K and a low of {data.main.temp_min} K
                </p>
              )}
            </div>
            {data && (
              <div className="absolute font-extralight bottom-12 ml-11 text-white">
                {data.weather[0].main}
              </div>
            )}
          </div>

          {/* DETAILS */}
          <p className="mt-10 font-bold text-2xl ml-1">Details</p>
          <div className="flex mt-9 justify-between">
            <p className="ml-2 text-gray-500">Sunrise (UNIX, UTC)</p>
            {data && <p className="mr-5 text-gray-800">{data.sys.sunrise}</p>}
          </div>

          <div className="flex mt-5 justify-between">
            <p className="ml-2 text-gray-500">Sunset (UNIX, UTC)</p>
            {data && <p className="mr-5 text-gray-800">{data.sys.sunset}</p>}
          </div>

          <div className="flex mt-5 justify-between">
            <p className="ml-2 text-gray-500">Pressure</p>
            {data && (
              <p className="mr-5 text-gray-800">{data.main.pressure}hPa</p>
            )}
          </div>

          <div className="flex mt-5 justify-between">
            <p className="ml-2 text-gray-500">Humidity</p>
            {data && (
              <p className="mr-5 text-gray-800">{data.main.humidity}%</p>
            )}
          </div>

          <div className="flex mt-5 justify-between">
            <p className="ml-2 text-gray-500">Wind Speed</p>
            {data && (
              <p className="mr-5 text-gray-800">{data.wind.speed}m/sec</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default weatherinfo;
