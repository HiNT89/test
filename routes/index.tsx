import RegisterCompanyVertical from "@/components/register/RegisterCompanyVertical";
import RegisterCompanyVi01 from "@/components/register/RegisterCompanyVi01";
import RegisterCompanyVi05 from "@/components/register/RegisterCompanyVi05";
import RegisterCompanyVi06 from "@/components/register/RegisterCompanyVi06";
import RegisterCompanyVi07 from "@/components/register/RegisterCompanyVi07";
import RegisterCompanyVi08 from "@/components/register/RegisterCompanyVi08";
import RegisterCompanyVi09 from "@/components/register/RegisterCompanyVi09";
import RegisterCompanyVi10 from "@/components/register/RegisterCompanyVi10";
import RegisterCompanyVi11 from "@/components/register/RegisterCompanyVi11";
import RegisterCompanyVi12 from "@/components/register/RegisterCompanyVi12";
import RegisterCompanyVi02 from "@/components/register/RegisterCompanyVi02";
export const ROUTES = [
  {
    path: "vertical",
    element: <RegisterCompanyVertical />,
  },
  {
    path: "vi01",
    element: <RegisterCompanyVi01 />,
  },
  {
    path: "vi02notyet",
    element: (
      <RegisterCompanyVi02 headingTile="hiện tại, Bạn quan tâm đến loại hình lao động nước ngoài nào?" />
    ),
  },
  {
    path: "vi02already",
    element: (
      <RegisterCompanyVi02 headingTile="BẠN ĐÃ từng dùng loại hình lao động nào?" />
    ),
  },
  {
    path: "vi12",
    element: <RegisterCompanyVi12 />,
  },
  {
    path: "vi05",
    element: <RegisterCompanyVi05 />,
  },
  {
    path: "vi06",
    element: <RegisterCompanyVi06 />,
  },
  {
    path: "vi07",
    element: <RegisterCompanyVi07 />,
  },
  {
    path: "vi08",
    element: <RegisterCompanyVi08 />,
  },
  {
    path: "vi11",
    element: <RegisterCompanyVi11 />,
  },
  {
    path: "vi09",
    element: <RegisterCompanyVi09 />,
  },
  {
    path: "vi10",
    element: <RegisterCompanyVi10 />,
  },
];
