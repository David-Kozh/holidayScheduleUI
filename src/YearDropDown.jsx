import React from 'react';

function YearDropDown({ selectedYear, onYearChange }) {
    
    const handleYearChange = (event) => {
        const newYear = parseInt(event.target.value);
        onYearChange(newYear);
    };

    return (
        <div>
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedYear}
                </button>
                <ul className="dropdown-menu">
                    {Array.from({ length: 11 }, (_, i) => {
                    const year = new Date().getFullYear() + i - 5;
                    return (
                        <li key={year}>
                        <button className="dropdown-item" onClick={() => handleYearChange({ target: { value: year } })}>
                            {year}
                        </button>
                        </li>
                    );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default YearDropDown;

/*
                <select id="selectselectedYear" name="selectselectedYear" value={selectedYear} onChange={handleYearChange}>
                {Array.from({ length: 11 }, (_, i) => {
                    const year = new Date().getFullYear() + i - 5;
                    return (
                    <option key={year} value={year}>
                        {year}
                    </option>
                    );
                })}
                </select>
 */