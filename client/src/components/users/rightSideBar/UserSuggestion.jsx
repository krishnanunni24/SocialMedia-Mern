import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import User from "./User";
import { fetchFollowing } from "../../../actions/UserActions";
import { FetchUsers } from "../../../api/UserRequests";

function UserSuggestion() {
  const user = useSelector((state) => state.authReducer.authData);
  const [people, setPeople] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await FetchUsers(user._id);
      setPeople(data);
    };
    fetchPersons();

    const fetchFollowingUsers = async () => {
      dispatch(fetchFollowing(user._id));
    };
    fetchFollowingUsers();
  }, []);

  return (
    <div className="my-5 w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          You may Know
        </h5>
        {/* <a  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
        </a> */}
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {people.users?.map((person, id) => {
            if (person._id !== user._id) {
              return <User person={person} key={id} />;
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default UserSuggestion;
