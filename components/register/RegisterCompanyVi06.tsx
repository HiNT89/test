import React, { useContext, useEffect, useState } from "react";
import { Line, Heading, Extract } from "@/components/common";
import { useTranslation } from "react-i18next";
import Logo from "../common/Logo";
import ButtonControl from "../common/BtnControl";
import { useRouter } from "next/router";
import { getDataDocument, updateData } from "@/firebase";
import { SimpleCtx } from "../common/auth";
import { CHARTER_CAPITALS, DataRegisterItem } from "@/utils/dataRegisters";
const RegisterCompanyVi06 = () => {
  const router = useRouter();
  const UserContext = useContext(SimpleCtx);
  const { t } = useTranslation("rcv06");
  const [charterCapital, setCharterCapitals] = useState("");
  const [listCharterCapital, setListCharterCapitals] = useState([]);
  useEffect(() => {
    getDataDocument("charterCapitals").then((data) => {
      setCharterCapitals(data[0]?.id);
      setListCharterCapitals(data);
    });
  }, []);
  const onHandlePrevious = () => {
    router.push("/register/vi05");
  };
  const handelSubmit = async () => {
    const payload = {
      id: UserContext?.value?.uid,

      data: {
        key: "charterCapital",
        value: charterCapital,
      },
    };
    const isSuccess = await updateData(payload);

    isSuccess ? router.push("/register/vi07") : alert("vui long thu lai");
  };
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      {/* image */}
      <Logo />
      <div className="">
        <Heading>{t("heading")}</Heading>
        <Line percentage={55}></Line>
        <Extract>{t("extract")}</Extract>
      </div>
      <div>
        <div className="drop-down" style={{ minHeight: "325px" }}>
          <select
            id="quantity"
            value={charterCapital}
            onChange={(e) => setCharterCapitals(e.target.value)}
            className="w-full p-4 rounded-custom  text-base border border-custom-color-bg outline-none bg-white font-semibold capitalize"
          >
            {CHARTER_CAPITALS.map((it: DataRegisterItem) => (
              <option
                key={it?.id}
                value={it?.id}
                className="text-center mb-1 h-6 "
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

export default RegisterCompanyVi06;
