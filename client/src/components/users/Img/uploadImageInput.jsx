import React from 'react'

function uploadImageInput({handleImageUpload,profilePic}) {
  return (
    <>
    
    <input
    id="file-upload"
    name="file-upload"
    type="file"
    accept="image/*,video/*"
    className="sr-only"
    onChange={handleImageUpload}
  />
    </>
  )
}

export default uploadImageInput
