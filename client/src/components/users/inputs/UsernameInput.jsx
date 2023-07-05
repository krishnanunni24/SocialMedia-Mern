import React from 'react'

function UsernameInput({register,username}) {
  return (
    <input
    id="username"
    aria-labelledby="username"
    name="username"
    defaultValue={username || ""}
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
  )
}

export default UsernameInput
