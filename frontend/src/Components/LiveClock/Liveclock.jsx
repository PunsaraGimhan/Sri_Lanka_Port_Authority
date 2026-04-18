import React, { useState, useEffect } from "react";
import "./Liveclock.css";

function formatDate(date, locale = undefined, options = {}) {
  return new Intl.DateTimeFormat(locale, options).format(date);
}

export default function LiveClock({ showColombo = true, use24Hour = true }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !use24Hour,
  };
  const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  let colomboTime = null;
  let colomboDate = null;
  if (showColombo) {
    try {
      const colomboDateObj = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Colombo" })
      );
      colomboTime = formatDate(colomboDateObj, undefined, timeOptions);
      colomboDate = formatDate(colomboDateObj, undefined, dateOptions);
    } catch (e) {

      colomboTime = "N/A";
      colomboDate = "N/A";
    }
  }

  return (
    <div className="live-clock">
      {showColombo && (
        <div className="clock-card">
          <h3>Sri Lanka/Colombo</h3>
          <div className="time">{colomboTime}</div>
          <div className="date">{colomboDate}</div>
        </div>
      )}
    </div>
  );
}