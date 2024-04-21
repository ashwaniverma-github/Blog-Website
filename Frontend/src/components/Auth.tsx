import { Link, Navigate, json, useNavigate } from "react-router-dom";
import { LabelledInput } from "./sm-components/LabelledInput";
import { useState } from "react";
import { SignupInput } from "ashwani-medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate()
  const [postInput, setPostInput] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  async function sendRequest(){
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInput);
      const jwt = response.data
      localStorage.setItem('token',jwt)
      navigate("/blogs")
    }
    catch(e){

    }
  }
  
  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          <h1 className="font-extrabold text-3xl mb-4">{type==="signup"?"Create an account":"Please Login"}</h1>
          <h2 className="text-gray-500">
            {type==="signin"?"Don't have an account ?":"Already have an account ?"}
            <Link className="underline px-2" to={type=== "signup"?"/signin":"/signup"}>
              {type==="signup"?"Login":"Sign up"}
            </Link>
          </h2>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          {type==="signup"? <LabelledInput
            label={"Name"}
            placeholder={"Enter Name"}
            type={"text"}
            onChange={(e) =>
              setPostInput((postInput) => ({ ...postInput, name: e.target.value }))
            }
          />:null}
          <LabelledInput
            label={"Email"}
            placeholder={"Enter your email"}
            type={"text"}
            onChange={(e) =>
              setPostInput((c) => ({ ...c, email: e.target.value }))
            }
          />
          <LabelledInput
            label={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
            onChange={(e) =>
              setPostInput((c) => ({ ...c, password: e.target.value }))
            }
          />
          <button onClick={sendRequest}type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> {type === "signup"?"Sign up":"Sign in"}</button>
        </div>
      </div>
    </div>
  );
};
