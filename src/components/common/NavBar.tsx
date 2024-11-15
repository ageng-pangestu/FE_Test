import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

function NavBar() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <>
      <nav className="navbar navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <span className="navbar-brand  mb-0 h1">Warehouse Management System</span>

          <div className="d-flex align-items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStptxhza6ljqkQB8DrFh_WjrIJQ2bOALWOrA&s" // Replace with actual avatar URL
              alt="User Avatar"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
            <span className="ms-2">{user ? <p>Welcome, {user}!</p> : <p>No user data available. Please login.</p>}</span>
          </div>
        </div>
      </nav>
      <div className="container-fluid pt-2 pb-2 bg-light">
        <span style={{ color: "gray" }}>Stock Movement / Pemindahan Barang</span>
        <h5>Pemindahan barang</h5>
      </div>
    </>
  );
}

export default NavBar;
