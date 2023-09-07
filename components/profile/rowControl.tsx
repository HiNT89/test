import * as React from "react";
import Image from "next/image";
import Switch, { SwitchProps } from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useTranslation } from "react-i18next";
import { languageFlags, locales } from "@/i18n/i18n";
import FormControlLabel from "@mui/material/FormControlLabel";
export interface RowControlProps {
  isEdit: boolean;
  toggle: () => void;
}
export function RowControl({ isEdit, toggle }: RowControlProps) {
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
  const IOSSwitch = styled((props: SwitchProps) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  ))(({ theme }) => ({
    width: 59,
    height: 28,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(29px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          backgroundColor:
            theme.palette.mode === "dark" ? "#0D8DC8" : "#F2B92A",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#000",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.mode === "light" ? "#0D8DC8" : "#0D8DC8",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: theme.palette.mode === "light" ? "#0D8DC8" : "#0D8DC8",
      opacity: 1,
      transition: theme.transitions.create(["background-color"], {
        duration: 500,
      }),
    },
  }));
  return (
    <div className="flex px-4 gap-2 py-2 items-center">
      {/* toggle */}
      <div className="w-14 relative flex items-center">
        <FormControlLabel
          control={<IOSSwitch sx={{ m: 1 }} defaultChecked={isEdit} />}
          label=""
          checked={isEdit}
          onChange={toggle}
          sx={{
            width: "100%",
            transition: "all .3s",
          }}
        />
        <div
          className={`absolute top-[13px]  text-white text-[11px] capitalize transition ${
            !isEdit ? "right-4" : "left-1"
          }`}
          onClick={toggle}
        >
          {isEdit ? "sửa" : "xem"}
        </div>
      </div>
      <div className="flex flex-row basis-1/2 grow gap-2">
        <button className="py-2  border rounded-lg bg-gradient-to-r from-[#EF8720] to-[#F2B92A] shadow-custom-2 text-white h-[40px] text-custom-fontsize basis-1/2">
          Tải hồ sơ
        </button>
        <button className="py-2  border rounded-lg bg-white shadow-custom-2 text-custom-fontsize text-[#0D8DC8] basis-1/2 h-[40px]">
          Chia sẻ
        </button>
      </div>
      <div className="w-14 flex items-center">
        <button
          id="fade-button"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          {/* flex items-center gap-2 text-[#9B999A] text-[10px] bg-custom-color-bg border border-[#E4E4E4] rounded-md p-2 mb-2 */}
          <div className="">
            <img src={flagsLanguage} alt="" className="rounded-md" />
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
}
