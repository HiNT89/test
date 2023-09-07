import React, { useContext, useState } from "react";
import { Line, Heading, Extract } from "@/components/common";
import Link from "next/link";
import Logo from "../common/Logo";
import Plus from "@/assets/icon/Plus";
import Date from "@/assets/icon/Date";
import { useRouter } from "next/router";
import ButtonControl from "../common/BtnControl";
import listYearOption from "@/utils/listYearOption";
import { updateData } from "@/firebase";
import { SimpleCtx } from "../common/auth";
import { useTranslation } from "react-i18next";
import { Snackbar, Alert } from "@mui/material";

interface RevenueType {
  value: number;
  year: number;
}
const RegisterCompanyVi07 = () => {
  const UserContext = useContext(SimpleCtx);
  const { t } = useTranslation("rcv07");
  const [toast, setToast] = useState({
    open: false,
    content: "",
    type: false,
  });
  const router = useRouter();
  const [revenues, setRevenues] = useState<Array<RevenueType>>([]);
  const listYear = listYearOption();
  const year = listYear[listYear.length - 1];
  const [dataInput, setDataInput] = useState({
    year,
    value: 0,
  });
  const onHandlePrevious = () => {
    router.push("/register/vi06");
  };
  const handelSubmit = async () => {
    if (!revenues.length) {
      setToast({
        type: false,
        open: true,
        content: "có lỗi , vui lòng nhập dữ liệu hoặc bỏ qua",
      });
      return;
    }
    const payload = {
      id: UserContext?.value?.uid,
      data: {
        key: "revenues",
        value: revenues,
      },
    };
    const isSuccess = await updateData(payload);
    isSuccess
      ? router.push("/register/vi08")
      : setToast({
          type: false,
          open: true,
          content: "có lỗi , vui lòng thử lại",
        });
  };
  const handleDeleteItem = (year: number) => {
    setRevenues(revenues.filter((x: RevenueType) => x.year !== year));
  };
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      {/* image */}
      <Logo />
      <div className="">
        <div className="flex items-end justify-between">
          <Heading>{t("heading")}</Heading>
          <Link
            href={"/register/vi08"}
            className="text-custom-fontsize text-[#9B999A]"
          >
            {t("skip")}
          </Link>
        </div>
        <Line percentage={66}></Line>
        <Extract>{t("extract")}</Extract>
      </div>
      <div className="flex flex-col gap-2 mb-2">
        {revenues.map((x: RevenueType) => (
          <div className="flex items-center border p-2 rounded-md" key={x.year}>
            <div className="flex-grow">
              <span className="text-custom-color text-[16px] font-normal">
                {x.year}
              </span>
              <p className="text-custom-fontsize-17 font-semibold">
                {x.value} triệu Yên
              </p>
            </div>
            <button
              className="capitalize"
              onClick={() => handleDeleteItem(x.year)}
            >
              xóa
            </button>
          </div>
        ))}
      </div>
      <div style={{ height: "325px" }}>
        <div className="border border-[#E4E4E4] rounded-md p-4">
          <div className="flex items-center justify-between border gap-2 border-[#E4E4E4] bg-[#FFF] px-3 rounded-md mb-4">
            <select
              value={dataInput.year}
              onChange={(e) =>
                setDataInput({ ...dataInput, year: +e.target.value })
              }
              className="flex-grow outline-none border-none px-3 py-2 text-custom-fontsize"
            >
              {listYear.map((it: number) => (
                <option key={it}>{it}</option>
              ))}
            </select>
            <Date></Date>
          </div>
          <div className="flex items-center justify-between border gap-2 border-[#E4E4E4] bg-[#FFF] px-3 rounded-md capitalize">
            <input
              type="number"
              className="outline-none border-none flex-grow px-3 py-2 text-custom-fontsize"
              placeholder="Doanh thu"
              value={dataInput.value}
              onChange={(e) =>
                setDataInput({ ...dataInput, value: +e.target.value })
              }
            />
            <span style={{ color: "#BAC1CC", fontSize: "15px" }}>
              {t("span")}
            </span>
          </div>
        </div>
        <button
          className="flex justify-center gap-2 items-center py-3 px-8 rounded-custom w-full text-base font-normal border border-custom-color mt-4 text-custom-color"
          onClick={() => {
            const condition = revenues
              .map((it) => it.year)
              .includes(dataInput.year);
            if (!condition) {
              setToast({
                type: true,
                open: true,
                content: "thêm dữ liệu thành công",
              });
              setDataInput({
                year,
                value: 0,
              });
              setRevenues([...revenues, dataInput]);
            } else {
              setToast({
                type: false,
                open: true,
                content: "dữ liệu đã tồn tại , vui lòng thử lại",
              });
            }
          }}
        >
          <Plus></Plus>
          <div className="text-custom-color font-medium custom-fontsize-16">
            {t("submit")}
          </div>
        </button>
      </div>
      <ButtonControl
        handelSubmit={handelSubmit}
        onHandlePrevious={onHandlePrevious}
        isStatus={!revenues.length}
        t={t}
      />
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={() => setToast({ ...toast, open: false })}
      >
        <Alert
          onClose={() => setToast({ ...toast, open: false })}
          severity={toast.type ? "success" : "error"}
          sx={{ width: "100%", textTransform: "capitalize" }}
        >
          {toast.content}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegisterCompanyVi07;
