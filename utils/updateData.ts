import { S3 } from "aws-sdk";
const s3 = new S3({
  accessKeyId: "AKIA3S75Q7FFBQV6KWAL",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});
export const updateMedia = async (
  file: (File | null)[],
  dataMedia: string[] | [],
  indexs: number[],
) => {
  const paramsArray = file.map((it) => ({
    Bucket: "hellojob3",
    Key: it === null ? "" : it.name,
    Body: it === null ? "" : it,
  }));
  const a = paramsArray.map((x) => {
    const upload = s3.upload(x);
    return upload.promise().then((url) => url.Location);
  });
  const values = await Promise.all(a).then((data) => {
    const a = dataMedia;
    indexs.forEach((i, index) => {
      a[i] = data[index];
    });
    return a;
  });
  return values;
};
export const uploadAvatar = async (file: File) => {
  let value = "";
  const upload = s3.upload({
    Bucket: "hellojob3",
    Key: file.name,
    Body: file,
  });
  await upload.promise().then((url) => (value = url.Location));
  return value;
};
