import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AssetDash.css";
import ExcelLogo from "./excel.png";
import AddForm from "./add.png";
import bgImage   from "./Asset_image.jpeg";

const API = "http://localhost/Port_Authority/backend/api/asset";

function AssetDash() {
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

     const [rows, setRows] = useState([]);
     const [query, setQuery] = useState("");

     const loadAssets = () => {
          fetch(`${API}/read.php`)
               .then((res) => res.json())
               .then((data) => setRows(data))
               .catch((err) => console.error("Failed to load assets:", err));
     };

     useEffect(() => {
          loadAssets();
     }, [location]);

     // Search Function
     const handleChange = (e) => {
          setQuery(e.target.value.toLowerCase());
     };

     const filteredRows = rows.filter((row) =>
          Object.values(row).join(" ").toLowerCase().includes(query)
     );

     // Delete Function
     const handleDelete = (id) => {
          if (!window.confirm("Are you sure you want to delete this asset?")) return;

          fetch(`${API}/delete.php`, {
               method: "DELETE",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify({ id }),
          })
               .then((res) => res.json())
               .then((data) => {
                    if (data.success) {
                         setRows(rows.filter((r) => r.id !== id));
                    } else {
                         alert("Delete failed!");
                    }
               })
               .catch((err) => console.error("Delete error:", err));
     };

     // Edit Function
     const handleEdit = (row) => {
          navigate("/AssetForm", { state: { editData: row } });
     };

     // Excel Export Function
     const exportToExcel = () => {
          const formattedData = rows.map((row) => ({
               "Rack ID": row.rack_id,
               "IP Address": row.ip_address,
               "Asset Type": row.asset_type,
               "Rack Tier": row.rack_tier,
               "Responsible Person": row.responsible_person,
               "Phone Number": row.phone_number,
          }));

          const worksheet = XLSX.utils.json_to_sheet(formattedData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Assets");

          const excelBuffer = XLSX.write(workbook, {
               bookType: "xlsx",
               type: "array",
          });

          const fileData = new Blob([excelBuffer], {
               type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });

          saveAs(fileData, "Asset_Dashboard.xlsx");
     };

     return (
          <div className="asset-dash-page">
               <div className="DSI">
                    <div className="DDSI">
                         <div className="CR7">{filteredRows.length}</div>

                         <h1 className="GG">Current amount of Assets</h1>

                         <button onClick={() => navigate("/AssetForm")} className="PP">
                              <img src={AddForm} alt="Logo" width="25" className="AddForm" />
                              Add New Asset
                         </button>

                         <input
                              className="SearchBar"
                              type="text"
                              placeholder="Search.........."
                              value={query}
                              onChange={handleChange}
                         />

                         <button onClick={exportToExcel} className="COMO">
                              <img src={ExcelLogo} alt="Logo" width="25" className="ExcelLog" />
                              Export Excel Sheet
                         </button>
                    </div>
               </div>

               <div className="NNCC">
                    <div className="SSJ">
                         <h1 className="ADash">Asset Dashboard</h1>
                         <hr className="hlog" />
                    </div>

                    <table>
                         <thead className="TWR">
                              <tr>
                                   <th className="Hira">Rack ID</th>
                                   <th className="Hira">IP Address</th>
                                   <th className="Hira">Asset Type</th>
                                   <th className="Hira">Rack Tier</th>
                                   <th className="Hira">Responsible Person</th>
                                   <th className="Hira">R.P Phone Number</th>
                                   <th className="Hira">Actions</th>
                              </tr>
                         </thead>

                         <tbody className="Bun">
                              {filteredRows.map((row) => (
                                   <tr key={row.id}>
                                        <td>{row.rack_id}</td>
                                        <td>{row.ip_address}</td>
                                        <td>{row.asset_type}</td>
                                        <td>{row.rack_tier}</td>
                                        <td>{row.responsible_person}</td>
                                        <td>{row.phone_number}</td>
                                        <td>
                                             <button
                                                  className="edit-btn"
                                                  onClick={() => handleEdit(row)}
                                             >
                                                  Edit
                                             </button>

                                             <button
                                                  className="delete-btn"
                                                  onClick={() => handleDelete(row.id)}
                                             >
                                                  Remove
                                             </button>
                                        </td>
                                   </tr>
                              ))}
                         </tbody>
                    </table>
               </div>
          </div>
     );
}

export default AssetDash;