import React, { useState , useEffect } from 'react';
import EmployeeListContainer from './EmployeeListContainer.jsx';
import YearDropDown from './YearDropDown.jsx';
import './myStyles.css';

export default function Dashboard({ onLogout }) {

  const [selectedYear, setselectedYear] = useState(new Date().getFullYear());

  const handleYearChange = (newYear) => {
    setselectedYear(newYear);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
  <>
    <div className='custom-margin'>
      <h1 className='appname'>Employee Holiday Schedule</h1>
      <YearDropDown selectedYear={selectedYear} onYearChange={handleYearChange} />
      <button type="button" className="btn btn-outline-secondary logout-button" onClick={handleLogout}>Logout</button>
      <div style={{ marginTop: '0.5%' }}>
      <EmployeeListContainer selectedYear={selectedYear} />
      </div>
    </div>
  </>
  );
}