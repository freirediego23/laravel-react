import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthUser from "./AuthUser";
import axios from "axios";
import Modal from "./Modal";
import AddModal from "./AddModal";

export default function Dashboard() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const [editUsers, setEditUsers] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUserDetail();
    fetchUsers();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  // Funciones para abrir y cerrar el modal
  const handlOpenModal = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.name} ${user.email}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // GET USERS FROM DATABASE

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/user");
      setUsers(response.data);
      console.log(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // EDIT USERS

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/user/${editUsers.id}`, {
        name: editUsers.name,
        email: editUsers.email,
        password: editUsers.password,
      });

      fetchUsers();

      setEditUsers({
        id: null,
        name: "",
        email: "",
        password: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleEdit = (user) => {
    setEditUsers({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setOpen(true);
  };

  // DELETE USERS

  // Funcion para borrar estudiantes del registro

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/${id}`);
      // Actualizar la lista de estudiantes después de la eliminación
      fetchUsers();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  function renderElement() {
    if (userdetail) {
      return (
        <>
          <div>
            <h4>Welcome</h4>
            <p className="text-lg">{userdetail.name}</p>
          </div>
          <AddModal></AddModal>
          <br />
          <input
            className="mb-3 mt-4"
            type="text"
            placeholder="Search users..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div>
            <h2>List of users</h2>
          </div>

          {/* Edit user Modal */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className=" w-60">
              <div className="mx-auto my-4 w-48">
                <h3 className="text-lg font-black text-gray-800 text-center">
                  Edit User
                </h3>
                <form>
                  <div className="mb-3">
                    {" "}
                    <label>User Name</label>
                    <input
                      className="mb-3"
                      type="text"
                      value={editUsers.name}
                      onChange={(e) =>
                        setEditUsers({ ...editUsers, name: e.target.value })
                      }
                    />
                    <label>Email</label>
                    <input
                      className="mb-3"
                      type="text"
                      value={editUsers.email}
                      onChange={(e) =>
                        setEditUsers({ ...editUsers, email: e.target.value })
                      }
                    />
                    <label>Password</label>
                    <input
                      type="text"
                      value={editUsers.password}
                      onChange={(e) =>
                        setEditUsers({ ...editUsers, password: e.target.value })
                      }
                    />
                    <br />
                  </div>

                  <div className="flex gap-4">
                    <button
                      className="btn btn-success py-2 px-4"
                      onClick={handleSaveEdit}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-light w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal>

          <div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => {
                          handleEdit(user);
                          // setOpen(true);
                        }}
                        className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(user.id);
                        }}
                        type="button"
                        className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      );
    } else {
      return <p>Loading.....</p>;
    }
  }

  return (
    <>
      <div>
        <h1 className="mb-4 mt-4 text-blue-500">Dashboard page</h1>
        {renderElement()}
      </div>
    </>
  );
}
