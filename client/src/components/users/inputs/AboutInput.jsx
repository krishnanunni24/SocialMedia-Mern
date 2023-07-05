import React from "react";

function AboutInput({ register, about }) {
  return (
    <textarea
      {...register("about", {
        maxLength: {
          value: 50,
          message: "about should be maximum of 50 characters",
        },
      })}
      className="peer block min-h-[auto] w-full rounded border-0 bg-slate-100 px-3 py-[0.32rem] leading-[1.6] placeholder-opacity-0 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary peer-focus:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      id="about"
      rows="4"
      aria-labelledby="about"
      name="about"
      defaultValue={about || ""}
      placeholder="About You"
    ></textarea>
  );
}

export default AboutInput;
