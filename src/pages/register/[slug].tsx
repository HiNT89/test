"use client";
import { useRouter } from "next/router";
import { ROUTES } from "@/routes";
export default function Page() {
  const router = useRouter();
  const route = ROUTES.filter((it) => it.path === router.query.slug)[0];
  return <main>{route?.element}</main>;
}
