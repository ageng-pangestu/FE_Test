import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if ((username === "user1" && password === "dummyuser1") || (username === "user2" && password === "dummyuser2")) {
      setError(null);
      dispatch(login(username));
      setPassword("");
      navigate("/");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <>
      <form className="container shadow p-3 rounded" style={{ width: "30%", marginTop: "150px" }} onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}

        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-warning" style={{ color: "white" }} onClick={handleLogin}>
            Login
          </button>
        </div>
      </form>

      <div className="container mt-4" style={{ width: "20%" }}>
        <h5 className="text-center">data dummy user</h5>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>user1</td>
              <td>dummyuser1</td>
            </tr>
            <tr>
              <td>user2</td>
              <td>dummyuser2</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LoginPage;
