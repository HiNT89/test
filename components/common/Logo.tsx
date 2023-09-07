import { IconLanguage, IconLogo } from "@/assets/icon";
import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Arrow from "@/assets/icon/Arrow";
import { languageFlags, locales } from "@/i18n/i18n";
const Logo = () => {
  const { i18n } = useTranslation();
  const currentLanguage = locales[i18n.language as keyof typeof locales];
  const flagsLanguage =
    languageFlags[i18n.language as keyof typeof languageFlags];
  console.log(currentLanguage);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const changeLanguage = (lng: any) => {
    i18n.changeLanguage(lng);
  };
  return (
    <div className="flex justify-center relative pt-5 pb-[30px] border-b border-[#E5E5E5] mb-8">
      <IconLogo></IconLogo>
      <div className="absolute right-0 top-[20px]">
        <button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {/* flex items-center gap-2 text-[#9B999A] text-[10px] bg-custom-color-bg border border-[#E4E4E4] rounded-md p-2 mb-2 */}
          <div className="">
            <img src={flagsLanguage} alt="" className="rounded-md w-[50px]" />
            {/* <span className="">{currentLanguage}</span> */}
          </div>
        </button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              changeLanguage("en");
            }}
          >
            <div className="flex items-center gap-2">
              <img src={languageFlags["en"]} alt="" className="w-[20px]" />
              <span className="text-[10px]">{locales["en"]}</span>
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              changeLanguage("jb");
            }}
          >
            <div className="flex items-center gap-2">
              <img src={languageFlags["jb"]} alt="" className="w-[20px]" />
              <span className="text-[10px]">{locales["jb"]}</span>
            </div>
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              changeLanguage("vi");
            }}
          >
            <div className="flex items-center gap-2">
              <img src={languageFlags["vi"]} alt="" className="w-[20px]" />
              <span className="text-[10px]">{locales["vi"]}</span>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Logo;
