import React, { useState } from 'react'
import PostModal from '../posts/PostModal'

function ListPosts({Posts}) {
  const [openModal,setOpenModal]=useState(false)
  const [post,setPost]=useState(null)

  const handleOnClose = ()=>{
    console.log("in handleonclose")
    setOpenModal(false)
  }
    const handleOnclick=(post)=>{
        setPost(post)
        setOpenModal(true)
      }

  return (
<div className="flex flex-wrap -mx-1 lg:-mx-4 justify-center md:justify-normal">
        {Posts?.map((post, id) => (
            !post.unlisted && (
          <div
            key={id}
            className="my-1 px-1 md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
          >
            <div  onClick={()=>{
              handleOnclick(post)
            }} className="flex relative sm:w-auto justify-center h-64 sm  :h-52 rounded-lg shadow-lg  overflow-hidden">
              <img
                className="w-full hover:scale-125 transition-all duration-500 cursor-pointer"
                src={post.image}
                effect="blur"
                alt="Reported Post"
              />
             
            </div>
          </div>
        )))}
       
        <PostModal openModal={openModal} handleOnClose={handleOnClose} post={post}/>
      </div>
  )
}

export default ListPosts
