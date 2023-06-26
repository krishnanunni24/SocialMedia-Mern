import React from 'react';
import UserListItem from './UserListsItem';
import MessageBubble from './MessageBubble';

const ChatComponent = () => {
  return (
    <div className="w-full mt-8">
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="lg:flex lg:shadow lg:bg-white lg:space-y-0 space-y-8 rounded-md lg:-mx-0 -mx-5 overflow-hidden dark:lg:bg-gray-800">
          {/* Left panel - User list */}
          <div className="lg:w-4/12 bg-white border-r overflow-hidden dark:bg-gray-800 dark:border-gray-600">
            {/* Search */}
            <div className="border-b px-4 py-4 dark:border-gray-600">
              <div className="bg-gray-100 input-with-icon rounded-md dark:bg-gray-700">
                <input
                  id="autocomplete-input"
                  type="text"
                  placeholder="Search"
                  className="bg-transparent max-h-10 p-3 shadow-none outline-none"
                />
                <i className="icon-material-outline-search"></i>
              </div>
            </div>

            {/* User list */}
            <div className="pb-16 w-full">
              <ul className="dark:text-gray-100">
                <UserListItem />
                <UserListItem />
                <UserListItem />
                <UserListItem />
                <UserListItem />
              </ul>
            </div>
          </div>

          {/* Right panel - Chat messages */}
          <div className="lg:w-8/12 bg-white dark:bg-gray-800">
            {/* Header */}
            <div className="border-b px-6 py-4 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <img
                      src="https://source.unsplash.com/150x150/?portrait?3"
                      alt=""
                      className="absolute h-full rounded-full w-full"
                    />
                    <span className="absolute bg-green-500 border-2 border-white bottom-0 h-3 m-0.5 right-0 rounded-full shadow-md w-3"></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-black font-semibold dark:text-white">
                      David Peterson
                    </h4>
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
                <button className="p-1 rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                  <i className="icon-material-outline-more-vert"></i>
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="px-6 py-4">
              <div className="mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full relative flex-shrink-0">
                    <img
                      src="https://source.unsplash.com/150x150/?portrait?3"
                      alt=""
                      className="absolute h-full rounded-full w-full"
                    />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500">David Peterson</span>
                    <p className="text-sm">12:45 PM</p>
                  </div>
                </div>
              </div>
              <MessageBubble />
          
              <MessageBubble />
            </div>

            {/* Message input */}
            <div className="px-6 py-4 border-t dark:border-gray-600">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full bg-gray-100 dark:bg-gray-700 rounded-full py-2 px-4 focus:outline-none"
                />
                <button className="ml-4 text-blue-500 hover:text-blue-600">
                  <i className="icon-feather-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
