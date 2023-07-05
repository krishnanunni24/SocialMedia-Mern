import { Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import UploadImageInput from "../Img/uploadImageInput";
import FileErrAlert from "../createPost/FileErrAlert";
import PhoneInput from "../inputs/PhoneInput";
import UsernameInput from "../inputs/UsernameInput";
import AboutInput from "../inputs/AboutInput";
import { updateProfile } from "../../../actions/UploadAction";
import { toast } from "react-toastify";

function EditProfileModal({ openModal, handleOnClose }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileError, setFileError] = useState("");
  const [uploadfile, setUploadFile] = useState(null);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.authReducer.authData);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const Data = new FormData()
    Data.append("about",data.about)
    Data.append("username",data.username)
    Data.append("phone",data.phone)

    if (uploadfile) {
       Data.append("image",uploadfile)
      console.log(Data); // Access the profilePicture value using get
    }
    
    dispatch(updateProfile(Data,user._id)).then(()=>{
      handleOnClose()
      toast.success("updated successfully")
    })
    // Perform your logic to update the user profile
  };
  

  const allowedFileTypes = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "image/webp",
  ];

  function handleImageUpload(event) {
    setUploadedImage(null);
    const file = event.target.files[0];

    if (file && allowedFileTypes.includes(file.type)) {
      console.log("no error", fileError);
      console.log(file);
      setUploadFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
    } else {
      setFileError("Only JPEG, JPG, PNG and WEBP images are allowed.");
    }
  }

  useEffect(() => {
    reset(); // Reset the form on component mount
  }, []);

  useEffect(()=>{
  reset()
  },[handleOnClose])





  return (
    <Modal
      title="Edit Profile"
      opened={openModal}
      onClose={handleOnClose}
      size="sm"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-6">
          {/* Profile Picture Section */}
          {/* ... */}

          <div className="flex-col space-y-3">
            <div className="flex justify-center">
              <img
                src={!uploadedImage ? user.profilePicture : uploadedImage}
                alt=""
                className="w-18 h-18 lg: mt-2 bg-gray-300 md:rounded-full lg:mx-auto lg:h-28 lg:w-28"
              />
            </div>
            {fileError && (
              <FileErrAlert setFileError={setFileError} fileError={fileError} />
            )}
            <label
              htmlFor="file-upload"
              className="flex justify-center font-medium text-accent"
            >
              Change Profile Pic
            </label>
            <UploadImageInput handleImageUpload={handleImageUpload}/>
          </div>
          {/* Phone Input */}
          <div className="mt-3 flex-col">
            <span className="text-base font-bold text-accent">Phone:</span>
            <PhoneInput register={register} phone={user.phone}/>
          {errors.phone && (
            <span className="text-red-500 text-sm">
             {errors.phone.message}
            </span>
          )}
          </div>

          {/* Username Input */}
          <div className="mt-3 flex-col">
            <span className="text-base font-bold text-accent">Username:</span>
           <UsernameInput register={register} username={user.username}/>
          {errors.username && (
            <span className="text-red-500 text-sm">{errors.username.message}</span>
          )}
          </div>

          {/* About Textarea */}
          <div className="mt-3 flex-col">
            <span className="text-base font-bold text-accent">About:</span>
             <AboutInput about={user.about} register={register}/>
          {errors.about && (
            <span className="text-red-500 text-sm">
             {errors.about.message}
            </span>
          )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-md bg-gray-300 p-2 px-6 shadow-sm dark:bg-gray-700"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default EditProfileModal;
