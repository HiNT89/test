import React, { useState } from "react";
interface IheadingProps {
  children: string;
}
export const Heading = ({ children }: IheadingProps) => {
  return (
    <h2 className="text-custom-color uppercase font-semibold text-custom-fontsize-27">
      {children}
    </h2>
  );
};
