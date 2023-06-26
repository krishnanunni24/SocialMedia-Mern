import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Skeleton from 'react-loading-skeleton';

function PostImage({image}) {
  return (
<div className="flex justify-center max-h-96 px-2 md:px-0 bg-slate-50">
  <div className="aspect-w-4 aspect-h-3 overflow-hidden">
   { <LazyLoadImage
      effect="blur"
      src={image}
      alt="PostImage"
      className="object-contain"
    />|| <Skeleton/>}
  </div>
</div>
  )
}

export default PostImage
