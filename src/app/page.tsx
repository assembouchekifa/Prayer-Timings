"use client";

import Card from "@/components/Card";
import Timingpreay from "@/components/Timingpreay";
import { useEffect, useReducer, useState } from "react";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import { v4 } from "uuid";

function Home() {
  let salatarr = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  let locati: {
    latitude: number;
    longitude: number;
  };
  const [log, setLog] = useState<boolean>(false);
  const [city, setCity] = useState<{
    countryName: string;
    city: string;
  }>();
  const [dat, setDat] = useState<any>();

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
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${locati?.latitude}&longitude=${locati?.longitude}&localityLanguage=en`,
      { cache: "no-store" }
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
    gettimepray();
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

  async function gettimepray() {
    const data = await fetch(
      `https://api.aladhan.com/v1/calendar/${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }?latitude=${locati.latitude}&longitude=${locati.longitude}&method=2`,
      { cache: "no-store" }
    )
      .then((data) => {
        return data.json();
      })
      .catch(() => {
        console.error("something wrong");
      });
    setDat(data);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center sm:p-24 p-2 md:p-32 text-3xl">
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
        {dat ? (
          <Timingpreay cal={dat?.data[new Date().getDate() - 1].timings} />
        ) : null}
        <div className="text-end text-xl pe-2">
          {" "}
          {dat?.data[new Date().getDate() - 1].date.gregorian.date}{" "}
        </div>
        <div className="text-end text-xl pe-2">
          {" "}
          {dat?.data[new Date().getDate() - 1].date.hijri.date}{" "}
        </div>
        {dat
          ? salatarr.map((e: any, i: number) => {
              if (i == salatarr.length - 1) {
                return (
                  <Card
                    key={v4()}
                    salat={e}
                    time={dat?.data[new Date().getDate() - 1].timings[e].slice(
                      0,
                      -5
                    )}
                    border={false}
                  />
                );
              }
              return (
                <Card
                  key={v4()}
                  salat={e}
                  time={dat?.data[new Date().getDate() - 1].timings[e].slice(
                    0,
                    -5
                  )}
                  border={true}
                />
              );
            })
          : null}
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

//
