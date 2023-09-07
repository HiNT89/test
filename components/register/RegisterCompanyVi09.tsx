import React, { useContext, useState } from "react";
import { Line, Heading, Extract } from "@/components/common";
import Link from "next/link";
import Logo from "../common/Logo";
import { useRouter } from "next/router";
import ButtonControl from "../common/BtnControl";
import { SimpleCtx } from "../common/auth";
import { updateData } from "@/firebase";
import { useTranslation } from "react-i18next";
import { Snackbar, Alert } from "@mui/material";

const RegisterCompanyVi09 = () => {
  const router = useRouter();
  const UserContext = useContext(SimpleCtx);
  const [dateContact, setDateContact] = useState("");
  const [toast, setToast] = useState({
    open: false,
    content: "",
  });
  const { t } = useTranslation("rcv09");
  const onHandlePrevious = () => {
    router.push("/register/vi08");
  };

  const handelSubmit = async () => {
    if (!dateContact) {
      setToast({
        open: true,
        content: "có lỗi , vui lòng chọn dữ liệu",
      });
      return;
    }
    const payload = {
      id: UserContext?.value?.uid,
      data: {
        key: "dateContact",
        value: dateContact,
      },
    };
    const isSuccess = await updateData(payload);
    if (isSuccess) {
      router.push("/register/vi11");
    }
  };
  console.log(dateContact);
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      {/* image */}
      <Logo></Logo>
      <div className="">
        <div className="flex items-end justify-between">
          <Heading>{t("heading")}</Heading>
          <Link
            href={"/register/vi11"}
            className="text-custom-fontsize text-[#9B999A]"
          >
            {t("skip")}
          </Link>
        </div>
        <Line percentage={88}></Line>
        <Extract>{t("extract")}</Extract>
      </div>
      <form action="" style={{ height: "325px" }}>
        <div className="flex items-center justify-between border gap-2 border-[#E4E4E4] px-3 rounded-md mb-4 text-custom-fontsize text-[#BAC1CC]">
          <input
            value={dateContact}
            onChange={(e) => setDateContact(e.target.value)}
            type="date"
            className="outline-none border-none w-full px-3 py-2"
            placeholder="Thời gian"
          />
          {/* <Date></Date> */}
        </div>
      </form>
      <ButtonControl
        handelSubmit={handelSubmit}
        onHandlePrevious={onHandlePrevious}
        isStatus={!dateContact}
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

export default RegisterCompanyVi09;
