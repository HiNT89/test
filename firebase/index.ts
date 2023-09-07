import { ResponseAreasItem } from "@/models/api";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getCookies, getCookie, setCookie, deleteCookie } from "cookies-next";
const firebaseConfig = {
  apiKey: "AIzaSyDeioOFxXNKWyulheKOpbHczqX8TcfnKX8",
  authDomain: "test-2c5be.firebaseapp.com",
  projectId: "test-2c5be",
  storageBucket: "test-2c5be.appspot.com",
  messagingSenderId: "971973288979",
  appId: "1:971973288979:web:13fd357545ce28030f4be6",
  measurementId: "G-Z5839F03DE",
  // apiKey: "AIzaSyDtA6aZhhZAPbsipzsUDBEgSpd3X8tyVbQ",
  // authDomain: "hellojob-8aaa9.firebaseapp.com",
  // projectId: "hellojob-8aaa9",
  // storageBucket: "hellojob-8aaa9.appspot.com",
  // messagingSenderId: "446501025540",
  // appId: "1:446501025540:web:aa0f9e98bff63c95290251",
  // measurementId: "G-KW9R45HPC6",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// -----------------
const handleSendCode = async (phoneNumber: string) => {
  const applicationVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
  );
  let isSendSuccess = false;
  await signInWithPhoneNumber(auth, phoneNumber, applicationVerifier)
    .then((confirmationResult: any) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      (window as any).confirmationResult = confirmationResult;
      // console.log("send SMS", confirmationResult);
      isSendSuccess = true;

      // ...
    })
    .catch((error: any) => {
      // Error; SMS not sent
      // ...
      console.log(error);
    });
  return isSendSuccess;
};
const handleVerificationCode = async (verificationCode: string) => {
  const code = verificationCode;

  let dataUser;
  await (window as any).confirmationResult
    ?.confirm(code)
    .then((result: any) => {
      const user = result.user;
      dataUser = user;
      console.log("User signed in successfully", user);
      // ...
    })
    .catch((error: any) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  return dataUser;
};
/// get data
const getDataAreas = async () => {
  const dataAreas: Array<ResponseAreasItem> = [];
  try {
    // const docRef = doc(db, "dataMasters", "areas");
    const docRef = doc(db, "dataMasters", "areas");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { data } = docSnap.data();
      // console.log("Document data:", data);
      await data.forEach((element: ResponseAreasItem) => {
        dataAreas.push(element);
      });
    }
  } catch (err: any) {
    console.log(err);
  }
  return dataAreas;
};
const getDataDocument = async (data: string, document?: string) => {
  const dcm = document ?? "dataRegisters";
  const dataResponse: any = [];
  try {
    // const docRef = doc(db, "dataMasters", "areas");
    const docRef = doc(db, dcm, data);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      if (dcm === "dataRegisters") {
        const { data } = docSnap.data();
        // console.log("Document data:", data);
        await data.forEach((element: any) => {
          dataResponse.push(element);
        });
      } else {
        const data = docSnap.data();
        dataResponse.push(data);
      }
    }
  } catch (err: any) {
    console.log(err);
  }
  return dataResponse;
};
const getDocument = async (document: string) => {
  const dataResponse: any = [];
  try {
    const querySnapshot = await getDocs(collection(db, document));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const id = doc.id;
      dataResponse.push({ id, ...data });
    });
  } catch (e) {
    console.log(e);
  }
  return dataResponse;
};
// add data
export interface DataPayload {
  area: string;
  charterCapital: string;
  certificates: string[];
  images: string[];
  information: {
    email: string;
    gmail: string;
    facebook: string;
    line: string;
    phoneNumber: string[];
    website: string;
    zalo: string;
  };
  license: string[];
  merit: string[];
  companyName: string;
  avatar: string;
  profits: {
    profit: number;
    year: number;
  }[];
  revenues: {
    revenue: number;
    year: number;
  }[];
  staff: string;
  statusProfile: boolean;
  typeOfLabor: [] | null;
  typeOfLaborTarget: [];
  videos: string[];
  dateContact: string;
}
const addData = async ({ id, data }: { id: string; data: DataPayload }) => {
  let status = false;

  try {
    const profileRef = doc(db, "profiles", id);
    await setDoc(profileRef, data);
    status = true;
  } catch (e) {
    console.log(e);
  }
  return status;
};
// update data
const dataPayload = {
  area: "",
  charterCapital: "",
  certificates: [],
  images: [],
  information: {
    gmail: "",
    facebook: "",
    line: "",
    phoneNumber: [],
    website: "",
    zalo: "",
    email: "",
  },
  avatar: "",
  license: [],
  merit: [],
  companyName: "",
  profits: [],
  revenues: [],
  staff: "",
  statusProfile: "",
  typeOfLabor: "",
  typeOfLaborTarget: "",
  videos: [],
  dateContact: "",
};
const updateData = async ({
  id,
  data,
}: {
  id: string;
  data: { key: string; value: any };
}) => {
  let status = false;
  const keys = Object.keys(dataPayload);
  if (!keys.includes(data.key)) return status;
  try {
    const profileRef = doc(db, "profiles", id);
    await updateDoc(profileRef, { [data.key]: data.value });
    status = true;
  } catch (e) {
    console.log(e);
  }
  return status;
};
//
const loginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  let dataUser;
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      dataUser = user;

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {});
  return dataUser;
};
const logout = () => signOut(auth);
const uploadMedia = async (file: any, fileName: string) => {
  const storageRef = ref(storage, `${fileName}`);
  // Create file metadata including the content type
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };
  // Upload the file and metadata
  await uploadBytesResumable(storageRef, file, metadata);
  return getDownloadURL(storageRef);
};
export {
  auth,
  db,
  app,
  firebaseConfig,
  handleSendCode,
  handleVerificationCode,
  getDataAreas,
  addData,
  updateData,
  getDataDocument,
  loginGoogle,
  logout,
  getDocument,
  uploadMedia,
};
