import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconBot, IconCamera } from "@/assets/icon";
import { RowControl } from "./rowControl";
import { updateData } from "@/firebase";
import { SimpleCtx } from "../common/auth";
import { uploadAvatar } from "@/utils/updateData";
interface Data {
  area: string;
  typeOfLabor: string;
  staffs: string;
  companyName: string;
  avatar: string;
}
export function TopProfile({
  isEdit,
  toggle,
  data,
  updateAvatar,
}: {
  isEdit: boolean;
  toggle: () => void;
  data: Data;
  updateAvatar: (url: string) => void;
}) {
  const UserContext = useContext(SimpleCtx);
  const handleOnchange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    UserContext?.setIsLoading(true);
    const imgURL = await uploadAvatar(event.target.files![0]);
    const payload = {
      id: UserContext?.value?.uid,
      data: {
        key: "avatar",
        value: imgURL,
      },
    };
    const isSuccess = await updateData(payload);
    if (isSuccess) updateAvatar(imgURL);
    UserContext?.setIsLoading(false);
    isSuccess ? alert("update avatar success") : alert("update avatar failed");
  };
  return (
    <>
      <div className="avatar">
        <div className="bg-[#0D8DC8] h-[180px] relative">
          <div className="px-4 pt-3 text-white">
            <Link href={`/`}>
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </div>
          <div className="absolute bottom-0 right-0">
            <IconBot />
          </div>
          <div className="flex justify-center">
            <div className="absolute">
              <div className="relative">
                <img
                  className="rounded-[20px] w-[180px] h-[180px] object-cover"
                  src={data.avatar}
                  alt=""
                />
                {isEdit ? (
                  <label htmlFor="dropzone-file-avatar">
                    <div className="absolute top-[10px] right-[10px]">
                      <IconCamera />
                      <input
                        id="dropzone-file-avatar"
                        type="file"
                        className="hidden"
                        onChange={handleOnchange}
                      />
                    </div>
                  </label>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="des text-center pt-12 relative">
        <div className="">
          <div className="relative">
            <h4 className="text-[#000] text-custom-fontsize-17 font-semibold uppercase relative">
              TÊN CÔNG TY: {data.companyName}
            </h4>
            <span className="absolute top-[-15px] right-2 text-[11px] bg-[#FF1400] text-white h-[17px] px-1 items-center rounded-md">
              Chưa kiểm duyệt
            </span>
          </div>
          <p className="text-[#8B929A] text-custom-fontsize font-normal">
            Chế biến thực phẩm
          </p>
        </div>
      </div>
      <RowControl isEdit={isEdit} toggle={toggle} />
      <div className="info px-4 leading-7 py-2 border-b border-[#DEDEDE]">
        <div className="info-item flex items-center gap-2 text-[14px]">
          <i className="fa-solid w-[10px] fa-location-dot text-[#8B929A]"></i>
          <p className="capitalize">
            Địa điểm <strong>{data.area}</strong>
          </p>
        </div>
        {data.typeOfLabor ? (
          <div className="info-item flex items-center gap-2 text-[14px]">
            <i className="fa-solid w-[10px] fa-suitcase text-[#8B929A]"></i>
            <p className="capitalize">
              Từng tuyển dụng lao động nước ngoài <br />
              <strong>{data.typeOfLabor}</strong>
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="info-item flex items-center gap-2 text-[14px]">
          <i className="fa-solid w-[10px] fa-person text-[#8B929A]"></i>
          <p className="">
            Số lượng nhân viên <strong>{data.staffs}</strong>
          </p>
        </div>
      </div>
    </>
  );
}
