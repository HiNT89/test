import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { Line, Heading, Extract } from "@/components/common";
import { DataPayload, addData } from "@/firebase";
import Logo from "../common/Logo";
import { SimpleCtx } from "../common/auth";
import { useContext } from "react";
import {
  LIST_IMG_CERTIFICATE,
  LIST_IMG_COMPANY,
  LIST_VIDEO_COMPANY,
} from "@/utils/data";
interface Payload {
  id: string;
  data: DataPayload;
}
const RegisterCompanyVi01 = () => {
  const { t } = useTranslation("rcv01");
  const UserContext = useContext(SimpleCtx);
  const router = useRouter();
  const onHandleClick = async (value: boolean) => {
    const payload: Payload = {
      id: UserContext?.value?.uid,
      data: {
        avatar: "/profile/img1.png",
        area: "",
        charterCapital: "",
        certificates: LIST_IMG_CERTIFICATE,
        images: LIST_IMG_COMPANY,
        information: {
          email: "",
          gmail: "",
          facebook: "",
          line: "",
          phoneNumber: [],
          website: "",
          zalo: "",
        },
        license: LIST_IMG_CERTIFICATE,
        merit: LIST_IMG_CERTIFICATE,
        companyName: "",
        profits: [],
        revenues: [],
        staff: "",
        statusProfile: false,
        typeOfLabor: value ? [] : null,
        typeOfLaborTarget: [],
        videos: LIST_VIDEO_COMPANY,
        dateContact: "",
      },
    };
    const isSuccess = await addData(payload);
    if (isSuccess) {
      router.push(!value ? "/register/vi02notyet" : "/register/vi02already");
    }
  };
  return (
    <div className="pb-5 mx-4 max-w-[1280px] md:mx-auto">
      <div className="">
        <Logo />
        <div className="" style={{ paddingTop: "50px" }}>
          <Heading>{t("heading")}</Heading>
          <Line percentage={11} />
          <Extract a={true}>{t("extract")}</Extract>
        </div>
      </div>
      <div className="md:flex md:gap-4">
        <button
          onClick={() => onHandleClick(false)}
          className="block border border-gray-[#E3E3E3] p-4 rounded-custom w-full text-base mb-4 md:mb-0"
        >
          {t("btn1")}
        </button>
        <button
          onClick={() => onHandleClick(true)}
          className="block border border-gray-[#E3E3E3] p-4 rounded-custom w-full text-base"
        >
          {t("btn2")}
        </button>
      </div>
    </div>
  );
};
// RegisterCompanyVi01.layout = RegisterNoBottomLayout;
export default RegisterCompanyVi01;
