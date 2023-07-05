import { Drawer } from "@mantine/core";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { SearchUsers } from "../../../api/UserRequests";
import User from "../../users/rightSideBar/User";

const offCanvasSearchNav = ({ opened, close }) => {
  const [searchTxt, setSearchTxt] = useState("");
  const [users, setUsers] = useState([]);
  const handleChange = (e) => {
    setSearchTxt(e.target.value);
  };
  const [noUsersExc, setNoUsersExc] = useState(null);

  useEffect(() => {
    if (searchTxt) {
      const searchUsers = async () => {
        try {
          const { data } = await SearchUsers(searchTxt);
          setNoUsersExc(false)
          console.log(data)
          setUsers(data.users);
        } catch (err) {
            if(err.response && err.response.data.message === "no users found"){
             setNoUsersExc(true)
             setUsers([])
            }
        }
        // Do something with the users data
      };
      searchUsers();
    }
  }, [searchTxt]);
  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="User Search"
        overlayProps={{ opacity: 0.5, blur: 4 }}
      >
        {/* Input - Search */}
        <div className="relative">
          <input
            type="text"
            value={searchTxt}
            onChange={handleChange}
            placeholder="Search Users"
            className="first-letter w-full rounded-lg bg-transparent py-2 pl-10 focus:outline-4 focus:outline-accent"
          />
          <div className="absolute left-3 top-2">
            <AiOutlineSearch className="h-5 w-5 text-gray-500" />
          </div>
        </div>

        {/* Search Results*/}
        {users.length ? (
          users.map((user) => {
            return <User person={user} key={user._id} />;
          })
        ) : (
          <>
            {noUsersExc && (
              <p className="text-lg text-accent mt-3">No matching users found.</p>
            )}
          </>
        )}
      </Drawer>
    </>
  );
};

export default offCanvasSearchNav;
