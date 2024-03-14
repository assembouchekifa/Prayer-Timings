/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";

function Timingpreay({ cal }: any) {
  let salatarr = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

  const [time, setTime] = useState<string>();
  const [preay, setPreay] = useState<string>();

  function getPreayTame(date: any) {
    for (let i = 0; i < salatarr.length; i++) {
      if (date - gettimeAdan(salatarr[i]) < 0) {
        setTime(
          `- ${
            new Date(-(date - gettimeAdan(salatarr[i]))).getHours() - 1
          }:${new Date(
            -(date - gettimeAdan(salatarr[i]))
          ).getMinutes()}:${new Date(
            -(date - gettimeAdan(salatarr[i]))
          ).getSeconds()}`
        );
        setPreay(salatarr[i]);
        return;
      }
    }
    if (date - (gettimeAdan(salatarr[0]) + 86400000) < 0) {
      setPreay(salatarr[0]);
      setTime(
        `- ${
          new Date(-(date - (gettimeAdan(salatarr[0]) + 86400000))).getHours() -
          1
        }:${new Date(
          -(date - (gettimeAdan(salatarr[0]) + 86400000))
        ).getMinutes()}:${new Date(
          -(date - (gettimeAdan(salatarr[0]) + 86400000))
        ).getSeconds()}`
      );
    }
  }

  function gettimeAdan(salat: string) {
    let timeString: string = cal[salat].slice(0, -5);
    let houMin = timeString.split(":").map((e) => {
      return parseInt(e);
    });
    return new Date().setHours(houMin[0], houMin[1], 0, 0);
  }

  useEffect(() => {
    let a = setInterval(() => {
      let date = new Date();
      getPreayTame(date);
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, [cal]);
  return (
    <div className="w-full flex items-center justify-center px-4 py-1 mb-1 ">
      <span className="font-bold me-1">{preay}</span> prayer :{" "}
      <span className="font-bold">{time}</span>{" "}
    </div>
  );
}

export default Timingpreay;
