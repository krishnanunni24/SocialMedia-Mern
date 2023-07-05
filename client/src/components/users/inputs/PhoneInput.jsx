import React from 'react'

function PhoneInput({register,phone}) {
  return (
    <input
    id="phone"
    aria-labelledby="username"
    name="phone"
    defaultValue={phone || ""}
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
  )
}

export default PhoneInput
