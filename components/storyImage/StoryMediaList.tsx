import React, { useCallback } from "react";
import StoryMediaItem from "./StoryMediaItem";
interface StoryMediaListProps {
  list: string[] | [];
  title: string;
  isEdit: boolean;
  handleOnChangeFile: (newFile: File, id: number, type: string) => void;
  onChangeMedia: (newSrc: string, id: number, type: string) => void;
}
const StoryMediaList = ({
  title,
  list,
  isEdit,
  handleOnChangeFile,
  onChangeMedia,

}: StoryMediaListProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {list.map((x: string, index) => (
        <StoryMediaItem
          key={index}
          id={index}
          src={x}
          title={title}
          isEdit={isEdit}
          handleOnChangeFile={handleOnChangeFile}
          onChangeMedia={onChangeMedia}
        />
      ))}
    </div>
  );
};

export default StoryMediaList;
