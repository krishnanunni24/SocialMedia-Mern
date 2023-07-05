const UserListItem = ({user,onUserClick}) => {
  return (
    <li>
      <a
        onClick={()=>{
          onUserClick(user)
        }}
        className="flex items-center py-3 px-4 space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="w-12 h-12 rounded-full relative flex-shrink-0">
          <img
                  src={user?.profilePicture}
                  alt=""
            className="absolute h-full rounded-full w-full"
          />
          <span className="absolute bg-green-500 border-2 border-white bottom-0 h-3 m-0.5 right-0 rounded-full shadow-md w-3"></span>
        </div>
        <div className="flex-1 min-w-0 relative text-gray-500">
          <h4 className="text-black font-semibold dark:text-white">
            {user?.username}
          </h4>
          <span className="absolute right-0 top-1 text-xs">Sun</span>
        </div>
      </a>
    </li>
  );
};

export default UserListItem;