import React from "react";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function AddModal() {
  const [openAdd, setopenAdd] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();

  const submitForm = (e) => {
    //e.preventDefault();
    // api call
    http
      .post("/register", {
        email: email,
        password: password,
        name: name,
      })
      .then((res) => {
        // Changed /login to /dashboard to direct to the dashboard instead of login view after creating a new user.
        setopenAdd(false);
        navigate("/dashboard");
      });
  };

  return (
    <div>
      <button onClick={() => setopenAdd(true)} className="btn btn-primary mt-4">
        {" "}
        Add User
      </button>
      <Modal open={openAdd} onClose={() => setopenAdd(false)}>
        <div className=" w-60">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800 text-center">
              Add User
            </h3>
            <form>
              <div className="mb-3">
                {" "}
                <label>User Name</label>
                <input
                  className="mb-3"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email</label>
                <input
                  className="mb-3"
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password</label>
                <input
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <br />
              </div>

              <div className="flex gap-4">
                <button
                  className="btn btn-success py-2 px-4"
                  onClick={submitForm}
                >
                  Save
                </button>
                <button
                  className="btn btn-light w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setopenAdd(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AddModal;
