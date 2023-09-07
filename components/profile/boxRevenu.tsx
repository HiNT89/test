import { IconPlusBig } from "@/assets/icon";
import * as React from "react";

export interface BoxRevenueProps {
  isEdit: boolean;
  title: string;
  listItem: {
    year: number;
    value: number;
  }[];
  toggleModal: (value: boolean) => void;
  handleRemoveRevenue: (year: number) => void;
}

export function BoxRevenue({
  title,
  listItem,
  isEdit,
  toggleModal,
  handleRemoveRevenue,
}: BoxRevenueProps) {
  return (
    <div className="px-4">
      <h4 className="pt-2 capitalize mb-2 font-medium">{title}</h4>
      <div className="flex flex-col">
        {listItem.map((it: { year: number; value: number }) => (
          <div
            key={it.year}
            className="text-left flex border rounded-md py-2 px-4 mb-2"
          >
            <div className="flex-grow">
              <span className="text-custom-color text-[11px] font-normal">
                {it.year}
              </span>
              <p className="text-custom-fontsize-17 font-semibold">
                {it.value} triệu Yên
              </p>
            </div>
            {isEdit ? (
              <button
                className="text-custom-fontsize-17 text-custom-color font-normal"
                onClick={() => handleRemoveRevenue(+it.year)}
              >
                Xóa
              </button>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      {isEdit ? (
        <div className="flex items-center justify-center border border-[#F1F1F5] rounded-custom-radius-10 px-4 py-5">
          <button onClick={() => toggleModal(true)}>
            <IconPlusBig />
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
