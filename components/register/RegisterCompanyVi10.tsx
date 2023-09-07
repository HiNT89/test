import React from "react";
import { Heading, Extract } from "@/components/common";
import Image from "next/image";
import Logo from "../common/Logo";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
const RegisterCompanyVi10 = () => {
  const router = useRouter();
  const { t } = useTranslation("rcv10");
  const handelSubmit = () => {
    router.push("/profile");
  };
  return (
    <div className="pb-5 px-4 max-w-[1280px] md:mx-auto">
      <Logo />
      <div style={{ paddingTop: "50px" }}>
        <div className="flex justify-center">
          <Image src="/vi10.png" alt="" width={95} height={145} />
        </div>
        <div className="text-center py-8">
          <Heading>{t("heading")}</Heading>
          <Extract>{t("extract")}</Extract>
        </div>
      </div>
      <div>
        <div className="">
          <button
            className="block border border-gray-[#E3E3E3] p-4 rounded-[20px] w-full text-base mb-3 text-[#333]"
            onClick={handelSubmit}
          >
            {t("btn1")}
          </button>
          <button
            className="block border border-[#0d8dc8] p-4 rounded-custom w-full text-base text-white"
            style={{ backgroundColor: "#0d8dc8" }}
            onClick={() => {
              alert("chức năng đang cập nhật !!");
            }}
          >
            {t("btn2")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterCompanyVi10;
