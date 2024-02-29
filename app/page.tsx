import Image from "next/image";
import { IoSearchOutline } from "react-icons/io5";
import { CiGlobe } from "react-icons/ci";
import Input from "./component/Input";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-column ml-9 mt-5">
      {/* NAVBAR */}
      <div className="flex">
        <Link href="/" className="font-bold text-lg">
          WeatherVista
        </Link>
        <div className="flex bg-gray-100 rounded-lg w-44 h-10 ml-8 -mt-1 mr-96">
          <IoSearchOutline className="mt-2.5 ml-2" size={20} />
          <p className="ml-4 mt-2">Search</p>
        </div>
        <Link
          href="/"
          className="rounded-full w-24 h-9 bg-blue-500 hover:bg-blue-600 ml-96"
        >
          <p className="text-center align-middle text-white mt-1.5">Maps</p>
        </Link>
        <Link
          href="/"
          className="rounded-full w-24 h-9 bg-gray-200 hover:bg-gray-300 ml-5"
        >
          <p className="text-center mt-1.5 font-semibold">Satellite</p>
        </Link>
        <Link
          href="/"
          className="rounded-full w-10 h-9 bg-gray-200 hover:bg-gray-300 ml-5"
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

      <div className="mt-16 relative">
        <Image
          className="mt-15 ml-64 rounded-3xl object-contain"
          alt="Loading..."
          src="/scene.jpg"
          width={900}
          height={100}
        />
        <div className="absolute bottom-32 ml-72">
          <p className="font-semibold text-5xl text-white">
            Explore the world's weather
          </p>
        </div>
        <div className="absolute bottom-24 ml-72">
          <p className="font-thin text-lg text-white ml-1">
            Search for city, country to get the local weather forecast.
          </p>
        </div>
        {/* INPUT COMPONENT */}
        <div className="absolute bottom-12 ml-72">
          <Input />
        </div>
      </div>
    </div>
  );
}
