import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../../actions/UploadAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UploadImageInput from "./uploadImageInput";
import FileErrAlert from "./FileErrAlert";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { BsEmojiSunglasses } from "react-icons/bs";

function Modal(props) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [fileError, setFileError] = useState("");
  const [caption, setCaption] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  const [uploadfile, setUploadFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authReducer.authData);
  const userId = user._id;
  const { setIsModalOpen } = props;
  const { isModalOpen } = props;
  const allowedFileTypes = [
    "image/jpg",
    "image/png",
    "image/jpeg",
    "image/webp",
  ];
  const handleEmojiSelect = (emoji) => {
    setCaption(caption + emoji.native);
  };
  const handleEmojiClick=()=>{
    setShowPicker(!showPicker)
  }

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

  const handlePost = () => {
    const data = new FormData();
    console.log(uploadfile, "file");
    data.append("image", uploadfile);
    data.append("caption", caption);
    data.append("userId", userId);

    try {
      dispatch(uploadPost(data));
      setIsModalOpen(!isModalOpen);
    } catch {
      toast.error("post failed");
    }
  };

  return (
    <div>
      <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
        {/*Modal overlay */}
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/*Modal container*/}

        <div
          className={`align-middle flex flex-col justify-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full lg:h-auto`}
        >
          {/*Modal header*/}
          <div className="bg-white flex px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between w-full">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Create Post
              </h3>
              <button
                onClick={() => {
                  setUploadedImage(false);
                  setIsModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/*Modal content*/}
            {!uploadedImage ? (
              <div className="flex flex-col justify-center items-center">
                {fileError && (
                  <FileErrAlert
                    setFileError={setFileError}
                    fileError={fileError}
                  />
                )}
                <div className="relative flex justify-center items-center">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII="
                    className="max-w-full max-h-full"
                    alt="placeholder image"
                  />
                </div>

                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-accent hover:bg-blue-300 my-2 py-2 px-4 text-white rounded-md"
                >
                  Upload from device
                </label>
                <UploadImageInput handleImageUpload={handleImageUpload} />
              </div>
            ) : (
              <div className="flex">
                <div className="flex-col flex-1 p-3"> 
                <div className="flex">
                <label htmlFor="file-upload">
                  <UploadImageInput handleImageUpload={handleImageUpload} />
                  <div className="relative h-52 w-64 object-cover">
                    <img
                      className="h-full w-full"
                      src={uploadedImage}
                      alt="uploaded image"
                    />
                  </div>
                </label>

                </div>

                <div className="flex py-3 flex-1 justify-center">
                <button
                    onClick={handlePost}
                    type="button"
                    className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-purplex-600 text-base font-medium text-white bg-accent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Post
                  </button>
                </div>
                </div>

                <div className="flex-col flex-1 px-3"> 


                  <div className="flex items-center py-3">
                    <input
                      className="peer border-b-2 mt-2 border-gray-300 text-gray-900 focus:outline-none"
                      type="text"
                      placeholder="Type Caption here"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                    <button
                      onClick={handleEmojiClick}
                    >
                      <BsEmojiSunglasses size={23} />
                      
                      </button>
                    </div>
                    <div className="flex-1 flex w-64 h-60 overflow-auto">
                    {showPicker && (
                            <Picker data={data} onEmojiSelect={handleEmojiSelect}/>
                            )}
                            </div>

                </div>
                
                {/* <div className="w-full flex justify-between gap-2">
                  <button
                    onClick={handlePost}
                    type="button"
                    className="rounded-md border border-transparent shadow-sm px-4 py-2 bg-purplex-600 text-base font-medium text-white bg-accent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Post
                  </button>
                </div> */}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
