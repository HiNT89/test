import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
export interface IExtractProps {
  children: ReactElement | string;
  a?: boolean;
}
export const Extract = ({ children, a }: IExtractProps) => {
  const { t } = useTranslation("fom");
  const text = `${t("findout")}`;
  return (
    <p
      style={{ height: "103px", color: "#9B999A" }}
      className="text-custom-fontsize"
    >
      {children}
      {a ? <a className="text-[#0D8DC8]"> {text}</a> : ""}
    </p>
  );
};
