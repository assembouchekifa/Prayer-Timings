"use client";

import Card from "@/components/Card";
import Timingpreay from "@/components/Timingpreay";
import { useEffect, useState } from "react";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { IoMdRemoveCircleOutline } from "react-icons/io";

function Home() {
  let locati: {
    latitude: number;
    longitude: number;
  };
  const [log, setLog] = useState<boolean>(false);
  const [city, setCity] = useState<{
    countryName: string;
    city: string;
  }>();

  function hundelclic() {
    navigator.geolocation.getCurrentPosition((position) => {
      const local = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      localStorage.setItem("local", JSON.stringify(local));
      locati = { latitude: local.latitude, longitude: local.longitude };
      setLog(true);
      getLocation();
    });
  }

  async function getLocation() {
    const data = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${locati?.latitude}&longitude=${locati?.longitude}&localityLanguage=en`
    )
      .then((data) => {
        return data.json();
      })
      .catch((e) => {
        console.error("something wrong");
      });
    if (data.city && data.countryName) {
      setCity({
        city: data.city,
        countryName: data.countryName,
      });
    } else {
      console.error("something wrong");
    }
  }
  useEffect(() => {
    let local = localStorage.getItem("local");
    if (local) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      locati = JSON.parse(local);
      setLog(true);
    } else {
      locati = {
        latitude: 21.42251,
        longitude: 39.826168,
      };
      setLog(false);
    }
    getLocation();
  }, []);

  useEffect(() => {}, [city]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-24 p-12 md:p-32 text-3xl">
      <div
        style={{ backgroundColor: "#fafafa99" }}
        className="w-full  pt-1 rounded-md"
      >
        <h1
          style={{ letterSpacing: "0.5px" }}
          className="ps-2 mb-2 font-bold  "
        >
          Prayer Timings
        </h1>
        <div className="ps-2 mb-2">
          Location :{city?.countryName} {city?.city}
        </div>
        <Timingpreay />
        <div className="text-end text-xl pe-2">2024/78/95</div>
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={true} />
        <Card salat="fajre" time="4:50" border={false} />
        {!log ? (
          <button
            className="text-lg flex items-center w-full text-center my-2 justify-center"
            onClick={hundelclic}
          >
            Select location automatically
            <FaMagnifyingGlassLocation className="ms-1" />
          </button>
        ) : (
          <button
            className="text-lg flex items-center w-full text-center  my-2 justify-center"
            onClick={() => {
              locati = {
                latitude: 21.42251,
                longitude: 39.826168,
              };
              localStorage.clear();
              getLocation();
              setLog(false);
            }}
          >
            Remove location
            <IoMdRemoveCircleOutline className="ms-1" />
          </button>
        )}
      </div>
    </main>
  );
}

export default Home;

// https://api.aladhan.com/v1/calendar/2024/3?latitude=35.6941824&longitude=-0.6782976&method=2
