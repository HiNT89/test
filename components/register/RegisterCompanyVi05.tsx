import React, { useEffect, useContext } from "react";
import { Line, Heading, Extract } from "@/components/common";
import { useTranslation } from "react-i18next";
import Logo from "../common/Logo";
import { useState } from "react";
import ButtonControl from "../common/BtnControl";
import { useRouter } from "next/router";
import { updateData, getDataDocument } from "@/firebase";
import { SimpleCtx } from "../common/auth";
import { Snackbar, Alert } from "@mui/material";
import { DataRegisterItem, STAFFS } from "@/utils/dataRegisters";
const RegisterCompanyVi05 = () => {
  const UserContext = useContext(SimpleCtx);
  const router = useRouter();
  const [staff, setStaff] = useState(STAFFS[0].id);
  const { t } = useTranslation("rcv05");

  const onHandlePrevious = () => {
    router.push("/register/vi01");
  };
  const handelSubmit = async () => {
    const payload = {
      id: UserContext?.value?.uid,
      data: {
        key: "staff",
        value: staff,
      },
    };
    const isSuccess = await updateData(payload);
    isSuccess ? router.push("/register/vi06") : alert("vui long thu lai");
  };

  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      {/* image */}
      <Logo />
      <div className="">
        <Heading>{t("heading")}</Heading>
        <Line percentage={44}></Line>
        <Extract>{t("extract")}</Extract>
      </div>
      <div>
        <div className="drop-down" style={{ minHeight: "325px" }}>
          <select
            id="quantity"
            value={staff}
            onChange={(e) => setStaff(e.target.value)}
            className="w-full p-4 min-h-[40px] rounded-custom text-base border border-custom-color-bg outline-none bg-white font-semibold "
          >
            {STAFFS.map((it: DataRegisterItem) => (
              <option
                key={it?.id}
                value={it?.id}
                className="text-center mb-1 h-12 w-full bg-white"
              >
                {it?.value}
              </option>
            ))}
          </select>
        </div>
        <ButtonControl
          handelSubmit={handelSubmit}
          onHandlePrevious={onHandlePrevious}
          t={t}
        />
      </div>
    </div>
  );
};

export default RegisterCompanyVi05;
