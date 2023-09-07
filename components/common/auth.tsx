"use client";
import { auth, getDataDocument, getDocument } from "@/firebase";
import { useRouter } from "next/router";
import React, { useEffect, createContext, useState } from "react";
import { Loading } from "./loading";
import { getCookie, setCookie } from "cookies-next";
export interface AuthProps {
  children: React.ReactElement;
}
interface AppContextInterface {
  value: any;
  setValue: (newValue: any) => void;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
}
export const SimpleCtx = createContext<AppContextInterface | null>(null);

export function Auth({ children }: AuthProps) {
  const router = useRouter();
  const [value, setValue] = useState({ uid: "", accessToken: "" });
  const [isLoading, setIsLoading] = useState(false);
  // useEffect(() => {
  //   const uidCookies = getCookie("uid_firebase");
  //   if (uidCookies) {
  //     setValue({ uid: uidCookies, accessToken: "" });
  //     // auth.getUser(uid);
  //   }
  // }, []);
  // useEffect(() => {
  //   if (!value?.uid) {
  //     router.push("/register");
  //   } else {
  //     setCookie("uid_firebase", value?.uid, {
  //       maxAge: 60 * 60,
  //     });

  //     getDocument("profiles").then((data) => {
  //       const listProfilesID = data.map((it: any) => it.id);
  //       const a = value?.uid;
  //       listProfilesID.includes(a)
  //         ? router.push("/profile")
  //         : router.push("/register/vi01");
  //     });
  //   }
  // }, [value]);
  console.log("user =>>>", value);
  if (isLoading) return <Loading />;
  return (
    <SimpleCtx.Provider
      value={{
        value,
        setValue,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </SimpleCtx.Provider>
  );
}
