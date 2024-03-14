"use client";

import Card from "@/components/Card";
import { useEffect } from "react";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

function Home() {
  function hundelclic() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        position.coords.latitude + " and " + position.coords.longitude
      );
    }),
      () => {
        console.log("use manual");
      };
  }

  useEffect(() => {
    let a = setInterval(() => {
      let date = new Date();
      console.log(date.getSeconds());
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-24 p-12 md:p-32 ">
      <div
        style={{ backgroundColor: "#fafafa99" }}
        className="w-full  pt-1 rounded-md"
      >
        <h1 style={{ letterSpacing: "0.5px" }} className=" font-bold mb-1 ">
          Prayer Timings
        </h1>
        <div>Location :{/* {contry} {city}*/}</div>

        <div className="w-full flex items-center justify-center px-4 py-1 mb-1 ">
          <span className="font-bold me-1">{"fajre"}</span> prayer :{" "}
          <span className="font-bold">{"-02:30"}</span>{" "}
        </div>
        <div className="text-end text-sm pe-2">2024/78/95</div>
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={false} />
        <button
          className="text-xs flex items-center  my-2 justify-center"
          onClick={hundelclic}
        >
          Select location automatically
          <FaMagnifyingGlassLocation className="ms-1" />
        </button>
      </div>
    </main>
  );
}

export default Home;

// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=XXXXXXXXXXXX&longitude=XXXXXXXXXXXX&localityLanguage=en
// https://api.aladhan.com/v1/calendar/2024/3?latitude=35.6941824&longitude=-0.6782976&method=2
// https://api.aladhan.com/v1/calendarByCity/2024/3?city=Oran&country=DZ&method=2
