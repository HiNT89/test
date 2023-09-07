import React, { useContext, useState } from "react";
import { Line, Heading, Extract } from "@/components/common";
import Logo from "../common/Logo";
import ButtonControl from "../common/BtnControl";
import { useRouter } from "next/router";
import { updateData } from "@/firebase";
import { Snackbar, Alert } from "@mui/material";

import { SimpleCtx } from "../common/auth";
import { useTranslation } from "react-i18next";
const RegisterCompanyVi11 = () => {
  const UserContext = useContext(SimpleCtx);
  const { t } = useTranslation("rcv11");
  const [toast, setToast] = useState({
    open: false,
    content: "",
  });
  const router = useRouter();
  const [dataInput, setDataInput] = useState({
    website: "",
    email: "",
    phoneNumber: "",
  });
  const conditionBtn = () => {
    const values = Object.values(dataInput);
    return values.some((it) => !it);
  };
  const onHandlePrevious = () => {
    router.push("/register/vi09");
  };
  const handelSubmit = async () => {
    const { email, phoneNumber, website } = dataInput;
    const regexPhoneNumber = /(84|0[3|5|7|8|9]|34)+([0-9]{8})\b/g;
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const regexWebsite =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    const validatePhone = phoneNumber.match(regexPhoneNumber) ? true : false;
    const validateEmail = email.match(regexEmail) ? true : false;
    const validateWeb = website.match(regexWebsite) ? true : false;
    const vadidate = validatePhone && validateEmail && validateWeb;
    if (!vadidate) {
      setToast({
        open: true,
        content: "có lỗi , vui lòng nhập đúng dữ liệu",
      });
      return;
    }
    if (validatePhone && validateEmail && validateWeb) {
      const payload = {
        id: UserContext?.value?.uid,

        data: {
          key: "information",
          value: {
            gmail: dataInput.email,
            facebook: "",
            line: "",
            phoneNumber: [dataInput.phoneNumber],
            website: dataInput.website,
            zalo: "",
            email: "",
          },
        },
      };
      const isSuccess = await updateData(payload);
      isSuccess ? router.push("/register/vi10") : alert("vui long thu lai");
    } else {
      alert("vui long nhap lai");
    }
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataInput({
      ...dataInput,
      [name]: value,
    });
  };
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      {/* image */}
      <Logo></Logo>
      <div className="">
        <Heading>{t("heading")}</Heading>
        <Line percentage={100}></Line>
        <Extract>{t("extract")}</Extract>
      </div>
      <form action="" style={{ height: "325px" }}>
        <div className="">
          <input
            type="text"
            className="outline-none bg-[#FFF] rounded-md mb-4 w-full text-[#BAC1CC] my-4 text-custom-fontsize px-3 py-2"
            placeholder="Website Công ty/Xí nghiệp"
            style={{ border: "1px solid #E4E4E4" }}
            value={dataInput.website}
            name="website"
            onChange={(e) => onChangeInput(e)}
          />
          <input
            type="text"
            className="outline-none bg-[#FFF] rounded-md mb-4 w-full text-[#BAC1CC] my-4 text-custom-fontsize px-3 py-2"
            placeholder="Email"
            style={{ border: "1px solid #E4E4E4" }}
            value={dataInput.email}
            name="email"
            onChange={(e) => onChangeInput(e)}
          />
          <input
            type="text"
            className="outline-none bg-[#FFF] rounded-md mb-4 w-full text-[#BAC1CC] my-4 text-custom-fontsize px-3 py-2"
            placeholder="Số điện thoại liên hệ"
            style={{ border: "1px solid #E4E4E4" }}
            value={dataInput.phoneNumber}
            name="phoneNumber"
            onChange={(e) => onChangeInput(e)}
          />
        </div>
      </form>
      <ButtonControl
        handelSubmit={handelSubmit}
        onHandlePrevious={onHandlePrevious}
        // isStatus={conditionBtn()}
        t={t}
      />
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

export default RegisterCompanyVi11;
