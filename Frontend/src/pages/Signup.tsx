import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="lg:col-span-1 flex justify-center items-center">
        <Auth type={"signup"} />
      </div>
      <div className="lg:col-span-1 hidden lg:flex justify-center items-center">
        <Quote />
      </div>
    </div>
  );
};
