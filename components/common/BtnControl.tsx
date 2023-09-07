import * as React from "react";
export interface ButtonControlProps {
  onHandlePrevious: () => void;
  handelSubmit: () => void;
  isStatus?: boolean;
  t?: any;
}
export default function ButtonControl({
  onHandlePrevious,
  handelSubmit,
  isStatus,
  t,
}: ButtonControlProps) {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={onHandlePrevious}
        type="button"
        className="block border border-gray-[#E3E3E3] px-4 rounded-custom w-full text-base h-[45px]"
      >
        {t("btn1")}
      </button>
      <button
        onClick={handelSubmit}
        type="submit"
        className={`block border ${
          isStatus ? "border-[#ccc]" : "border-[#0d8dc8]"
        }  px-4 rounded-custom w-full text-base text-white h-[45px]`}
        style={{ backgroundColor: isStatus ? "#ccc" : "#0d8dc8" }}
        // disabled={isStatus}
      >
        {t("btn2")}
      </button>
    </div>
  );
}
