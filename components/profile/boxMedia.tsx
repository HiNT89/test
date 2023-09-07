import * as React from "react";
interface BoxMediaProps {
  title: string;
  element: any;
  isEdit: boolean;
  handleUploadMedia: (type: string) => void;
}
export function BoxMedia({
  title,
  element,
  isEdit,
  handleUploadMedia,
}: BoxMediaProps) {
  return (
    <div className="story-image py-4">
      <div className="title flex items-center justify-between">
        <h4 className="text-[17px] font-bold pb-2 capitalize">{title}</h4>
        {isEdit ? (
          <button
            className="text-custom-color"
            onClick={() =>
              handleUploadMedia(title === "video" ? "video" : "img")
            }
          >
            <i className="fas fa-upload"></i>
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="">{element}</div>
    </div>
  );
}
