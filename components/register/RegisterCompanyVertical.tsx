import React, { useState, useEffect, useContext } from "react";
import Logo from "../common/Logo";
import { handleVerificationCode } from "@/firebase";
import { useRouter } from "next/router";
import { SimpleCtx } from "../common/auth";
import { useTranslation } from "react-i18next";
import { Snackbar, Alert } from "@mui/material";

const RegisterCompanyVertical = () => {
  const { t } = useTranslation("rcv");
  const userContext = useContext(SimpleCtx);
  const router = useRouter();
  const [remainingTime, setRemainingTime] = useState(900);
  const [toast, setToast] = useState({
    open: false,
    content: "",
  });
  const [verificationCode, setVerificationCode] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
    fifth: "",
    sixth: "",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVerificationCode({ ...verificationCode, [name]: value });
  };
  const handleLogin = async () => {
    const code = Object.values(verificationCode).join("");
    if (!code) {
      setToast({
        open: true,
        content: "vui lòng nhập otp",
      });
      return;
    }
    const user = await handleVerificationCode(code);
    if (user) {
      userContext?.setValue(user);
      router.push("/register/vi01");
    } else {
      setToast({
        open: true,
        content: "đăng nhập thất bại",
      });
      setTimeout(() => {
        router.push("/register");
      }, 3000);
    }
  };
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      <Logo />
      <div className="px-2">
        <label htmlFor="" className="font-bold block text-[14px] pb-2">
          {t("label")}
        </label>
        <div
          id="otp"
          className="flex p-2 flex-row justify-between text-center border border-[#E5E5E5] rounded-md"
        >
          <input
            className="border h-9 w-9 text-center form-control border-b-2 border-[#E5E5E5] rounded-md"
            type="number"
            name="first"
            value={verificationCode.first}
            onChange={(e) => onChangeInput(e)}
          />
          <input
            className="border h-9 w-9 text-center form-control border-b-2 border-[#E5E5E5] rounded-md"
            type="number"
            name="second"
            value={verificationCode.second}
            onChange={(e) => onChangeInput(e)}
          />
          <input
            className="border h-9 w-9 text-center form-control border-b-2 border-[#E5E5E5] rounded-md"
            type="number"
            name="third"
            value={verificationCode.third}
            onChange={(e) => onChangeInput(e)}
          />
          <input
            className="border h-9 w-9 text-center form-control border-b-2 border-[#E5E5E5] rounded-md"
            type="number"
            name="fourth"
            value={verificationCode.fourth}
            onChange={(e) => onChangeInput(e)}
          />
          <input
            className="border h-9 w-9 text-center form-control border-b-2 border-[#E5E5E5] rounded-md"
            type="number"
            name="fifth"
            value={verificationCode.fifth}
            onChange={(e) => onChangeInput(e)}
          />
          <input
            className="border h-9 w-9 text-center form-control border-b-2 border-[#E5E5E5] rounded-md"
            type="number"
            name="sixth"
            value={verificationCode.sixth}
            onChange={(e) => onChangeInput(e)}
          />
        </div>
        <p className="text-[10px] text-gray-400 pt-1 pb-4">
          {t("validator")}{" "}
          <span className="text-red-600">
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>
        <button
          className="bg-custom-color text-white font-bold w-full py-2 rounded-md mb-3"
          onClick={handleLogin}
        >
          {t("accuracy")}
        </button>
        <div className="flex items-center pt-3">
          <span className="flex-grow bg-[#E5E5E5] h-[1px] border-t-[1px] border-[#E5E5E5]"></span>
          <span className="text-center font-bold text-[12px] px-4">
            {t("or")}
          </span>
          <span className="flex-grow bg-[#E5E5E5] h-[1px] border-t-[1px] border-[#E5E5E5]"></span>
        </div>

        <div className="login-account">
          <button className="bg-red-600 w-full text-white py-2 rounded-md flex items-center px-3 my-3 gap-4">
            <i className="fa-brands fa-google"></i>
            <span className="flex-grow text-center">{t("google")}</span>
          </button>
          <button className="bg-blue-600 w-full text-white py-2 rounded-md flex items-center px-3 my-3 gap-4">
            <i className="fa-brands fa-facebook"></i>
            <span className="flex-grow text-center">{t("facebook")}</span>
          </button>
        </div>
      </div>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity="error"
          sx={{ width: "100%", textTransform: "capitalize" }}
        >
          {toast.content}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterCompanyVertical;
