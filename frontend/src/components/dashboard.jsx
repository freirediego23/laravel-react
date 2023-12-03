import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthUser from "./AuthUser";
import axios from "axios";
import Modal from "./Modal";

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
      //history.push("/dashboard");
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  function renderElement() {
    if (userdetail) {
      return (
        <>
          <div>
            <h4>Name</h4>
            <p>{userdetail.name}</p>
            <h4>Email</h4>
            <p>{userdetail.email}</p>
          </div>
          <div>
            <h2>List of users</h2>
            {users && users.length > 0 ? (
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <strong>{user.name}</strong> - {user.email} -{" "}
                    <button
                      onClick={() => {
                        handleEdit(user);
                        // setOpen(true);
                      }}
                      className="p-1 text-blue-500 no-underline"
                    >
                      edit
                    </button>{" "}
                    -{" "}
                    <button
                      className="p-1 text-red-500 "
                      type="button"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users available.</p>
            )}
          </div>

          {/* Edit user Modal */}
          <Modal open={open} onClose={() => setOpen(false)}>
            <div className=" w-56">
              <div className="mx-auto my-4 w-48">
                <h3 className="text-lg font-black text-gray-800 text-center">
                  Edit User
                </h3>
                <form>
                  <div className="mb-3">
                    {" "}
                    <label>User Name</label>
                    <input
                      type="text"
                      value={editUsers.name}
                      onChange={(e) =>
                        setEditUsers({ ...editUsers, name: e.target.value })
                      }
                    />
                    <label>Email</label>
                    <input
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
