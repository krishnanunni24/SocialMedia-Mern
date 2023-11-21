import React, { useEffect, useRef, useState } from "react";
import FormHeader from "./FormHeader";
import SubmitButton from "./SubmitButton";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logIn, signUp } from "../../../actions/AuthActions";
import LoginWithGoogle from "../googleLogin/LoginWithGoogle";
import { GenerateOtp } from "../../../api/AuthRequests";
import OtpInput from "../otp/OtpInput";

function AuthForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [showpass, setShowPass] = useState(false);
  const [showConfpass, setShowConfPass] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [googleData, setGoogleData] = useState(null);
  const [signUpData, setSignUpData] = useState(null);
  const [phoneNo,setPhoneNo]=useState(null)
  const password = useRef({});
  const auth = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [otpVerify, setOtpVerify] = useState(false);
  const authLoading = useSelector((state) => state.authReducer.loading);

  password.current = watch("password", "");


  useEffect(() => {
    reset(); // Reset the form on component mount
  }, [reset]);

  // useEffect(() => {
  //   dispatch({ type: "AUTH_START" });
  //   reset();
  // }, []);

  // useEffect(() => {
  //   dispatch({ type: "AUTH_START" });
  // }, [isSignUp]);

  // useEffect(()=>{
  //   setGoogleData(null)
  // },[auth.authFail])
 
  const onFormSubmit = (data) => {
    console.log("working");
    if (isSignUp) {
     
      dispatch(signUp(signUpData, navigate));
    } else {
      console.log("login dispatched", data);
      dispatch(logIn(data, navigate));
    }
  };

  const onDataSubmit =async (data) => {
    console.log(data)
    setPhoneNo(data.phone)
    if (googleData) {
      data.googleData = googleData;
    }
    setSignUpData(data);
    console.log("phone no :",data.phone)
    const response= await GenerateOtp(data.phone)
    console.log(response)  
    setOtpVerify(true)
  };
  
  return (
    <>
    {otpVerify ? (
      <div className="w-full rounded bg-white px-2 py-6 shadow-lg sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
        <OtpInput phone={phoneNo} onSubmit={onFormSubmit}/>
      </div>
    ) : (    
    <div className="w-full rounded bg-white px-2 py-6 shadow-lg sm:px-6 sm:py-10 md:w-1/2 lg:w-5/12 lg:px-10 xl:w-1/3">
      <FormHeader reset={reset} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />

      {(!isSignUp || !googleData) && (
        <LoginWithGoogle
          setGoogleData={setGoogleData}
          isSignUp={isSignUp}
          onFormSubmit={onFormSubmit}
          loading={authLoading}
        />
      )}

      <form onSubmit={isSignUp ? handleSubmit(onDataSubmit) :handleSubmit(onFormSubmit)} className="mt-5">
        {isSignUp && (
          <>
            {!googleData && (
              <div className="flex flex-row">
                <div className="mx-1 w-1/2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    aria-labelledby="name"
                    name="name"
                    {...register("name", {
                      required: "name is required",
                      maxLength: {
                        value: 15,
                        message: "Name must be at most 15 characters",
                      },
                    })}
                    type="text"
                    className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-400"
                    placeholder="e.g:John Doe"
                  />
                  {errors.name && (
                    <p className="text-xs italic text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="mx-1 w-1/2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none text-gray-800"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    aria-labelledby="email"
                    name="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Email must be Valid!",
                      },
                    })}
                    type="email"
                    className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3  text-xs font-medium leading-none text-gray-800 placeholder-gray-400"
                    placeholder="e.g: johnDoe@gmail.com"
                  />
                  {auth.emailExists && (
                    <p className="text-xs italic text-red-500">
                      Email ID Already registered!
                    </p>
                  )}
                  {errors.email && (
                    <p className="text-xs italic text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            <div
              className={`mt-3 flex ${
                googleData ? "flex-col gap-2" : "flex-row"
              }`}
            >
              <div className={`mx-1 ${googleData ? "flex-1" : "w-1/2"}`}>
                <label
                  htmlFor="username"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Username
                </label>
                <input
                  id="username"
                  aria-labelledby="username"
                  name="username"
                  {...register("username", {
                    required: "username is required",
                    maxLength: {
                      value: 15,
                      message: "username should be maximum of 15 characters",
                    },
                    minLength: {
                      value: 5,
                      message: "username should contain atleast 6 characters",
                    },
                  })}
                  type="text"
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-400"
                  placeholder="e.g: John24"
                />
                {auth.usernameExists && (
                  <p className="text-xs italic text-red-500">
                    Username Already exists!
                  </p>
                )}
                {errors.username && (
                  <p className="text-xs italic text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mx-1 flex-1">
                <label
                  htmlFor="Phone"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  aria-labelledby="username"
                  name="phone"
                  {...register("phone", {
                    required: "phone no is required",
                    pattern: {
                      value: /^\d{10}$/i,
                      message: "phone no should be valid",
                    },
                  })}
                  type="number"
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800 placeholder-gray-400"
                  placeholder="phone no"
                />
                {auth.phoneExists && (
                  <p className="text-xs italic text-red-500">
                    Phone No Already registered!
                  </p>
                )}
                {errors.phone && (
                  <p className="text-xs italic text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {!isSignUp && (
          <div className="mx-1">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              aria-labelledby="email"
              name="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Email must be Valid!",
                },
              })}
              type="email"
              className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3  text-xs font-medium leading-none text-gray-800 placeholder-gray-400"
              placeholder="e.g: johnDoe@gmail.com"
            />
            {auth.emailExists && (
              <p className="text-xs italic text-red-500">
                Email ID Already registered!
              </p>
            )}
            {errors.email && (
              <p className="text-xs italic text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        )}

        {(!googleData || !isSignUp) && (
          <>
            <div className="mt-3 w-full">
              <label
                htmlFor="myInput"
                className="text-sm font-medium leading-none text-gray-800"
              >
                Password
              </label>
              <div className="relative flex items-center justify-center">
                <input
                  id="myInput"
                  type={showpass ? "text" : "password"}
                  name="password"
                  {...register("password", {
                    required: "password is required",
                    maxLength: {
                      value: 15,
                      message: "password should be maximum of 15 characters",
                    },
                    minLength: {
                      value: 8,
                      message: "password should contain atleast 8 characters",
                    },
                    ...(isSignUp && {
                      pattern: {
                        value:
                          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                        message:
                          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
                      },
                    }),
                  })}
                  className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800"
                />

                <div
                  onClick={() => setShowPass(!showpass)}
                  className="absolute right-0 mr-3 mt-2 cursor-pointer"
                >
                  <div id="show">
                    <svg
                      width={16}
                      height={16}
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                        fill="#71717A"
                      />
                    </svg>
                  </div>
                  <div id="hide" className="hidden">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-eye-off"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#27272A"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <line x1={3} y1={3} x2={21} y2={21} />
                      <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                      <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {errors.password && (
              <p className="text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}
            {isSignUp && (
              <div className="mt-3 w-full">
                <label
                  htmlFor="myInput"
                  className="text-sm font-medium leading-none text-gray-800"
                >
                  Confirm Password
                </label>
                <div className="relative flex items-center justify-center">
                  <input
                    id="myInput"
                    type={showConfpass ? "text" : "password"}
                    name="confirmpassword"
                    {...register("confirmpassword", {
                      required: "confirm Password is required",
                      validate: (value) =>
                        value === password.current ||
                        "The passwords do not match",
                    })}
                    className="mt-2 w-full rounded border bg-gray-200 py-3 pl-3 text-xs font-medium leading-none text-gray-800"
                  />
                  <div
                    onClick={() => setShowConfPass(!showConfpass)}
                    className="absolute right-0 mr-3 mt-2 cursor-pointer"
                  >
                    <div id="show">
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                          fill="#71717A"
                        />
                      </svg>
                    </div>
                    <div id="hide" className="hidden">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-eye-off"
                        width={16}
                        height={16}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#27272A"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <line x1={3} y1={3} x2={21} y2={21} />
                        <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                        <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                      </svg>
                    </div>
                  </div>
                </div>
                {errors.confirmpassword && (
                  <p className="text-xs italic text-red-500">
                    {errors.confirmpassword.message}
                  </p>
                )}
              </div>
            )}
          </>
        )}
        {isSignUp ? (
          <></>
        ) : (
          <>
            {auth.authFail && (
              <p className="text-sm italic text-red-500">
                *Incorrect username or password
              </p>
            )}
            {auth.blocked && (
              <p className="text-sm italic text-red-500">
                *This account is blocked
              </p>
            )}
          </>
        )}

        <SubmitButton isSignUp={isSignUp} />
      </form>
    </div>
    )}
  </>
  );
 
}

export default AuthForm;
