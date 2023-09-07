import React, { useState, useContext } from "react";
import { Line, Heading, Extract } from "@/components/common";
import { useRouter } from "next/router";
import Logo from "../common/Logo";
import { usePathname } from "next/navigation";
import ButtonControl from "../common/BtnControl";
import { updateData } from "@/firebase";
import { SimpleCtx } from "@/components/common/auth";
import { TYPE_OF_LABOR } from "@/utils/dataRegisters";
import { useTranslation } from "react-i18next";
import { Snackbar, Alert } from "@mui/material";
const RegisterCompanyVi02 = ({ headingTile }: { headingTile: string }) => {
  const UserContext = useContext(SimpleCtx);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation("rcv02");
  // const { t } = useTranslation("vi02Already");
  const [toast, setToast] = useState({
    open: false,
    content: "",
  });
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const handleOptionClick = (option: string) => {
    if (selectedOptions.length >= 3) {
      setToast({
        open: true,
        content: "Bạn chỉ được lựa chọn 3 trường",
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
  const onHandlePrevious = () => {
    router.push("/register/vi01");
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
        key:
          pathname !== "/register/vi02already"
            ? "typeOfLaborTarget"
            : "typeOfLabor",
        value: selectedOptions,
      },
    };
    const isSuccess = await updateData(payload);
    if (isSuccess) {
      pathname === "/register/vi02already"
        ? router.push("/register/vi02notyet")
        : router.push("/register/vi12");
    }
  };
  return (
    <div className="mx-4 pb-4 max-w-[1280px] md:mx-auto">
      <div className="">
        <Logo />
        <Heading>{headingTile}</Heading>
        <Line percentage={22}></Line>
        <Extract a={true}>{t("extract")}</Extract>
      </div>

      <div className="country-elem flex gap-2 flex-wrap py-4">
        {TYPE_OF_LABOR.map((item: any) => (
          <div className="item-country" key={item?.id}>
            <button
              type="button"
              className={`${
                selectedOptions.includes(item?.id)
                  ? "border border-custom-color text-custom-color"
                  : "bg-[#F1F1F5] text-[#000]"
              } rounded-md px-4 inline-block text-[15px] relative h-[34px] text-[#000]`}
              onClick={() => {
                if (selectedOptions.includes(item?.id)) {
                  handleRemoveOption(item?.id);
                } else {
                  handleOptionClick(item?.id);
                }
              }}
            >
              {item?.value}
            </button>
          </div>
        ))}
      </div>
      <ButtonControl
        handelSubmit={handelSubmit}
        onHandlePrevious={onHandlePrevious}
        t={t}
        isStatus={!selectedOptions.length}
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
export default RegisterCompanyVi02;
