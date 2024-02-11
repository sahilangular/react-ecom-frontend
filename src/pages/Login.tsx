import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import { useLoginMutation } from "../redux/api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { messageRespose } from "../types/api-types";

const Login = () => {
  const [gender, setGender] = useState<string | any>();
  const [date, setDate] = useState<string | any>();

  const [login] = useLoginMutation();

  const loginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider)
      const res = await login({
        name: user.displayName!,
        email: user.email!,
        photo: user.photoURL!,
        gender,
        role: "user",
        dob: date,
        _id: user.uid,
      });

      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = error.data as messageRespose;
        toast.error(message.message);
      }
    } catch (error) {
      toast.error("Signin Fail");
    }
  };

  return (
    <div className="login">
      <main>
        <h1 className="heading">Login</h1>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option>Select Gender</option>
            <option value={"male"}>male</option>
            <option value={"female"}>female</option>
          </select>
        </div>
        <div>
          <label>Date Of Birth</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <p>Already sign in once</p>
          <button onClick={loginHandler}>
            <FcGoogle />
            <span>Sign in with google</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
