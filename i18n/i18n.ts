import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import R_VI from "../locales/vi/Register.json"
import RCV_VI from "../locales/vi/RegisterCompanyVertical.json"
import RCV01_VI from "../locales/vi/RegisterCompanyVi01.json"
import RCV02_VI from "../locales/vi/RegisterCompanyVi02.json"
import RCV05_VI from "../locales/vi/RegisterCompanyVi05.json"
import RCV06_VI from "../locales/vi/RegisterCompanyVi06.json"
import RCV07_VI from "../locales/vi/RegisterCompanyVi07.json"
import RCV08_VI from "../locales/vi/RegisterCompanyVi08.json"
import RCV09_VI from "../locales/vi/RegisterCompanyVi09.json"
import RCV10_VI from "../locales/vi/RegisterCompanyVi10.json"
import RCV11_VI from "../locales/vi/RegisterCompanyVi11.json"
import RCV12_VI from "../locales/vi/RegisterCompanyVi12.json"
import FOM_VI from "../locales/vi/Findoutmore.json"


import R_JB from "../locales/jb/Register.json"
import RCV_JB from "../locales/jb/RegisterCompanyVertical.json"
import RCV01_JB from "../locales/jb/RegisterCompanyVi01.json"
import RCV02_JB from "../locales/jb/RegisterCompanyVi02.json"
import RCV05_JB from "../locales/jb/RegisterCompanyVi05.json"
import RCV06_JB from "../locales/jb/RegisterCompanyVi06.json"
import RCV07_JB from "../locales/jb/RegisterCompanyVi07.json"
import RCV08_JB from "../locales/jb/RegisterCompanyVi08.json"
import RCV09_JB from "../locales/jb/RegisterCompanyVi09.json"
import RCV10_JB from "../locales/jb/RegisterCompanyVi10.json"
import RCV11_JB from "../locales/jb/RegisterCompanyVi11.json"
import RCV12_JB from "../locales/jb/RegisterCompanyVi12.json"
import FOM_JB from "../locales/jb/Findoutmore.json"



import R_EN from "../locales/en/Register.json"
import RCV_EN from "../locales/en/RegisterCompanyVertical.json"
import RCV01_EN from "../locales/en/RegisterCompanyVi01.json"
import RCV02_EN from "../locales/en/RegisterCompanyVi02.json"
import RCV05_EN from "../locales/en/RegisterCompanyVi05.json"
import RCV06_EN from "../locales/en/RegisterCompanyVi06.json"
import RCV07_EN from "../locales/en/RegisterCompanyVi07.json"
import RCV08_EN from "../locales/en/RegisterCompanyVi08.json"
import RCV09_EN from "../locales/en/RegisterCompanyVi09.json"
import RCV10_EN from "../locales/en/RegisterCompanyVi10.json"
import RCV11_EN from "../locales/en/RegisterCompanyVi11.json"
import RCV12_EN from "../locales/en/RegisterCompanyVi12.json"
import FOM_EN from "../locales/en/Findoutmore.json"

export const locales = {
    en: "English",
    jb: "Janpan",
    vi: "Vietnamese"
}
export const languageFlags = {
    en: "https://cdn.conveythis.com/images/flags/v3/rectangular/R04.png",
    jb: "https://cdn.conveythis.com/images/flags/v3/rectangular/4YX.png",
    vi: "https://cdn.conveythis.com/images/flags/v3/rectangular/l2A.png",
};
export const resources = {
    vi: {
        r: R_VI,
        rcv: RCV_VI,
        rcv01: RCV01_VI,
        rcv02: RCV02_VI,
        rcv05: RCV05_VI,
        rcv06: RCV06_VI,
        rcv07: RCV07_VI,
        rcv08: RCV08_VI,
        rcv09: RCV09_VI,
        rcv10: RCV10_VI,
        rcv11: RCV11_VI,
        rcv12: RCV12_VI,
        fom: FOM_VI
    },
    jb: {
        r: R_JB,
        rcv: RCV_JB,
        rcv01: RCV01_JB,
        rcv02: RCV02_JB,
        rcv05: RCV05_JB,
        rcv06: RCV06_JB,
        rcv07: RCV07_JB,
        rcv08: RCV08_JB,
        rcv09: RCV09_JB,
        rcv10: RCV10_JB,
        rcv11: RCV11_JB,
        rcv12: RCV12_JB,
        fom: FOM_JB
    },
    en: {
        r: R_EN,
        rcv: RCV_EN,
        rcv01: RCV01_EN,
        rcv02: RCV02_EN,
        rcv05: RCV05_EN,
        rcv06: RCV06_EN,
        rcv07: RCV07_EN,
        rcv08: RCV08_EN,
        rcv09: RCV09_EN,
        rcv10: RCV10_EN,
        rcv11: RCV11_EN,
        rcv12: RCV12_EN,
        fom: FOM_EN
    }
};
export const defaultNS = 'r'
i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "vi",
        fallbackLng: 'vi',
        ns: ["r", "rcv", "rcv01", "rcv02", "rcv05", "rcv06", "rcv07", "rcv08", "rcv09", "rcv10", "rcv11", "rcv12", "fom"],
        defaultNS,
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;