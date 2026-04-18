import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import Excel from "./xls.png";
import ExcelExport from "./export.png";
import bgImage from './DashBoard_image.webp';

const Dashboard = () => {
     const navigate = useNavigate();

     useEffect(() => {
          document.body.style.backgroundColor = "#0f172a";
          document.body.style.backgroundImage = `url(${bgImage})`;
          document.body.style.backgroundSize = "cover";
          document.body.style.backgroundPosition = "center";
          document.body.style.backgroundRepeat = "no-repeat"; 
          document.body.style.backgroundAttachment = "fixed";

          return () => {
               document.body.style.backgroundImage = "";
               document.body.style.backgroundColor = "";
          };
     }, []);

     return (

          <div>
               <div><h1 className="DashText">DashBoard</h1></div>
               <div className="excelboard">
                    <h1 className="Head">View & Export the Excel Sheet's</h1>
                    <hr className="line"/>
                    <div className="boards-container">
                         <div className="boardfile">
                              <div className="board">
                                   <img src={Excel} alt="Logo" width="40" className="AddForm" />
                                   <h2>Rack <br/> Excel Sheet</h2>
                              </div>

                              <div className="boardbar">
                                   <div className="Expor">
                                        <img src={ExcelExport} alt="Logo" width="25" className="AddForm" />
                                        <h2>Export Rack <br/> Excel Sheet</h2>
                                   </div>
                              </div>
                         </div>
                         <div>
                              <div className="board">
                                   <img src={Excel} alt="Logo" width="40" className="AddForm" />
                                   <h2>Asset <br/> Excel Sheet</h2>
                              </div>

                              <div className="boardbar">
                                   <div className="Expor">
                                        <img src={ExcelExport} alt="Logo" width="25" className="AddForm" />
                                        <h2>Export Asset <br/> Excel Sheet</h2>
                                   </div>
                              </div>
                         </div>
                         <div>
                              <div className="board">
                                   <img src={Excel} alt="Logo" width="40" className="AddForm" />
                                   <h2>Asset Type <br/> Excel Sheet</h2>
                              </div>

                              <div className="boardbar">
                                   <div className="Expor">
                                        <img src={ExcelExport} alt="Logo" width="25" className="AddForm" />
                                        <h2>Export A.Type <br/> Excel Sheet</h2>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     );
};
export default Dashboard;