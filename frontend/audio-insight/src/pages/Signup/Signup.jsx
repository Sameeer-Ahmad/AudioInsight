import { cn } from "../../utils/cn";
import { Label } from "./layout";
import { Input } from "./Input";
import { useState } from "react";
import { API } from "../../backend-API/api";
import axios from "axios";
import { BackgroundBeams } from "../../utils/bg-beams";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    const payload = {
      username,
      email,
      password,
    };
    axios
      .post(`${API}/user/signup`, payload)
      .then((res) => {
        // console.log(res.data);
        toast.success("Successfully created an account!");
        navigate("/login")
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error creating an account!");
      });
  };
  return (
    <div className="antialiased min-h-screen flex justify-center items-center">
      <div>
        <Toaster />
      </div>
      <div className="max-w-md w-full mx-auto p-4 md:p-8 shadow-input bg-white dark:bg-black rounded-lg">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Audio Insight
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Get started with an account to get access to all the features.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Username</Label>
              <Input
                id="firstname"
                placeholder="Tyler"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="twitterpassword">Confirm password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600  dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium hover:bg-black"
            type="submit"
            //  style={{ backgroundImage: `url(${BackgroundBeams})` }}
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          <div className="flex justify-center pt-8">
            <p className="p-2 ">Already have an account?</p>
         <Link to={"/login"}>
         <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-[7rem] text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] hover:shadow-[0px_1px_0px_0px_#ffffff80_inset,0px_-1px_0px_0px_#ffffff80_inset] dark:hover:shadow-[0px_1px_0px_0px_var(--slate-100)_inset,0px_-1px_0px_0px_var(--slate-500)_inset] hover:shadow-input"
            type="submit"
          >
            Log in 
            <BottomGradient />
          </button>
         </Link>
          </div>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
      {/* <BackgroundBeams/> */}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
