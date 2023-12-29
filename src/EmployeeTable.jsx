import React, { useState , useEffect, memo } from 'react';
import DeleteConfirmForm from "./DeleteConfirmForm.jsx";
import EditEmployeeForm from './EditEmployeeForm.jsx';
import './myStyles.css';

const EmployeeTable = memo(({ employees , selectedYear }) => {   
    const [selectedEmployee, setSelectedEmployee] = useState(
        {
            id: 0,
            firstName: "",
            lastName: "",
            spring1: false,
            spring2: false,
            spring3: false,
            fall1: false,
            fall2: false,
            fall3: false,
            startYear: (new Date()).getFullYear()
        }
    );
    // Create a separate array for display purposes
    const [displayEmployees, setDisplayEmployees] = useState([]);

    const handleSelectedEmployee = async (employee) => {
    return new Promise((resolve) => {
        setSelectedEmployee(employee);
        resolve();
    });
    };

    useEffect(() => {   // Log the selectedEmployee when it changes for bug fixing**************
        console.log("selectedEmployee updated:", selectedEmployee);
    }, [selectedEmployee]);

    useEffect(() => {   // Initialize displayEmployees with the data from employees when employees changes
    setDisplayEmployees([...employees]);
    }, [employees]);

    useEffect(() => {   // Update displayEmployees when selectedYear changes, or an employee's startYear changes
        const flipAndFilterEmployee = (employee) => {
            if (employee.startYear <= selectedYear) {    // Filter out employees who were not working yet
                if (employee.startYear % 2 != selectedYear % 2) {
                    return {
                        ...employee,
                        spring1: !employee.spring1,
                        spring2: !employee.spring2,
                        spring3: !employee.spring3,
                        fall1: !employee.fall1,
                        fall2: !employee.fall2,
                        fall3: !employee.fall3,
                    };
                }
                return employee;
            }
            return null;
        };
        // Update the displayEmployees array based on the employees data
        const updatedDisplayEmployees = employees.map((employee) => flipAndFilterEmployee(employee)).filter((employee) => employee !== null); //filter out null employees
        setDisplayEmployees(updatedDisplayEmployees);
    }, [selectedYear, employees]);
    
    return (
        <>
            <table className="table table-striped table-bordered table-hover custom-font-size">
                <thead>
                    <tr>
                        <th className='table-color'>ID</th>
                        <th className='table-color'>First Name</th>
                        <th className='table-color'>Last Name</th>
                        <th className='table-color'>New Years Day</th>
                        <th className='table-color'>Memorial Day</th>
                        <th className='table-color'>July 4th</th>
                        <th className='table-color'>Halloween</th>
                        <th className='table-color'>Thanksgiving</th>
                        <th className='table-color'>Christmas</th>
                        <th className='table-color'>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {displayEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td className='table-color'>{employee.id}</td>
                            <td className='table-color'>{employee.firstName}</td>
                            <td className='table-color'>{employee.lastName}</td>
                            <td className={`light-${employee.spring1 ? 'green' : 'red'}-bg`}>
                                {employee.spring1 ? 'Yes: Working' : 'No: Off'}
                            </td>
                            <td className={`light-${employee.spring2 ? 'green' : 'red'}-bg`}>
                                {employee.spring2 ? 'Yes: Working' : 'No: Off'}
                            </td>
                            <td className={`light-${employee.spring3 ? 'green' : 'red'}-bg`}>
                                {employee.spring3 ? 'Yes: Working' : 'No: Off'}
                            </td>
                            <td className={`light-${employee.fall1 ? 'green' : 'red'}-bg`}>
                                {employee.fall1 ? 'Yes: Working' : 'No: Off'}
                            </td>
                            <td className={`light-${employee.fall2 ? 'green' : 'red'}-bg`}>
                                {employee.fall2 ? 'Yes: Working' : 'No: Off'}
                            </td>
                            <td className={`light-${employee.fall3 ? 'green' : 'red'}-bg`}>
                                {employee.fall3 ? 'Yes: Working' : 'No: Off'}
                            </td>
                            <td className='table-color center-buttons'> 
                                {/* Edit button -- reveals editModal located below */}
                                <button
                                    type="button" className="btn btn-primary custom-rmargin1" data-bs-toggle="modal" data-bs-target="#editModal" 
                                    onClick={async () => {
                                        const originalEmployee = employees.find(e => e.id === employee.id);
                                        await handleSelectedEmployee(originalEmployee);
                                        }}>
                                        Edit
                                </button>
                                {/* Edit modal/form */}
                                <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Employee</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <>
                                                <EditEmployeeForm employee={selectedEmployee}/>
                                                {console.log("Rendering Edit Modal Body")}
                                                </>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Delete modal/confirmation */}
                                <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Delete Employee</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <>
                                                <DeleteConfirmForm employee={selectedEmployee}/>
                                                {console.log("Rendering Del Modal Body")}
                                                </> 
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Delete button -- reveals deleteModal located above */}
                                <button 
                                    type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal"
                                    onClick={async () => {
                                        const originalEmployee = employees.find(e => e.id === employee.id);
                                        await handleSelectedEmployee(originalEmployee);}}>
                                    X   
                                </button>

                            </td> 
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
});

export default EmployeeTable;