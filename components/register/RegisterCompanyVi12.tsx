import React, { useState, useEffect, useContext } from "react";
import { Line, Heading, Extract } from "@/components/common";
import Image from "next/image";
import Logo from "../common/Logo";
import { getDataAreas, updateData } from "@/firebase";
import { ResponseAreasItem } from "@/models/api";
import { useRouter } from "next/router";
import ButtonControl from "../common/BtnControl";
import { SimpleCtx } from "../common/auth";
import { useTranslation } from "react-i18next";
import { CODE_COLOR } from "./codeColor";
import { Snackbar, Alert } from "@mui/material";

const RegisterCompanyVi12 = () => {
  const UserContext = useContext(SimpleCtx);
  const [toast, setToast] = useState({
    open: false,
    content: "",
  });
  const router = useRouter();
  const [province, setProvince] = useState<Array<ResponseAreasItem>>([]);
  useEffect(() => {
    getDataAreas()
      .then((data) => setProvince(data))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const { t } = useTranslation("rcv12");
  const handleOptionClick = (option: string) => {
    if (selectedOptions.length >= 1) {
      setToast({
        open: true,
        content: "Bạn chỉ được lựa chọn 1 trường",
      });
    } else {
      setSelectedOptions((prevSelectedOptions) => [
        ...prevSelectedOptions,
        option,
      ]);
    }
  };
  const handleRemoveOption = (option: string) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((selectedOption) => selectedOption !== option),
    );
  };
  const handelSubmit = async () => {
    if (!selectedOptions.length) {
      setToast({
        open: true,
        content: "có lỗi , vui lòng chọn dữ liệu",
      });
      return;
    }
    const payload = {
      id: UserContext?.value?.uid,

      data: {
        key: "area",
        value: selectedOptions[0],
      },
    };
    const isSuccess = await updateData(payload);
    // navigation
    isSuccess ? router.push("/register/vi05") : alert("vui long thu lai");
  };
  const onHandlePrevious = () => {
    // navigation
    router.push("/register/vi01");
  };
  // Trạng thái lưu thông tin mục được chọn
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      {/* image */}
      <Logo></Logo>
      <div className="">
        <Heading>{t("heading")}</Heading>
        <Line percentage={33}></Line>
        <Extract>{t("extract")}</Extract>
      </div>
      <div>
        <div className="province-elem flex gap-2 flex-wrap py-4">
          {province.map((item: ResponseAreasItem, index) => {
            let type: string = item.parentCode ?? item.coded;

            if (item.parentCode === "kyushuu & okinawa") {
              type = "kyushuu_okinawa";
            }
            const color = CODE_COLOR.filter((i) => i.code === type)[0]?.color;

            return (
              <div className="item-country" key={item.coded}>
                <button
                  type="button"
                  className={`${
                    selectedOptions.includes(item.coded)
                      ? "border border-[#0d8dc8] text-[#0d8dc8]"
                      : "bg-[#F1F1F5] text-[#000]"
                  } rounded-md px-4 inline-block text-[15px] relative h-[34px] text-[#000] capitalize`}
                  onClick={() => {
                    if (selectedOptions.includes(item.coded)) {
                      handleRemoveOption(item.coded);
                    } else {
                      handleOptionClick(item.coded);
                    }
                  }}
                >
                  {item.name}
                  <div
                    style={{ borderColor: `${color}`, color: `${color}` }}
                    className="w-2 h-2 flex justify-center items-center rounded-full border areas-font-size absolute top-1 right-2"
                  >
                    {index}
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        <ButtonControl
          handelSubmit={handelSubmit}
          onHandlePrevious={onHandlePrevious}
          t={t}
        />
        <div className="map pt-10">
          <div className="flex justify-center">
            <Image src="/image_vi12_1.png" alt="" width={329} height={413} />
          </div>
          <div className="flex justify-center" style={{ paddingTop: "60px" }}>
            <Image src="/image_vi12.png" alt="" width={238} height={576} />
          </div>
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

export default RegisterCompanyVi12;
