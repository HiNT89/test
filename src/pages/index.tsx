"use client";
import { SimpleCtx } from "@/components/common/auth";
import { logout } from "@/firebase";
import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { S3 } from "aws-sdk";
import Image from "next/image";
const s3 = new S3({
  accessKeyId: "AKIA3S75Q7FFBQV6KWAL",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});
export default function Home() {
  const userContext = useContext(SimpleCtx);
  const handleLogout = () => {
    logout().then(() => {
      userContext?.setValue({ uid: "" });
    });
  };

  return (
    <main className="flex flex-col items-center">
      <h1 className="capitalize mt-5">wellcom to hellojob</h1>
      <div className="w-full h-[70vh] flex justify-center items-center">
        <img src="./logo.png" alt="" className="w-[50vw]" />
      </div>
      <button onClick={handleLogout} className="border p-4 rounded-lg w-[50vw] bg-blue-500 uppercase">signout</button> <br />
    </main>
  );
}
