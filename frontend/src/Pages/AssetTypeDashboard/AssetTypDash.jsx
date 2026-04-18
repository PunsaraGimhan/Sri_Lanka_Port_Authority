import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AssetTypDash.css";
import ExcelLogo from "./excel.png";
import AddForm from "./add.png";
import bgImage   from "./Asset_Type_image.webp";

const API = "http://localhost/Port_Authority/backend/api/assettype";

function AssetTypeDash() {
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

     const loadAssetTypes = () => {
          fetch(`${API}/read.php`)
               .then((res) => res.json())
               .then((data) => setRows(data))
               .catch((err) => console.error("Failed to load asset types:", err));
     };

     useEffect(() => {
          loadAssetTypes();
     }, [location]);

     const handleChange = (e) => {
          setQuery(e.target.value.toLowerCase());
     };

     const filteredRows = rows.filter((row) =>
          Object.values(row).join(" ").toLowerCase().includes(query)
     );

     const handleDelete = (id) => {
          if (!window.confirm("Are you sure you want to delete this asset type?")) return;

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

     const handleEdit = (row) => {
          navigate("/AssetTypeForm", { state: { editData: row } });
     };

     const exportToExcel = () => {
          const formattedData = rows.map((row) => ({
               "Server": row.server,
               "PC": row.pc,
               "Switch Device": row.switch_device,
               "HUB": row.hub,
               "Created At": row.created_at,
          }));

          const worksheet = XLSX.utils.json_to_sheet(formattedData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, "Asset Types");

          const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
          const fileData = new Blob([excelBuffer], {
               type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          });
          saveAs(fileData, "AssetType_Dashboard.xlsx");
     };

     return (
          <div className="asset-dash-page">
               <div className="DSI">
                    <div className="DDSI">
                         <div className="RAMA">{filteredRows.length}</div>

                         <h1 className="GG">Current amount of <br /> Asset Types</h1>

                         <button onClick={() => navigate("/AssetTypeForm")} className="PP">
                              <img src={AddForm} alt="Logo" width="25" className="AddForm" />
                              Add New Asset Type
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
                         <h1 className="ADash">Asset Type Dashboard</h1>
                         <hr className="hlog" />
                    </div>

                    <table>
                         <thead className="TWR">
                              <tr>
                                   <th className="Hira">Server</th>
                                   <th className="Hira">PC</th>
                                   <th className="Hira">Switch Device</th>
                                   <th className="Hira">HUB</th>
                                   <th className="Hira">Created At</th>
                                   <th className="Hira">Actions</th>
                              </tr>
                         </thead>

                         <tbody className="Buffer">
                              {filteredRows.map((row) => (
                                   <tr key={row.id}>
                                        <td>{row.server}</td>
                                        <td>{row.pc}</td>
                                        <td>{row.switch_device}</td>
                                        <td>{row.hub}</td>
                                        <td>{row.created_at}</td>
                                        <td>
                                             <button className="edit-btn" onClick={() => handleEdit(row)}>
                                                  Edit
                                             </button>
                                             <button className="delete-btn" onClick={() => handleDelete(row.id)}>
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

export default AssetTypeDash;