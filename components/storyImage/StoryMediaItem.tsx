import React, { useCallback, useRef, useState } from "react";
const StoryMediaItem = ({
  src,
  title,
  isEdit,
  id,
  onChangeMedia,
  handleOnChangeFile,
}: {
  id: number;
  src: string;
  title: string;
  isEdit: boolean;
  handleOnChangeFile: (newFile: File, id: number, type: string) => void;
  onChangeMedia: (newSrc: string, id: number, type: string) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stop, setStop] = useState(false);

  const handleVideo = useCallback(() => {
    setStop(!stop);
    if (videoRef.current !== null) {
      if (stop === true && videoRef !== null) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  }, [videoRef.current, stop]);
  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    handleOnChangeFile(
      event.target.files![0],
      id,
      title === "video" ? "video" : "img"
    );
    if (selectedFiles?.[0]) {
      const newSrc = URL.createObjectURL(selectedFiles?.[0]);
      onChangeMedia(newSrc, id, title === "video" ? "video" : "img");
    }
  };
  return (
    <div className="item text-center">
      <div className="flex justify-center relative border rounded-lg">
        {title === "video" ? (
          <video ref={videoRef} className="w-[107px] h-[107px]">
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <img
            src={src}
            className="rounded-lg"
            alt=""
            style={{
              height: "107px",
              objectFit: "cover",
            }}
          />
        )}
        {isEdit ? (
          <label
            htmlFor={`dropzone-file-${title}-${id}`}
            className="absolute top-2 right-2 bg-custom-color text-[#ffffff] w-[28px] h-[28px] rounded-lg border border-[#ffffff]"
          >
            <i className="fa-solid fa-plus"></i>
            <input
              type="file"
              id={`dropzone-file-${title}-${id}`}
              className="hidden"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                handleOnchange(event)
              }
            />
          </label>
        ) : (
          ""
        )}
        {title === "video" && !isEdit ? (
          <button
            className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-white"
            onClick={handleVideo}
          >
            {stop ? (
              <i className="fas fa-pause"></i>
            ) : (
              <i className="fas fa-play"></i>
            )}
          </button>
        ) : (
          ""
        )}
      </div>

      <p className="text-[13px] font-bold pt-2 capitalize">
        {title} Công ty {id + 1}
      </p>
    </div>
  );
};

export default StoryMediaItem;
