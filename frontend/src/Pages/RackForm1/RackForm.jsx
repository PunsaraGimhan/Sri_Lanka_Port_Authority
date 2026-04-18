import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RackFormImage from "./RackFormimage.png";
import RackNameIcon from "./RackName.png";
import RackLocationIcon from "./RackLocation.png";
import "./RackForm.css";
import bgImage   from "./RackForm_image.png";

function RackForm() {
  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
      document.body.style.backgroundColor      = "#0f172a";
      document.body.style.backgroundImage      = `url(${bgImage})`;
      document.body.style.backgroundSize       = "cover";
      document.body.style.backgroundPosition   = "center";
      document.body.style.backgroundRepeat     = "no-repeat";
      document.body.style.backgroundAttachment = "fixed";
  
      return () => {
        document.body.style.backgroundImage  = "";
        document.body.style.backgroundColor = "";
      };
    }, []);


  const editData  = location.state?.editData  || null;
  const isEditing = editData !== null;

  const [rackName, setRackName] = useState(isEditing ? editData.rack_name : "");
  const [loc,      setLoc]      = useState(isEditing ? editData.location   : "");

  const handleReset = () => {
    setRackName("");
    setLoc("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseUrl = "http://localhost/Port_Authority/backend/api/rack/";

    const payload = isEditing
      ? { id: editData.id, Rack_Name: rackName, Location: loc }
      : { Rack_Name: rackName, Location: loc };

    const endpoint = isEditing ? "update.php" : "create.php";

    fetch(baseUrl + endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          alert(isEditing ? "Rack Updated Successfully!" : "Rack Saved Successfully!");
          handleReset();
          navigate("/RackDash");
        } else {
          alert("Failed: " + (data.message || "Unknown error"));
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error connecting to server");
      });
  };

  return (
    <div className="rack-form-page">
      <div className="form-card">
        <div className="icon-circle">
          <img src={RackFormImage} alt="Rack Form" />
        </div>

        <h2 className="RF">Rack Form</h2>
        <h4 className="RI">Rack Information</h4>
        <hr />

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="form-row">

            <div className="form-group">
              <div className="CCS">
                <img src={RackNameIcon} alt="Rack Name" />
                <label>Rack Name</label>
              </div>
              <input
                type="text"
                name="Rack_Name"
                placeholder="Enter Rack Name"
                value={rackName}
                onChange={(e) => setRackName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <div className="CCS">
                <img src={RackLocationIcon} alt="Location" />
                <label>Location</label>
              </div>
              <input
                type="text"
                name="Location"
                placeholder="Enter Location"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="button-row-center">
            <button className="save" type="submit">
              {isEditing ? "Update Rack" : "Save"}
            </button>
            <button className="reset" type="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RackForm;