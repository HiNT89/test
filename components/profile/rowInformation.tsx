import * as React from "react";

export interface IAppProps {
  title: string;
  valueInput: string | string[];
  isEdit: boolean | null;
  children?: React.ReactNode;
  elementTitle?: React.ReactElement;
}

export function RowInformation({
  isEdit,
  title,
  valueInput,
  children,
  elementTitle,
}: IAppProps) {
  if (isEdit === null)
    return (
      <div className="grid grid-cols-[164px,1fr] border-t-custom capitalize">
        <div className="bg-[#F1F1F5] text-custom-fontsize font-medium flex items-center p-2 overflow-hidden">
          {title}
        </div>
        <div className="text-custom-fontsize flex items-center p-2 gap-2 overflow-hidden">
          {valueInput}
          {children ? children : ""}
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-[164px,1fr] border-t-custom">
      {elementTitle ? (
        elementTitle
      ) : (
        <div className="bg-[#F1F1F5] text-custom-fontsize font-medium flex items-center p-2 capitalize overflow-hidden">
          {title}
        </div>
      )}

      {isEdit ? (
        children
      ) : (
        <div className="text-custom-fontsize flex items-center p-2 overflow-hidden">
          {valueInput}
        </div>
      )}
    </div>
  );
}
