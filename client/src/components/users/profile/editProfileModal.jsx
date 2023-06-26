import { Modal } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";

function EditProfileModal({ openModal, handleOnClose }) {
  const user = useSelector((state) => state.authReducer.authData);
  return (
    <Modal
      title="Edit Profile"
      opened={openModal}
      onClose={handleOnClose}
      size="md"
    >
      <div className="flex-col space-y-3">
        <div className="flex justify-center">
          <img
            src="https://source.unsplash.com/150x150/?portrait?3"
            alt=""
            className="w-18 h-18 lg: mt-2 bg-gray-300 md:rounded-full lg:mx-auto lg:h-28 lg:w-28"
          />
        </div>
        <span className="flex justify-center font-medium text-accent">
          Change Profile Pic
        </span>
        <div className="flex justify-center">
          <div className="relative mb-3">
            <textarea
              className="peer block min-h-[auto] w-full rounded border-0 bg-slate-100 px-3 py-[0.32rem] leading-[1.6] placeholder-opacity-0 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary peer-focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlTextarea1"
              rows="4"
              placeholder="Your message"
            ></textarea>
            <label
              htmlFor="exampleFormControlTextarea1"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-accent placeholder-opacity-0 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-sm peer-focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
            >
              Bio
            </label>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default EditProfileModal;
