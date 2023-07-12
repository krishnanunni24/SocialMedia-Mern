const UserListItem = ({ user, onUserClick }) => {
  return (
    <li>
      <a
        onClick={() => {
          onUserClick(user);
        }}
        className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <div className="relative h-12 w-12 flex-shrink-0 rounded-full">
          <img
            src={user?.profilePicture}
            alt=""
            className="absolute h-full w-full rounded-full"
          />
          <span className="absolute bottom-0 right-0 m-0.5 h-3 w-3 rounded-full border-2 border-white bg-green-500 shadow-md"></span>
        </div>
        <div className="relative min-w-0 flex-1 text-gray-500">
          <h4 className="font-semibold text-black dark:text-white">
            {user?.username}
          </h4>
          <span className="absolute right-0 top-1 text-xs bg-green-400 rounded-lg">{user?.messageCount}</span>
        </div>
      </a>
    </li>
  );
};

export default UserListItem;
