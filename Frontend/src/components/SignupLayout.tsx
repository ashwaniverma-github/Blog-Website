import { Link } from "react-router-dom";
import { LabelledInput } from "./sm-components/LabelledInput";
import { useState } from "react";
import { SignupInput } from "ashwani-medium-common";

export const SignupLayout = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
  });

  return (
    <div className="flex flex-col h-screen justify-center items-center ">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center">
          <h1 className="font-extrabold text-3xl mb-4">Create an account</h1>
          <h2 className="text-gray-500">
            Already have an account?{" "}
            <Link className="underline" to={"/signin"}>
              Login
            </Link>
          </h2>
        </div>
        <div className="flex flex-col space-y-4 mt-4">
          <LabelledInput
            label={"Name"}
            placeholder={"Enter Name"}
            type={"text"}
            onChange={(e) =>
              setPostInput((c) => ({ ...c, name: e.target.value }))
            }
          />
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
        </div>
      </div>
    </div>
  );
};
