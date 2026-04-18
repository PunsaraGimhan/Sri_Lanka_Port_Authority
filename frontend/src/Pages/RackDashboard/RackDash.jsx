import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./RackDash.css";
import ExcelLogo from "./excel.png";
import AddForm   from "./add.png";
import bgImage   from "./Rack_image.jpg";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function RackDash() {
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

  const [rows,  setRows]  = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost/Port_Authority/backend/api/rack/read.php")
      .then((res) => res.json())
      .then((data) => setRows(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [location.key]);

  const handleChange = (e) => setQuery(e.target.value.toLowerCase());

  const filteredRows = rows.filter((row) =>
    (row.rack_name + " " + row.location).toLowerCase().includes(query)
  );

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this rack?")) return;

    fetch("http://localhost/Port_Authority/backend/api/rack/delete.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result === "success") {
          setRows((prev) => prev.filter((row) => row.id !== id));
        } else {
          alert("Delete failed: " + (data.message || "Unknown error"));
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleEdit = (row) => {
    navigate("/RackForm", { state: { editData: row } });
  };

  // Export function
  const handleExport = () => {
    if (rows.length === 0) {
      alert("No data to export!");
      return;
    }

    const exportData = rows.map((row) => ({
      "ID"        : row.id,
      "Rack Name" : row.rack_name,
      "Location"  : row.location,
      "Created At": row.created_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook  = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Racks");

    worksheet["!cols"] = [
      { wch: 8  },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData    = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, "Rack_List.xlsx");
  };

  return (
    <div className="asset-dash-page">
      <div className="DSI">
        <div className="DDSI">
          <div className="Real">{filteredRows.length}</div>

          <h1 className="GG">Current amount of Racks</h1>

          <button onClick={() => navigate("/RackForm")} className="PP">
            <img src={AddForm} alt="Add" width="25" className="AddForm" />
            Add New Rack
          </button>

          <input
            className="SearchBar"
            type="text"
            placeholder="Search.........."
            value={query}
            onChange={handleChange}
          />

          {/* ✅ onClick add කළා */}
          <button className="COMO" onClick={handleExport}>
            <img src={ExcelLogo} alt="Excel" width="25" className="ExcelLog" />
            Export Excel Sheet
          </button>
        </div>
      </div>

      <div className="NNCC">
        <div className="SSJ">
          <h1 className="ADash">Rack Dashboard</h1>
          <hr className="hlog" />
        </div>

        <table>
          <thead className="TWR">
            <tr>
              <th>Rack Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody className="DOC">
            {filteredRows.map((row) => (
              <tr key={row.id}>
                <td>{row.rack_name}</td>
                <td>{row.location}</td>
                <td>
                  <button className="edit-btn"   onClick={() => handleEdit(row)}>
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

export default RackDash;