import React, { useEffect, useRef, useState } from "react";
import { OtpSubmit } from "../../../api/AuthRequests";

const OtpInput = ({ phone ,onSubmit}) => {
    {console.log("phoneNo:",phone)}
  const [otp, setOtp] = useState("");
  const [error,setError]=useState("")
  const inputRefs = useRef([]);


  const handleOtpChange = (event, index) => {
    const { value } = event.target;
    const newOtp = otp.split("");

    if (value.length > 1) {
      // If the user pastes multiple characters
      for (let i = 0; i < value.length; i++) {
        if (newOtp[index + i] !== undefined) {
          newOtp[index + i] = value.charAt(i);
        }
      }
    } else {
      newOtp[index] = value;
    }

    setOtp(newOtp.join(""));

    // Move focus to the next input field
    if (value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  useEffect(()=>{
  inputRefs.current[0].focus()
  },[])

  const handleSubmit = async() => {
    // Handle OTP submission here
   
    const Data ={
        otp,
        phone
    }
    console.log("otp verification post:",Data)
    const {data}=await OtpSubmit(Data)
    if(data === "approved"){
     onSubmit()
    }else{
        setError("Incorrect OTP")
    }
  };
  return (
    <div className="container m-auto">
      <div className="mx-auto max-w-sm md:max-w-lg">
        <div className="w-full">
          <div className="h-64 rounded bg-white py-3 text-center">
            <h1 className="text-2xl font-bold">OTP Verification</h1>
            <div className="mt-4 flex flex-col">
              <span>Enter the OTP you received at</span>
              <span className="font-bold">{phone || ""}</span>
            </div>
            <div
              id="otp"
              className="mt-5 flex flex-row justify-center px-2 text-center"
            >
              <input
                ref={(ref) => (inputRefs.current[0] = ref)}
                className="form-control m-2 h-10 w-10 rounded border text-center"
                type="number"
                value={otp.charAt(0) || ""}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, 0)}
              />
              <input
                ref={(ref) => (inputRefs.current[1] = ref)}
                className="form-control m-2 h-10 w-10 rounded border text-center"
                type="number"
                value={otp.charAt(1) || ""}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, 1)}
              />
              <input
                ref={(ref) => (inputRefs.current[2] = ref)}
                className="form-control m-2 h-10 w-10 rounded border text-center"
                type="number"
                value={otp.charAt(2) || ""}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, 2)}
              />
              <input
                ref={(ref) => (inputRefs.current[3] = ref)}
                className="form-control m-2 h-10 w-10 rounded border text-center"
                type="number"
                value={otp.charAt(3) || ""}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, 3)}
              />
              <input
                ref={(ref) => (inputRefs.current[4] = ref)}
                className="form-control m-2 h-10 w-10 rounded border text-center"
                type="number"
                value={otp.charAt(4) || ""}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, 4)}
              />
              <input
                ref={(ref) => (inputRefs.current[5] = ref)}
                className="form-control m-2 h-10 w-10 rounded border text-center"
                type="number"
                value={otp.charAt(5) || ""}
                maxLength="1"
                onChange={(e) => handleOtpChange(e, 5)}
              />
            </div>

            <div className="text-red-500 font-mono">{error|| ''}</div>

            <button
              className="m-2 h-10 rounded border px-4 hover:bg-secondary text-accent font-semibold"
              onClick={handleSubmit}
            >
              Submit
            </button>


          
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpInput;
