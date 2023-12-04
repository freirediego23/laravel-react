import { Routes, Route, Link } from "react-router-dom";
//import Home from "../components/home";
import Dashboard from "../components/dashboard";
import AuthUser from "../components/AuthUser";
import Register from "../components/register";
import Login from "../components/login";
function Auth() {
  const { token, logout } = AuthUser();
  const logoutUser = () => {
    if (token != undefined) {
      logout();
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item ml-6">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link " to="/register">
              Register
            </Link>
          </li>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <span role="button" className="nav-link" onClick={logoutUser}>
                Logout
              </span>
            </li>
          </ul>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {/* {(token = undefined ? <p>no def</p> : <p>si def</p>)} */}
    </>
  );
}

export default Auth;
