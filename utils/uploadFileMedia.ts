import { S3 } from "aws-sdk";
const s3 = new S3({
  accessKeyId: "AKIA3S75Q7FFBQV6KWAL",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});
import { MouseEventHandler, useState } from "react";

const useUpload = (file: File[]) => {
  const handleUpload = async () => {
    let res: string[] | false = false;
    const paramsArray = file.map((it) => ({
      Bucket: "hellojob3",
      Key: it.name,
      Body: it,
    }));
    const a = paramsArray.map((x) => {
      const upload = s3.upload(x);
      return upload.promise().then((url) => url.Location);
    });
    Promise.all(a).then((data) => (res = data));
    return res;
  };
  return handleUpload;
};

export default useUpload;
