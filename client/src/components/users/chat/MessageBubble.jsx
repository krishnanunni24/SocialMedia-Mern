const MessageBubble = () => {
  return (
    <div className="flex lg:items-center flex-row-reverse">
      <div className="w-14 h-14 rounded-full relative flex-shrink-0">
        <img
                  src="https://source.unsplash.com/150x150/?portrait?3"
                  alt=""
          className="absolute h-full rounded-full w-full"
        />
      </div>
      <div className="text-white py-2 px-3 rounded bg-blue-600 relative h-full lg:mr-5 mr-2 lg:ml-20">
        <p className="leading-6">
          consectetuer adipiscing elit, sed diam nonummy nibh euismod laoreet
          dolore magna <i className="uil-grin-tongue-wink"></i>
        </p>
        <div className="absolute w-3 h-3 top-3 -right-1 bg-blue-600 transform rotate-45"></div>
      </div>
    </div>
  );
};

export default MessageBubble;