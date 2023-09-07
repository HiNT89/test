"use client";
import Logo from "@/components/common/Logo";

import { auth, handleSendCode, loginGoogle, logout } from "@/firebase/index";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { SimpleCtx } from "@/components/common/auth";
import { useTranslation } from "react-i18next";
const Register = () => {
  const router = useRouter();
  const userContext = useContext(SimpleCtx);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { t } = useTranslation("r");
  // const [user, setUser] = useState<any>();
  const [prefix, setPrefix] = useState("+84");
  const handleLogin = (value: string) => {
    // signIn(value);
    loginGoogle().then((data) => {
      userContext?.setValue(data);
      router.push("/register/vi01");
    });
  };

  const onClickSendCode = async () => {
    const isSuccess = await handleSendCode(`${prefix}${phoneNumber}`);
    if (isSuccess) {
      router.push("/register/vertical");
    } else {
      alert("send OTP false");
      setTimeout(() => {
        router.push("/register");
      }, 3000);
    }
    setPhoneNumber("");
  };
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      <Logo />
      <div className="px-2">
        <label htmlFor="" className="font-bold pb-2 block text-[14px]">
          {t("label")}
        </label>
        <div className="flex item-center justify-center">
          <select
            id="countries"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="bg-[#F1F1F5] rounded-l-md outline-none border border-[#F1F1F5] text-center"
          >
            <option value="+84">+84</option>
            <option value="+34">+34</option>
          </select>
          <input
            type="number"
            min={0}
            className="border border-blue-200 outline-none w-full py-2 px-2 rounded-r-md"
            placeholder={t("placeholder")}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <p className="text-[10px] text-gray-400 pt-1 pb-4">{t("validator")}</p>
        <button
          className="bg-[#6dc8ea] text-white font-bold w-full py-2 rounded-md mb-3 uppercase"
          onClick={onClickSendCode}
        >
          {t("otp")}
        </button>
        <div className="flex items-center pt-3">
          <span className="flex-grow bg-[#E5E5E5] h-[1px] border-t-[1px] border-[#E5E5E5]"></span>
          <span className="text-center font-bold text-[12px] px-4">
            {t("or")}
          </span>
          <span className="flex-grow bg-[#E5E5E5] h-[1px] border-t-[1px] border-[#E5E5E5]"></span>
        </div>

        <div className="login-account">
          <button
            className="bg-red-600 w-full text-white py-2 rounded-md flex items-center px-3 my-3 gap-4"
            onClick={() => handleLogin("GoogleProvider")}
          >
            <i className="fa-brands fa-google"></i>
            <span className="flex-grow text-center">
              {t("google")} <strong>Google</strong>
            </span>
          </button>
          <button
            className="bg-blue-600 w-full text-white py-2 rounded-md flex items-center px-3 my-3 gap-4"
            onClick={() => handleLogin("FacebookProvider")}
          >
            <i className="fa-brands fa-facebook"></i>
            <span className="flex-grow text-center">
              {t("facebook")} <strong>Facebook</strong>
            </span>
          </button>
        </div>
      </div>
      <div id="recaptcha-container" className="w-4/5"></div>
    </div>
  );
};

export default Register;
