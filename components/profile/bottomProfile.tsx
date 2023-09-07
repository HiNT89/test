import React, { useState } from "react";
import Image from "next/image";
import TabPanel from "@/components/Tab-panel/Tab-panel";
import { Tabs, Tab } from "@mui/material";
export interface BottomProfileProps {
  isEdit: boolean;
  listMerit: string[];
  listLicense: string[];
  listCertificates: string[];
  onChangeMedia: (newSrc: string, id: number, type: string) => void;
  handleOnChangeFile: (newFile: File, id: number, type: string) => void;

  handleUploadMedia: (type: string) => void;
}
export function BottomProfile({
  isEdit,
  listMerit,
  listCertificates,
  listLicense,
  onChangeMedia,
  handleOnChangeFile,
  handleUploadMedia,
}: BottomProfileProps) {
  const [value, setValue] = useState(0);
  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };
  const handleOnchange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
    type: string
  ) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    handleOnChangeFile(event.target.files![0], id, type);

    if (selectedFiles?.[0]) {
      const newSrc = URL.createObjectURL(selectedFiles?.[0]);
      onChangeMedia(newSrc, id, type);
    }
  };
  return (
    <div className="border-y border-[#e5e7eb] mt-5 px-4">
      <div className="py-4">
        <div className="flex justify-between">
          <h4 className="text-[17px] font-bold">Giấy tờ</h4>
          {isEdit ? (
            <button
              className="text-custom-color"
              onClick={() => handleUploadMedia("other")}
            >
              <i className="fas fa-upload"></i>
            </button>
          ) : (
            ""
          )}
        </div>

        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            label="Giấy phép"
            className="font-bold"
            sx={{
              color: value === 0 ? "#9B999A" : "#9B999A",
            }}
            {...a11yProps(0)}
          />
          <Tab
            label="Chứng chỉ"
            className="font-bold"
            sx={{
              color: value === 1 ? "#9B999A" : "#9B999A",
            }}
            {...a11yProps(1)}
          />
          <Tab
            label="Bằng khen"
            className="font-bold"
            sx={{
              color: value === 2 ? "#9B999A" : "#9B999A",
            }}
            {...a11yProps(2)}
          />
        </Tabs>
        {/* ----------- certificates */}
        <TabPanel value={value} index={0}>
          <div className="license">
            <div className="grid grid-cols-3 gap-6">
              {listCertificates.map((x: string, index) => (
                <div key={index} className="item text-center relative">
                  <div className="flex items-center justify-center">
                    <img
                      src={x}
                      alt="merit"
                      style={{
                        height: "109px",
                        objectFit: "cover",
                      }}
                    />
                    {isEdit ? (
                      <label
                        htmlFor={`certificate-media${index}`}
                        className="absolute top-2 right-2 bg-custom-color text-[#ffffff] w-[28px] h-[28px] rounded-lg border border-[#ffffff]"
                      >
                        <i className="fa-solid fa-plus"></i>
                        <input
                          type="file"
                          id={`certificate-media${index}`}
                          className="hidden"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleOnchange(event, index, "certificate")}
                        />
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-[13px] font-bold capitalize pt-2">
                    {index ? `Giấy phép ${index}` : "Giấy đăng ký kinh doanh"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
        {/* ----------- merit */}
        <TabPanel value={value} index={2}>
          <div className="license">
            <div className="grid grid-cols-3 gap-6">
              {listMerit.map((x: string, index) => (
                <div key={index} className="item text-center relative">
                  <div className="flex items-center justify-center">
                    <img
                      src={x}
                      alt="merit"
                      style={{
                        height: "109px",
                        objectFit: "cover",
                      }}
                    />
                    {isEdit ? (
                      <label
                        htmlFor={`merit-media${index}`}
                        className="absolute top-2 right-2 bg-custom-color text-[#ffffff] w-[28px] h-[28px] rounded-lg border border-[#ffffff]"
                      >
                        <i className="fa-solid fa-plus"></i>
                        <input
                          type="file"
                          id={`merit-media${index}`}
                          className="hidden"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleOnchange(event, index, "merit")}
                        />
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-[13px] font-bold capitalize pt-2">
                    bằng khen {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        {/* ----------  license*/}
        <TabPanel value={value} index={1}>
          <div className="license">
            <div className="grid grid-cols-3 gap-6">
              {listLicense.map((x: string, index) => (
                <div key={index} className="item text-center relative">
                  <div className="flex items-center justify-center">
                    <img
                      src={x}
                      alt="license"
                      style={{
                        height: "109px",
                        objectFit: "cover",
                      }}
                    />
                    {isEdit ? (
                      <label
                        htmlFor={`license-media${index}`}
                        className="absolute top-2 right-2 bg-custom-color text-[#ffffff] w-[28px] h-[28px] rounded-lg border border-[#ffffff]"
                      >
                        <i className="fa-solid fa-plus"></i>
                        <input
                          type="file"
                          id={`license-media${index}`}
                          className="hidden"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => handleOnchange(event, index, "license")}
                        />
                      </label>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="text-[13px] font-bold capitalize pt-2">
                    chứng chỉ {index + 1}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </div>
    </div>
  );
}
