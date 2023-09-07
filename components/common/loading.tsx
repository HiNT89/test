import * as React from "react";

export function Loading() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="loading-box">
        <div className="one"></div>
        <div className="two"></div>
        <div className="three"></div>
        <div className="four"></div>
        <div className="five"></div>
      </div>
    </div>
  );
}
