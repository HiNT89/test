"use client";
import { useState, useContext, useEffect } from "react";
import {
  IconFacebook,
  IconGoogle,
  IconLine,
  IconZalo,
  IconArrow,
  IconClose,
  IconDollar,
  IconCloseBig,
} from "@/assets/icon";
import { Box, Modal } from "@mui/material";
import {
  BottomProfile,
  BoxMedia,
  RowInformation,
  TopProfile,
} from "@/components/profile";
import { BoxRevenue } from "@/components/profile/boxRevenu";
import { RowControl } from "@/components/profile/rowControl";
import { SimpleCtx } from "@/components/common/auth";
import {
  getDataAreas,
  getDataDocument,
  getDocument,
  updateData,
} from "@/firebase";
import {
  DataRegisterFieldItem,
  DataRevenueItem,
  InformationContactType,
  InformationType,
} from "@/models/profile";
import listYearOption from "@/utils/listYearOption";
import StoryMediaList from "@/components/storyImage/StoryMediaList";
import { updateMedia } from "@/utils/updateData";
import {
  CHARTER_CAPITALS,
  DataRegisterItem,
  STAFFS,
  TYPE_OF_LABOR,
} from "@/utils/dataRegisters";
import { Snackbar, Alert } from "@mui/material";

interface DataMediaType {
  image: string[] | [];
  video: string[] | [];
  merit: string[] | [];
  license: string[] | [];
  certificate: string[] | [];
}
interface DataFileMediaType {
  image: (File | null)[];
  video: (File | null)[];
  merit: (File | null)[];
  license: (File | null)[];
  certificate: (File | null)[];
}
const Profile = () => {
  const UserContext = useContext(SimpleCtx);
  const [profile, setProfile] = useState<any>({});
  const [toast, setToast] = useState({
    open: false,
    content: "",
    type: false,
  });
  // ----
  const [dataMedia, setDataMedia] = useState<DataMediaType>({
    image: [],
    video: [],
    merit: [],
    license: [],
    certificate: [],
  });
  const [dataFileMedia, setDataFileMedia] = useState<DataFileMediaType>({
    image: [null, null, null, null],
    video: [null, null, null, null],
    merit: [null, null, null, null],
    license: [null, null, null, null],
    certificate: [null, null, null, null],
  });
  const [dataMediaPreview, setDataMediaPreview] = useState<DataMediaType>({
    image: [],
    video: [],
    merit: [],
    license: [],
    certificate: [],
  });
  const [dataRegister, setDataRegister] = useState<any>([]);
  // revenue
  const listYear = listYearOption();
  const year = listYear[listYear.length - 1];
  const [dataInput, setDataInput] = useState({
    isRevenue: true,
    year,
    value: 0,
  });
  const [isEdit, setIsEdit] = useState(false);

  const [statusModal, setStatusModal] = useState({
    modalTypeOfLaborTarget: false,
    modalRevenue: false,
  });
  const [information, setInformation] = useState<InformationType>({
    companyName: "",
    typeOfLaborTarget: [],
    typeOfLabor: [],
    area: "",
    staffs: "",
    charterCapital: "",
  });
  const [province, setProvince] = useState<any>([]);
  const [informationContact, setInformationContact] =
    useState<InformationContactType>({
      website: profile?.information?.webiste || "",
      zalo: profile?.information?.zalo || "(+84) chưa rõ",
      line: profile?.information?.line || "(+84) chưa rõ",
      facebook: profile?.information?.facebook || "chưa rõ",
      phoneNumber: profile?.information?.phoneNumber || [],
      email: profile?.information?.email || "chưa rõ",
      gmail: profile?.information?.gmail || "chưa rõ",
    });
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [payloadInformation, setPayloadInformation] = useState({
    companyName: "",
    typeOfLabor: ["1"],
    typeOfLaborTarget: ["1"],
    area: "",
    staff: "",
    charterCapital: "",
  });
  // useEffect
  useEffect(() => {
    getDataDocument(UserContext?.value?.uid, "profiles").then((data) =>
      setProfile(data[0]),
    );
    getDocument("dataRegisters").then((data) => setDataRegister(data));
    getDataAreas().then((data) => setProvince(data));
  }, [UserContext]);
  useEffect(() => {
    setInformationContact({
      website: profile?.information?.website || "",
      zalo: profile?.information?.zalo || "(+84) chưa rõ",
      line: profile?.information?.line || "(+84) chưa rõ",
      facebook: profile?.information?.facebook || "chưa rõ",
      gmail: profile?.information?.gmail || "chưa rõ",
      phoneNumber: profile?.information?.phoneNumber || [],
      email: profile?.information?.email || "chưa rõ",
    });
    const dataTypeOfLabor = TYPE_OF_LABOR;
    const dataStaff = STAFFS;
    const dataCharterCapital = CHARTER_CAPITALS;
    const newInformation = {
      companyName: profile?.companyName || "chưa rõ",
      typeOfLaborTarget: dataTypeOfLabor
        .filter((it: DataRegisterItem) =>
          profile?.typeOfLaborTarget?.includes(it.id),
        )
        .map((it) => it.value),
      typeOfLabor: dataTypeOfLabor
        .filter((it: DataRegisterItem) => profile?.typeOfLabor?.includes(it.id))
        .map((it) => it.value),
      area: province.filter((x: any) => x.coded === profile?.area)[0]?.name,
      staffs: dataStaff.filter((it: DataRegisterItem) =>
        profile?.staff?.includes(it.id),
      )[0]?.value,
      charterCapital: dataCharterCapital.filter((it: any) =>
        profile?.charterCapital?.includes(it.id),
      )[0]?.value,
    };
    setInformation(newInformation);
    setPayloadInformation({
      companyName: profile?.companyName,
      typeOfLabor: profile?.typeOfLabor,
      typeOfLaborTarget: profile?.typeOfLaborTarget,
      area: profile?.area,
      staff: profile?.staff,
      charterCapital: profile?.charterCapital,
    });
    // img
    const newMedia = {
      image: profile?.images ?? [],
      video: profile?.videos ?? [],
      merit: profile?.merit ?? [],
      license: profile?.license ?? [],
      certificate: profile?.certificates ?? [],
    };
    setDataMedia(newMedia);
    setDataMediaPreview(newMedia);
  }, [profile, province]);
  useEffect(() => {
    const dataTypeOfLabor = TYPE_OF_LABOR;
    const dataStaff = STAFFS;
    const dataCharterCapital = CHARTER_CAPITALS;
    setInformation({
      ...information,
      typeOfLaborTarget:
        payloadInformation?.typeOfLaborTarget !== null
          ? dataTypeOfLabor
              .filter((it: any) =>
                payloadInformation?.typeOfLaborTarget?.includes(it.id),
              )
              .map((it) => it.value)
          : [],
      area: province.filter((x: any) => x.coded === payloadInformation.area)[0]
        ?.name,
      companyName: payloadInformation?.companyName,
      staffs: dataStaff.filter((it: any) =>
        payloadInformation?.staff?.includes(it.id),
      )[0]?.value,
      charterCapital: dataCharterCapital.filter((it: any) =>
        payloadInformation?.charterCapital?.includes(it.id),
      )[0]?.value,
    });
  }, [payloadInformation]);

  // function
  const toggle = () => {
    setIsEdit(!isEdit);
  };
  const handleChangeInformation = (event: any) => {
    const { name, value } = event.target;
    setPayloadInformation((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleChangeInformationContact = (event: any) => {
    const { name, value } = event.target;
    setInformationContact((data) => ({
      ...data,
      [name]: value,
    }));
  };
  const handleOptionClick = (option: string) => {
    if (payloadInformation.typeOfLaborTarget.length >= 3) {
      setToast({
        type: false,
        open: true,
        content: "Bạn chỉ được lựa chọn 3 trường",
      });
    } else {
      const { typeOfLaborTarget } = payloadInformation;
      const condition = typeOfLaborTarget.includes(option);
      condition
        ? setPayloadInformation({
            ...payloadInformation,
            typeOfLaborTarget: typeOfLaborTarget.filter(
              (it: string) => it !== option,
            ),
          })
        : setPayloadInformation({
            ...payloadInformation,
            typeOfLaborTarget: [...typeOfLaborTarget, option],
          });
    }
  };
  const handleConfirm = () => {
    setStatusModal({ ...statusModal, modalTypeOfLaborTarget: false });
  };
  const handleAddPhoneNumber = (phone: string) => {
    const condition = checkPhoneNumber(phone);
    if (condition) {
      const { phoneNumber } = informationContact;
      setInformationContact({
        ...informationContact,
        phoneNumber: [`+${phone}`, ...phoneNumber],
      });
      setPhoneNumberInput("");
    } else {
      setToast({
        type: false,
        open: true,
        content: "số điện thoại không hợp lệ",
      });
    }
  };
  const handleDeletePhoneNumber = (phone: string) => {
    const { phoneNumber } = informationContact;
    setInformationContact({
      ...informationContact,
      phoneNumber: phoneNumber.filter((it) => it !== phone),
    });
    setPhoneNumberInput("");
  };
  const checkPhoneNumber = (phoneNumber: string) => {
    const regexPhoneNumber = /(84|0[3|5|7|8|9]|34)+([0-9]{9})\b/g;
    const validatePhone = phoneNumber.match(regexPhoneNumber) ? true : false;
    return validatePhone;
  };
  const toggleModal = (value: boolean, modal: string, isRevenue?: boolean) => {
    if (isRevenue !== undefined) {
      setDataInput({ ...dataInput, isRevenue: isRevenue });
    }
    setStatusModal({ ...statusModal, [modal]: value });
  };
  const handleUpdateInformationContact = async () => {
    UserContext?.setIsLoading(true);

    const payload = {
      id: UserContext?.value?.uid,
      data: {
        key: "information",
        value: {
          gmail: informationContact.gmail,
          facebook: informationContact.facebook,
          line: informationContact.line,
          phoneNumber: informationContact.phoneNumber,
          website: informationContact.website,
          zalo: informationContact.zalo,
          email: informationContact.email,
        },
      },
    };
    const isSuccess = await updateData(payload);
    UserContext?.setIsLoading(false);
    setToast({
      type: isSuccess,
      open: true,
      content: isSuccess ? "cập nhật thành công" : "cập nhật thất bại",
    });
    setIsEdit(false);
  };
  const handleUpdateInformation = async () => {
    UserContext?.setIsLoading(true);

    const keys = Object.keys(payloadInformation);
    const values = Object.values(payloadInformation);
    const a = keys.map((it, index) => {
      const valueIt = values[index];
      return updateData({
        id: UserContext?.value?.uid,
        data: {
          key: it,
          value: valueIt,
        },
      });
    });
    const isSuccess = await Promise.all(a).then((values) => values);
    UserContext?.setIsLoading(false);
    setToast({
      type: isSuccess.some((x: boolean) => x),
      open: true,
      content: isSuccess.some((x: boolean) => x)
        ? "cập nhật thành công"
        : "cập nhật thất bại",
    });

    setIsEdit(false);
    setProfile({ ...profile, ...payloadInformation });
  };
  const handleModelRevenueConfirm = async () => {
    const condition = dataInput.isRevenue
      ? profile?.revenues
          .map((it: DataRevenueItem) => it.year)
          .includes(dataInput.year)
      : profile?.profits
          .map((it: DataRevenueItem) => it.year)
          .includes(dataInput.year);
    if (condition) {
      setToast({
        type: false,
        open: true,
        content: "dữ liệu đã tồn tại , vui lòng thử lại",
      });
      return;
    }
    const olderValue = dataInput.isRevenue
      ? profile?.revenues
      : profile?.profits;
    const isSuccess = await updateData({
      id: UserContext?.value?.uid,
      data: {
        key: dataInput.isRevenue ? "revenues" : "profits",
        value: [
          ...olderValue,
          {
            year: dataInput.year,
            value: dataInput.value,
          },
        ],
      },
    });
    if (isSuccess) {
      const payload = {
        year: dataInput.year,
        value: dataInput.value,
      };
      const { revenues, profits } = profile;
      dataInput.isRevenue
        ? setProfile({
            ...profile,
            revenues: [...revenues, payload],
          })
        : setProfile({ ...profile, profits: [...profits, payload] });
      setDataInput({
        isRevenue: true,
        year,
        value: 0,
      });
      setStatusModal({ ...statusModal, modalRevenue: false });
    } else {
      setToast({
        type: false,
        open: true,
        content: "có lỗi , vui lòng thử lại",
      });
    }
  };
  const handleRemoveRevenue = async (year: number) => {
    const olderValue = dataInput.isRevenue
      ? profile?.revenues
      : profile?.profits;
    const isSuccess = await updateData({
      id: UserContext?.value?.uid,
      data: {
        key: dataInput.isRevenue ? "revenues" : "profits",
        value: olderValue.filter((it: DataRevenueItem) => it.year !== year),
      },
    });
    if (isSuccess) {
      const { revenues, profits } = profile;
      dataInput.isRevenue
        ? setProfile({
            ...profile,
            revenues: revenues.filter(
              (it: DataRevenueItem) => it.year !== year,
            ),
          })
        : setProfile({
            ...profile,
            profits: profits.filter((it: DataRevenueItem) => it.year !== year),
          });
      setDataInput({
        isRevenue: true,
        year,
        value: 0,
      });
      setStatusModal({ ...statusModal, modalRevenue: false });
    } else {
      setToast({
        type: false,
        open: true,
        content: "có lỗi , vui lòng thử lại",
      });
    }
  };
  const handleOnChangeMedia = (newSrc: string, id: number, type: string) => {
    if (type === "img") {
      const newValue = dataMediaPreview.image.map((x: string, index) => {
        return index == id ? newSrc : x;
      });
      setDataMediaPreview({ ...dataMediaPreview, image: newValue });
    }
    if (type === "video") {
      const newValue = dataMediaPreview.video.map((x: string, index) => {
        return index == id ? newSrc : x;
      });
      setDataMediaPreview({ ...dataMediaPreview, video: newValue });
    }
    if (type === "merit") {
      const newValue = dataMediaPreview.merit.map((x: string, index) => {
        return index == id ? newSrc : x;
      });
      setDataMediaPreview({ ...dataMediaPreview, merit: newValue });
    }
    if (type === "license") {
      const newValue = dataMediaPreview.license.map((x: string, index) => {
        return index == id ? newSrc : x;
      });
      setDataMediaPreview({ ...dataMediaPreview, license: newValue });
    }
    if (type === "certificate") {
      const newValue = dataMediaPreview.certificate.map((x: string, index) => {
        return index == id ? newSrc : x;
      });
      setDataMediaPreview({ ...dataMediaPreview, certificate: newValue });
    }
  };
  const handleOnChangeFile = (newFile: File, id: number, type: string) => {
    if (type === "img") {
      const newValue = dataFileMedia.image.map((x: File | null, index) => {
        return index == id ? newFile : x;
      });
      setDataFileMedia({ ...dataFileMedia, image: newValue });
    }
    if (type === "video") {
      const newValue = dataFileMedia.video.map((x: File | null, index) => {
        return index == id ? newFile : x;
      });
      setDataFileMedia({ ...dataFileMedia, video: newValue });
    }
    if (type === "merit") {
      const newValue = dataFileMedia.merit.map((x: File | null, index) => {
        return index == id ? newFile : x;
      });
      setDataFileMedia({ ...dataFileMedia, merit: newValue });
    }
    if (type === "license") {
      const newValue = dataFileMedia.license.map((x: File | null, index) => {
        return index == id ? newFile : x;
      });
      setDataFileMedia({ ...dataFileMedia, license: newValue });
    }
    if (type === "certificate") {
      const newValue = dataFileMedia.certificate.map(
        (x: File | null, index) => {
          return index == id ? newFile : x;
        },
      );
      setDataFileMedia({ ...dataFileMedia, certificate: newValue });
    }
  };
  const handleUploadMedia = async (type: string) => {
    // img
    if (type === "img") {
      UserContext?.setIsLoading(true);
      const indexs: number[] = [];
      const file = dataFileMedia.image.filter((x, index) => {
        if (x !== null) {
          indexs.push(index);
          return true;
        }
        return false;
      });

      const values: string[] = await updateMedia(file, dataMedia.image, indexs);
      const isSuccess = await updateData({
        id: UserContext?.value?.uid,
        data: {
          key: "images",
          value: values,
        },
      });
      setToast({
        type: isSuccess,
        open: true,
        content: isSuccess
          ? "cập nhật thành công"
          : "có lỗi , vui lòng thử lại",
      });
      UserContext?.setIsLoading(false);
    }
    if (type === "video") {
      UserContext?.setIsLoading(true);

      const indexs: number[] = [];
      const file = dataFileMedia.video.filter((x, index) => {
        if (x !== null) {
          indexs.push(index);
          return true;
        }
        return false;
      });
      const values = await updateMedia(file, dataMedia.video, indexs);
      const isSuccess = await updateData({
        id: UserContext?.value?.uid,
        data: {
          key: "videos",
          value: values,
        },
      });
      UserContext?.setIsLoading(false);

      setToast({
        type: isSuccess,
        open: true,
        content: isSuccess
          ? "cập nhật thành công"
          : "có lỗi , vui lòng thử lại",
      });
    }
    if (type === "other") {
      UserContext?.setIsLoading(true);

      const indexs: {
        merit: number[];
        license: number[];
        certificate: number[];
      } = {
        merit: [],
        license: [],
        certificate: [],
      };
      const fileMerit = dataFileMedia.merit.filter((x, index) => {
        if (x !== null) {
          indexs.merit.push(index);
          return true;
        }
        return false;
      });
      const fileLicense = dataFileMedia.license.filter((x, index) => {
        if (x !== null) {
          indexs.license.push(index);
          return true;
        }
        return false;
      });
      const fileCertificate = dataFileMedia.certificate.filter((x, index) => {
        if (x !== null) {
          indexs.certificate.push(index);
          return true;
        }
        return false;
      });
      const listSuccess = [];
      if (indexs.merit.length) {
        const values = await updateMedia(
          fileMerit,
          dataMedia.merit,
          indexs.merit,
        );
        const isSuccess = await updateData({
          id: UserContext?.value?.uid,
          data: {
            key: "merit",
            value: values,
          },
        });
        listSuccess.push(isSuccess);
      }
      if (indexs.certificate.length) {
        const values = await updateMedia(
          fileCertificate,
          dataMedia.certificate,
          indexs.certificate,
        );
        const isSuccess = await updateData({
          id: UserContext?.value?.uid,
          data: {
            key: "certificates",
            value: values,
          },
        });
        listSuccess.push(isSuccess);
      }
      if (indexs.license.length) {
        const values = await updateMedia(
          fileLicense,
          dataMedia.license,
          indexs.license,
        );
        const isSuccess = await updateData({
          id: UserContext?.value?.uid,
          data: {
            key: "license",
            value: values,
          },
        });
        listSuccess.push(isSuccess);
      }
      UserContext?.setIsLoading(false);
      setToast({
        type: listSuccess.every((x) => x),
        open: true,
        content: listSuccess.every((x) => x)
          ? "cập nhật thành công"
          : "có lỗi , vui lòng thử lại",
      });
    }
  };
  return (
    <div className="max-w-[1280px] mx-auto">
      <TopProfile
        isEdit={isEdit}
        toggle={toggle}
        updateAvatar={(url: string) => setProfile({ ...profile, avatar: url })}
        data={{
          avatar: profile?.avatar,
          area: information.area,
          typeOfLabor: information.typeOfLabor.join(" , "),
          staffs: information.staffs,
          companyName: profile?.companyName || "chưa rõ",
        }}
      />
      <div className="story">
        <div className="py-4 px-4">
          <BoxMedia
            isEdit={isEdit}
            title="hình ảnh"
            handleUploadMedia={handleUploadMedia}
            element={
              <StoryMediaList
                title="hình ảnh"
                isEdit={isEdit}
                list={dataMediaPreview.image}
                handleOnChangeFile={handleOnChangeFile}
                onChangeMedia={handleOnChangeMedia}
              />
            }
          />
          <BoxMedia
            isEdit={isEdit}
            title="video"
            handleUploadMedia={handleUploadMedia}
            element={
              <StoryMediaList
                title="video"
                isEdit={isEdit}
                list={dataMediaPreview.video}
                handleOnChangeFile={handleOnChangeFile}
                onChangeMedia={handleOnChangeMedia}
              />
            }
          />
        </div>
      </div>
      {/* form thông tin cơ bản */}
      <div className="px-4">
        <div className="flex items-center justify-between pt-6 border-t border-t-[#e5e5e5]">
          <span className="text-[#0d8dc8] font-semibold text-custom-fontsize-17">
            Thông tin cơ bản
          </span>
          {isEdit ? (
            <button
              className="text-[#0d8dc8] text-custom-fontsize-17"
              onClick={handleUpdateInformation}
            >
              Xong
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="pt-2">
          <RowInformation
            isEdit={isEdit}
            title="Tên công ty/Xí nghiệp"
            valueInput={information.companyName}
          >
            <input
              type="text"
              name="companyName"
              className="border-none outline-none p-2 max-w-[150px]"
              // placeholder="Ví dụ: Công ty Cổ phần ABC"
              value={information.companyName}
              onChange={handleChangeInformation}
            />
          </RowInformation>
          <RowInformation
            isEdit={null}
            title="Đã từng sử dụng lao động nước ngoài"
            valueInput={information.typeOfLabor?.join(" , ")}
          ></RowInformation>
          <RowInformation
            isEdit={null}
            title="Quan tâm đến loại hình lao động"
            valueInput={information.typeOfLaborTarget?.join(",")}
          >
            <button
              type="button"
              className="pr-2"
              onClick={() => {
                setStatusModal({
                  ...statusModal,
                  modalTypeOfLaborTarget: true,
                });
              }}
              disabled={!isEdit}
            >
              <IconArrow />
            </button>
          </RowInformation>
          <RowInformation
            isEdit={isEdit}
            title="Khu vực"
            valueInput={information.area}
          >
            <select
              id=""
              className="border-none text-custom-fontsize p-2"
              name="area"
              value={payloadInformation.area}
              onChange={handleChangeInformation}
            >
              {province.map((it: any) => (
                <option key={it.coded} value={it.coded}>
                  {it.name}
                </option>
              ))}
            </select>
          </RowInformation>

          <RowInformation
            isEdit={isEdit}
            title="Số lượng nhân viên"
            valueInput={information.staffs}
          >
            <select
              className="border-none text-custom-fontsize p-2"
              name="staff"
              value={payloadInformation.staff}
              onChange={handleChangeInformation}
            >
              {STAFFS.map((x: DataRegisterFieldItem) => (
                <option key={x.id} value={x.id}>
                  {x.value}
                </option>
              ))}
            </select>
          </RowInformation>
          <RowInformation
            isEdit={isEdit}
            title="Vốn điều lệ"
            valueInput={information.charterCapital}
          >
            <select
              id=""
              className="border-none text-custom-fontsize p-2 max-w-[150px]"
              name="charterCapital"
              value={payloadInformation.charterCapital}
              onChange={handleChangeInformation}
            >
              {CHARTER_CAPITALS.map((x: any) => (
                <option key={x.id} value="1">
                  {x.value}
                </option>
              ))}
            </select>
          </RowInformation>
        </div>
      </div>
      {/* Doanh thu */}
      <BoxRevenue
        title="doanh thu"
        isEdit={isEdit}
        listItem={profile?.revenues ?? []}
        toggleModal={(value: boolean) =>
          toggleModal(value, "modalRevenue", true)
        }
        handleRemoveRevenue={handleRemoveRevenue}
      />
      {/* loi nhuận */}
      <BoxRevenue
        title="lợi nhuận"
        isEdit={isEdit}
        listItem={profile?.profits ?? []}
        toggleModal={(value: boolean) =>
          toggleModal(value, "modalRevenue", false)
        }
        handleRemoveRevenue={handleRemoveRevenue}
      />
      {/* thông tin liên hệ */}
      <div className="px-4">
        <div>
          <div className="flex items-center justify-between pt-[24px]">
            <span className="text-[#0d8dc8] font-semibold text-custom-fontsize-17">
              Thông tin liên hệ
            </span>
            {isEdit ? (
              <button
                className="text-[#0d8dc8] text-custom-fontsize-17"
                onClick={handleUpdateInformationContact}
              >
                Xong
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="pt-2">
            {/* website */}
            <RowInformation
              isEdit={isEdit}
              title="Website"
              valueInput={informationContact.website}
            >
              <input
                type="text"
                name="website"
                className="border-none outline-none w-full p-2"
                placeholder=" Ví dụ: Công ty Cổ phần ABC"
                value={informationContact.website}
                onChange={handleChangeInformationContact}
              />
            </RowInformation>
            {/* zalo */}
            <RowInformation
              isEdit={isEdit}
              title="zalo"
              valueInput={informationContact.zalo}
              elementTitle={
                <div className="bg-[#F1F1F5] w-[164px] p-2 flex items-center gap-2">
                  <IconZalo></IconZalo>
                  <span className="text-custom-fontsize font-medium">
                    Kết nối Zalo
                  </span>
                </div>
              }
            >
              <input
                type="text"
                name="zalo"
                className="border-none outline-none w-full p-2"
                placeholder="http://www./"
                value={informationContact.zalo}
                onChange={handleChangeInformationContact}
              />
            </RowInformation>
            {/* line */}
            <RowInformation
              isEdit={isEdit}
              title="line"
              valueInput={informationContact.line}
              elementTitle={
                <div className="bg-[#F1F1F5] w-[164px] h-full p-2 flex items-center gap-2">
                  <IconLine></IconLine>
                  <span className="text-custom-fontsize font-medium">
                    Kết nối Line
                  </span>
                </div>
              }
            >
              <input
                type="text"
                name="line"
                className="border-none outline-none w-full p-2"
                placeholder="http://www./"
                value={informationContact.line}
                onChange={handleChangeInformationContact}
              />
            </RowInformation>
            {/* google */}
            <RowInformation
              isEdit={isEdit}
              title="gmail"
              valueInput={informationContact.gmail}
              elementTitle={
                <div className="bg-[#F1F1F5] w-[164px] p-2 fle-shrink-0 flex items-center gap-2 h-full">
                  <IconGoogle></IconGoogle>
                  <span className="text-custom-fontsize font-medium">
                    Kết nối Gmail
                  </span>
                </div>
              }
            >
              <input
                type="text"
                name="gmail"
                className="border-none outline-none w-full p-2"
                placeholder="http://www./"
                value={informationContact.gmail}
                onChange={handleChangeInformationContact}
              />
            </RowInformation>
            {/* facebook */}
            <RowInformation
              isEdit={isEdit}
              title="facebook"
              valueInput={informationContact.facebook}
              elementTitle={
                <div className="bg-[#F1F1F5] w-[164px] h-full p-2 flex items-center gap-2">
                  <IconFacebook></IconFacebook>
                  <span className="text-custom-fontsize font-medium">
                    Kết nối Facebook
                  </span>
                </div>
              }
            >
              <input
                type="text"
                name="facebook"
                className="border-none outline-none w-full p-2"
                placeholder="http://www./"
                value={informationContact.facebook}
                onChange={handleChangeInformationContact}
              />
            </RowInformation>
            {/* phone number */}
            <RowInformation
              isEdit={isEdit}
              title="Số điện thoại"
              valueInput={
                informationContact.phoneNumber.length
                  ? informationContact.phoneNumber.join(" , ")
                  : "(+84) chưa rõ"
              }
            >
              <div className="p-2">
                <div className="tag-phone-elm flex flex-wrap">
                  {informationContact.phoneNumber.map((it) => (
                    <div
                      key={it}
                      className="tag-phone-itemn flex border border-[#0D8DC8] items-center gap-2 rounded-custom my-1 px-2"
                    >
                      <p className="text-custom-fontsize text-[#0D8DC8] font-medium inline-block">
                        {it}
                      </p>
                      <button onClick={() => handleDeletePhoneNumber(it)}>
                        <IconClose></IconClose>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row gap-2">
                  <select
                    name=""
                    id=""
                    className="text-custom-fontsize border-none basis 1/4"
                    style={{ padding: "5px 0px 5px 0px" }}
                  >
                    <option value="">(+84)</option>
                    {/* <option value="">(+34)</option> */}
                  </select>
                  <input
                    type="text"
                    className="border-none w-full outline-none text-custom-fontsize basis 1/2"
                    value={phoneNumberInput}
                    onChange={(e) => setPhoneNumberInput(e.target.value)}
                  />
                  <button
                    className="text-[#0D8DC8] text-custom-fontsize basis 1/4 font-medium"
                    onClick={() =>
                      handleAddPhoneNumber(`84${phoneNumberInput}`)
                    }
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </RowInformation>
            {/* email */}
            <RowInformation
              isEdit={isEdit}
              title="Email khác"
              valueInput={informationContact.email}
            >
              <div className="p-2 flex flex-row gap-2">
                <input
                  type="text"
                  className="border-none w-full outline-none text-custom-fontsize"
                  placeholder="Ví dụ: info@abc.com"
                />
                <button className="text-[#0D8DC8] text-custom-fontsize font-medium">
                  Thêm
                </button>
              </div>
            </RowInformation>
          </div>
        </div>
      </div>
      {/* ---  bottom profile */}
      <BottomProfile
        isEdit={isEdit}
        listMerit={dataMediaPreview.merit}
        listLicense={dataMediaPreview.license}
        listCertificates={dataMediaPreview.certificate}
        onChangeMedia={handleOnChangeMedia}
        handleUploadMedia={handleUploadMedia}
        handleOnChangeFile={handleOnChangeFile}
      />
      <RowControl isEdit={isEdit} toggle={toggle} />
      {/* ------------- model */}
      {/* model-1 */}
      <Modal
        open={statusModal.modalTypeOfLaborTarget}
        onClose={() => {
          setStatusModal({ ...statusModal, modalTypeOfLaborTarget: false });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="fixed inset-0 flex items-start justify-center z-50 top-10">
            <div className="relative bg-[#FFF] shadow-2xl rounded-lg mx-auto">
              <div className="px-6 py-6 lg:px-8">
                <div className="flex relative items-center justify-center pb-3">
                  <h4 className="text-center font-bold text-custom-fontsize-19">
                    Chọn loại hình
                  </h4>
                  <button
                    type="button"
                    className="absolute right-0"
                    onClick={() =>
                      setStatusModal({
                        ...statusModal,
                        modalTypeOfLaborTarget: false,
                      })
                    }
                  >
                    <div className="bg-[#F1F1F5] rounded-full p-1">
                      <IconCloseBig></IconCloseBig>
                    </div>
                  </button>
                </div>
                {/* form lấy thông tin */}
                <div className="space-y-6">
                  <div className="border-y border-[#DEDEDE] py-4 flex flex-wrap gap-2">
                    {TYPE_OF_LABOR.map((x: DataRegisterFieldItem) => (
                      <div className="item-country" key={x.id}>
                        <button
                          type="button"
                          className={`${
                            payloadInformation?.typeOfLaborTarget?.includes(
                              x.id,
                            )
                              ? "border border-[#0d8dc8] text-[#0d8dc8]"
                              : "bg-[#F1F1F5] text-[#000]"
                          } rounded-custom py-2 px-4 inline-block text-custom-fontsize h-[34px]`}
                          onClick={() => handleOptionClick(x.id)}
                        >
                          {x.value}
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="bg-[#FFF] h-[38px] px-4 shadow-custom-2 rounded-custom-radius-7 text-custom-fontsize"
                      onClick={() =>
                        setStatusModal({
                          ...statusModal,
                          modalTypeOfLaborTarget: false,
                        })
                      }
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="bg-gradient-to-r from-blue-400 to-teal-400 h-[38px] px-4 shadow-custom-2 text-white font-bold rounded-custom-radius-7 text-custom-fontsize"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* model-1 */}
      {/* model-2 */}
      <Modal
        open={statusModal.modalRevenue}
        onClose={() => {
          setStatusModal({ ...statusModal, modalRevenue: false });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <div className="fixed inset-0 flex items-start justify-center z-50 top-10">
            <div className="relative bg-[#FFF] shadow-2xl rounded-lg mx-auto">
              <div className="px-6 py-6 lg:px-8">
                <div className="flex relative items-center justify-center pb-3">
                  <h4 className="text-center font-bold text-custom-fontsize-19">
                    {dataInput.isRevenue ? "Doanh thu" : "Lợi nhuận"}
                  </h4>
                  <button
                    className="absolute right-0"
                    onClick={() => toggleModal(false, "modalRevenue")}
                  >
                    <div className="bg-[#F1F1F5] rounded-full p-1">
                      <IconCloseBig></IconCloseBig>
                    </div>
                  </button>
                </div>

                <div className="border-y border-[#DEDEDE] py-4">
                  <div className="bg-[#FFFFFF] border border-[#DEDEDE] flex items-center justify-between px-3 py-2 mb-4 rounded-[7px] gap-2">
                    <select
                      id="inputRevenue"
                      value={dataInput.year}
                      onChange={(e) =>
                        setDataInput({ ...dataInput, year: +e.target.value })
                      }
                      className="flex-grow outline-none border-none"
                    >
                      {listYear.map((it: number) => (
                        <option key={it}>{it}</option>
                      ))}
                    </select>
                    <label
                      htmlFor="inputRevenue"
                      className="bg-[#FFFFFF] text-[#0D8DC8] text-custom-fontsize"
                    >
                      Năm
                    </label>
                  </div>
                  <div className="bg-[#FFFFFF] border border-[#DEDEDE] flex items-center justify-between px-3 py-2 mb-4 rounded-[7px] gap-2">
                    <IconDollar />
                    <input
                      type="number"
                      className="outline-none border-none text-custom-fontsize"
                      placeholder="Ví dụ: 100"
                      required
                      value={dataInput.value !== 0 ? dataInput.value : ""}
                      onChange={(e) => {
                        const newValue = +e.target.value;
                        setDataInput({ ...dataInput, value: newValue });
                      }}
                    />
                    <label
                      htmlFor=""
                      className="bg-[#FFFFFF] text-[#0D8DC8] text-custom-fontsize"
                    >
                      Triệu Yên
                    </label>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 py-4">
                  <button
                    className="bg-[#FFF] h-[38px] px-4 shadow-custom-2 rounded-custom-radius-7 text-custom-fontsize"
                    onClick={() => toggleModal(false, "modalRevenue")}
                  >
                    Hủy
                  </button>
                  <button
                    className="bg-gradient-to-r from-blue-400 to-teal-400 h-[38px] px-4 shadow-custom-2 text-white font-bold rounded-custom-radius-7 text-custom-fontsize"
                    onClick={handleModelRevenueConfirm}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      {/* model-2 */}
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

export default Profile;
