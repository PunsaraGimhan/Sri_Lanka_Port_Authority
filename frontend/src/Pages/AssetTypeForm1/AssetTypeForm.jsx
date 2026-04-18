import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RackFormimage from "./RackFormimage.png";
import hubIcon from "./hub.png";
import PCIcon from "./PC.png";
import serverIcon from "./server.png";
import switchIcon from "./switch.png";
import "./AssetTypeForm.css";
import bgImage   from "./Asset_TypeForm_image.avif";

const API = "http://localhost/Port_Authority/backend/api/assettype";

const AssetTypeForm = () => {
     const navigate = useNavigate();
     const location = useLocation();
     const editData = location.state?.editData || null;

     const [server, setServer] = useState("");
     const [pc, setPC] = useState("");
     const [switchDevice, setSwitchDevice] = useState("");
     const [hub, setHUB] = useState("");

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

     useEffect(() => {
          if (editData) {
               setServer(editData.server || "");
               setPC(editData.pc || "");
               setSwitchDevice(editData.switch_device || "");
               setHUB(editData.hub || "");
          }
     }, [editData]);

     const handleSave = async () => {
          if (!server || !pc || !switchDevice || !hub) {
               alert("Please fill in all fields!");
               return;
          }

          const payload = {
               server: server,
               pc: pc,
               switch_device: switchDevice,
               hub: hub,
          };

          try {
               const url = editData ? `${API}/update.php` : `${API}/create.php`;

               const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(
                         editData ? { ...payload, id: editData.id } : payload
                    ),
               });

               const data = await response.json();

               if (data.success) {
                    alert(editData ? "Asset Type Updated Successfully!" : "Asset Type Saved Successfully!");
                    navigate("/AssetTypeDash", {
                         replace: true,
                         state: { refresh: true },
                    });
               } else {
                    alert("Operation failed! Try again.");
               }
          } catch (error) {
               console.error("Error:", error);
               alert("Server error!");
          }
     };

     const handleReset = () => {
          setServer("");
          setPC("");
          setSwitchDevice("");
          setHUB("");
     };

     return (
          <div className="rackformpage04">
               <div className="formcard04">
                    <div className="iconcircle04">
                         <img src={RackFormimage} alt="Rack Form" />
                    </div>

                    <h2 className="AF04">Asset Type Form</h2>
                    <h4 className="AI04">Asset Type Information</h4>
                    <hr />

                    <div>
                         <div className="formrow04">
                              <div className="formgroup04">
                                   <div className="CCS04">
                                        <img src={serverIcon} alt="Server" />
                                        <label>Server</label>
                                   </div>
                                   <input
                                        type="text"
                                        placeholder="Enter Server"
                                        value={server}
                                        onChange={(e) => setServer(e.target.value)}
                                   />
                              </div>

                              <div className="formgroup04">
                                   <div className="CCS04">
                                        <img src={PCIcon} alt="PC" />
                                        <label>PC</label>
                                   </div>
                                   <input
                                        type="text"
                                        placeholder="Enter PC"
                                        value={pc}
                                        onChange={(e) => setPC(e.target.value)}
                                   />
                              </div>
                         </div>

                         <div className="formrow04">
                              <div className="formgroup04">
                                   <div className="CCS04">
                                        <img src={switchIcon} alt="Switch" />
                                        <label>Switch</label>
                                   </div>
                                   <input
                                        type="text"
                                        placeholder="Enter Switch"
                                        value={switchDevice}
                                        onChange={(e) => setSwitchDevice(e.target.value)}
                                   />
                              </div>

                              <div className="formgroup04">
                                   <div className="CCS04">
                                        <img src={hubIcon} alt="HUB" />
                                        <label>HUB</label>
                                   </div>
                                   <input
                                        type="text"
                                        placeholder="Enter HUB"
                                        value={hub}
                                        onChange={(e) => setHUB(e.target.value)}
                                   />
                              </div>
                         </div>

                         <div className="buttonrow04">
                              <button className="Safe04" type="button" onClick={handleSave}>
                                   {editData ? "Update" : "Save"}
                              </button>
                              <button className="Rest04" type="button" onClick={handleReset}>
                                   Reset
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default AssetTypeForm;