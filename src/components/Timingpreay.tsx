"use client";

import { useEffect, useState } from "react";

function Timingpreay({ cal }: any) {
  const [time, setTime] = useState<number>();

  useEffect(() => {
    let a = setInterval(() => {
      let date = new Date();
      setTime(date.getTime());
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, []);
  return (
    <div className="w-full flex items-center justify-center px-4 py-1 mb-1 ">
      <span className="font-bold me-1">{"fajre"}</span> prayer :{" "}
      <span className="font-bold">{"-02:30"}</span>{" "}
    </div>
  );
}

export default Timingpreay;
