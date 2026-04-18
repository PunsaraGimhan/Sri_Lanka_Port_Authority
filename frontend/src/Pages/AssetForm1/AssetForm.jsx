import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RackFormimage from "./RackFormimage.png";
import serverIcon from "./server.png";
import userIcon from "./user.png";
import ipIcon from "./ip.png";
import mobileIcon from "./mobile.png";
import idIcon from "./id.png";
import layersIcon from "./layers.png";
import "./AssetForm.css";
import bgImage   from "./AssetForm_image.avif";

const API = "http://localhost/Port_Authority/backend/api/asset";

function AssetForm() {
     const location = useLocation();
     const navigate = useNavigate();
     const editData = location.state?.editData || null;

     const [rackid, setRackID] = useState("");
     const [responsibleperson, setResponsiblePerson] = useState("");
     const [ipaddress, setIPAddress] = useState("");
     const [rpphonenumber, setRPPhoneNumber] = useState("");
     const [assetTypesID, setAssetTyoesID] = useState("");
     const [racktier, setRackTier] = useState("");

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
               setRackID(editData.rack_id || "");
               setResponsiblePerson(editData.responsible_person || "");
               setIPAddress(editData.ip_address || "");
               setRPPhoneNumber(editData.phone_number || "");
               setAssetTyoesID(editData.asset_type || "");
               setRackTier(editData.rack_tier || "");
          }
     }, [editData]);

     const handleSave = async () => {
          if (!rackid || !ipaddress || !assetTypesID || !racktier || !responsibleperson || !rpphonenumber) {
               alert("Please fill in all fields!");
               return;
          }

          const payload = {
               rack_id: rackid,
               ip_address: ipaddress,
               asset_type: assetTypesID,
               rack_tier: racktier,
               responsible_person: responsibleperson,
               phone_number: rpphonenumber,
          };

          try {
               const url = editData ? `${API}/update.php` : `${API}/create.php`;

               const response = await fetch(url, {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                         editData ? { ...payload, id: editData.id } : payload
                    ),
               });

               const data = await response.json();
               console.log("Response:", data);

               if (data.success) {
                    alert(editData ? "Asset Updated Successfully!" : "Asset Saved Successfully!");
                    navigate("/AssetDash", {
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
          setRackID("");
          setResponsiblePerson("");
          setIPAddress("");
          setRPPhoneNumber("");
          setAssetTyoesID("");
          setRackTier("");
     };

     return (
          <div className="rackformpage">
               <div className="formcard">
                    <div className="iconcircle">
                         <img src={RackFormimage} alt="Rack Form" />
                    </div>

                    <h2 className="AF">Asset Form</h2>
                    <h4 className="AI">Asset Information</h4>
                    <hr />

                    <div>
                         <div className="formrow">
                              <div className="formgroup">
                                   <div className="CCS">
                                        <img src={serverIcon} alt="Rack ID" />
                                        <label>Rack ID</label>
                                   </div>
                                   <input
                                        type="text"
                                        value={rackid}
                                        onChange={(e) => setRackID(e.target.value)}
                                   />
                              </div>

                              <div className="formgroup">
                                   <div className="CCS">
                                        <img src={userIcon} alt="Responsible Person" />
                                        <label>Responsible Person</label>
                                   </div>
                                   <input
                                        type="text"
                                        value={responsibleperson}
                                        onChange={(e) => setResponsiblePerson(e.target.value)}
                                   />
                              </div>
                         </div>

                         <div className="formrow">
                              <div className="formgroup">
                                   <div className="CCS">
                                        <img src={ipIcon} alt="IP Address" />
                                        <label>IP Address</label>
                                   </div>
                                   <input
                                        type="text"
                                        value={ipaddress}
                                        onChange={(e) => {
                                             const val = e.target.value.replace(/[^0-9.]/g, "");
                                             setIPAddress(val);
                                        }}
                                   />
                              </div>

                              <div className="formgroup">
                                   <div className="CCS">
                                        <img src={mobileIcon} alt="Phone Number" />
                                        <label>R.P Phone Number</label>
                                   </div>
                                   <input
                                        type="number"
                                        value={rpphonenumber}
                                        onChange={(e) => setRPPhoneNumber(e.target.value)}
                                   />
                              </div>
                         </div>

                         <div className="formrow">
                              <div className="formgroup">
                                   <div className="CCS">
                                        <img src={idIcon} alt="Asset Type ID" />
                                        <label>Asset Type ID</label>
                                   </div>
                                   <input
                                        type="text"
                                        value={assetTypesID}
                                        onChange={(e) => setAssetTyoesID(e.target.value)}
                                   />
                              </div>

                              <div className="formgroup">
                                   <div className="CCS">
                                        <img src={layersIcon} alt="Rack Tier" />
                                        <label>Rack Tier</label>
                                   </div>
                                   <input
                                        type="text"
                                        value={racktier}
                                        onChange={(e) => setRackTier(e.target.value)}
                                   />
                              </div>
                         </div>

                         <div className="buttonrow">
                              <button className="Safe" type="button" onClick={handleSave}>
                                   {editData ? "Update" : "Save"}
                              </button>

                              <button className="Rest" type="button" onClick={handleReset}>
                                   Reset
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     );
}

export default AssetForm;