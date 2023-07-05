const MessageBubble = ({receiver}) => {
  return (
    <>
      <div className="flex flex-row-reverse items-end gap-2">
        <img
          src="https://source.unsplash.com/150x150/?portrait?3"
          alt=""
          className="h-5 w-5 rounded-full shadow"
        />
        <div className="max-w-sm rounded-[20px] bg-gradient-to-tr from-sky-500 to-blue-500 px-4 py-2 text-white shadow">
          $200? Too steep. Can you lower the price a bit? 😕
        </div>
      </div>

      <div className="flex gap-3">
        <img
          src="https://source.unsplash.com/150x150/?portrait?3"
          alt=""
          className="h-9 w-9 rounded-full shadow"
        />
        <div className="max-w-sm rounded-[20px] bg-secondary px-4 py-2">
          Hi, I’m John
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
