import React from "react";
import { useNavigate } from "react-router-dom";
import SLPAlogo from "./SLPAlogo.png";
import "./Sidebar.css";
import login from "./login.png";
import logout from "./logout.png";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="SL" onClick={() => navigate("/Dashboard")}>
        <div className="logo">
          <img src={SLPAlogo} alt="SLPA Logo" width="80" />
        </div>
        <div className="text">
          <h3 className="Sri">Sri Lanka</h3>
          <h1 className="Auth">Port Authority</h1>
          <h3 className="Lan">Sri Lanka the Maritime Hub</h3>
        </div>
      </div>

      <hr className="hr" />

      <ul className="menu1">
        <li>
          <button className="BMenu" onClick={() => navigate("/Dashboard")}>
            Dashboard
          </button>
        </li>
        <li>
          <button className="BMenu" onClick={() => navigate("/RackDash")}>
            Rack
          </button>
        </li>
        <li>
          <button className="BMenu" onClick={() => navigate("/AssetDash")}>
            ASSET
          </button>
        </li>
        <li>
          <button className="BMenu" onClick={() => navigate("/AssetTypeDash")}>
            ASSET Type
          </button>
        </li>
      </ul>

      <ul className="menu2">
        <hr className="hr2" />
        <li>
          <button className="Log1" onClick={() => navigate("/Logging")}>
            <img src={login} alt="Logo" width="21" className="login" />
            Log In
          </button>
        </li>
        <li>
          <button className="Log2" onClick={() => navigate("/Logging")}>
            <img src={logout} alt="Logo" width="21" className="logout" />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
