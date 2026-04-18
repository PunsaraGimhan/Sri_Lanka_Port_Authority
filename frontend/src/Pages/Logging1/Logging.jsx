import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SLlogo from "./SLlogo.png";
import userIcon from "./user.png";
import lockIcon from "./lock.png";
import bgVideo from "./SLPA Port Video.mp4";
import "./Logging.css";
import { loginUser } from "../services/api";

const Logging = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading]   = useState(false);

  const navigate  = useNavigate();
  const videoRef  = useRef(null);


  const handleLogin = async () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);
      const data = await loginUser(username, password);

      if (data.success) {
        alert("Login successful ✅");
        navigate("/dashboard");
      } else {
        alert(data.error || "Invalid username or password ❌");
      }
    } catch (error) {
      alert(error.message || "Server error ❌");
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    const video = document.createElement("video");
    videoRef.current = video;

    video.src          = bgVideo;
    video.autoplay     = true;
    video.loop         = true;
    video.muted        = true;
    video.playsInline  = true;
    video.playbackRate = 0.3;

    Object.assign(video.style, {
      position:  "fixed",
      top:       "50%",
      left:      "50%",
      width:     "100%",
      height:    "100%",
      objectFit: "cover",
      transform: "translate(-50%, -50%)",
      zIndex:    "-1",
    });

    document.body.appendChild(video);
    return () => document.body.removeChild(video);
  }, []);


  return (
    <div className="loggingform">
      <div className="mainform">
        <div className="JCT">

          {/* Logo + Title */}
          <div className="SLLS">
            <div className="pic">
              <img src={SLlogo} alt="SLPA Logo" width="400" />
            </div>
            <div className="SLT">
              <h3 className="Sr">Sri Lanka</h3>
              <h1 className="Aut">Port Authority</h1>
              <h3 className="La">Sri Lanka the Maritime</h3>
            </div>
          </div>

          {/* Form */}
          <div className="SW">
            <div className="formgroup001">
              <div className="CCS">
                <img src={userIcon} alt="User" />
                <label className="lab">User Name</label>
              </div>
              <input
                type="text"
                placeholder="Enter User Name"
                className="UCT"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="formgroup001">
              <div className="CCS">
                <img src={lockIcon} alt="Password" />
                <label className="lab">Password</label>
              </div>
              <input
                type="password"
                placeholder="Enter password"
                className="UCT"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleLogin(); }}
              />
            </div>

            <div className="ECT">
              <button
                className="loginbtn"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Logging;