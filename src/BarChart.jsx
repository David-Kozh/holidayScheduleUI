import React from 'react';
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ['New Years Day', 'Memorial Day', 'July 4th', 'Halloween', 'Thanksgiving', 'Christmas'];

const BarChart = ({employees, selectedYear}) => {
  //const [displayEmployees, setDisplayEmployees] = useState([...employees]);

  const [data, setData] = useState({
      labels: labels,
      datasets: [
        {
          data: 0,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',  // Bar 1
            'rgba(54, 162, 235, 0.5)',  // Bar 2
            'rgba(255, 206, 86, 0.5)',  // Bar 3
            'rgba(75, 192, 192, 0.5)',  // Bar 4
            'rgba(153, 102, 255, 0.5)', // Bar 5
            'rgba(255, 159, 64, 0.5)'   // Bar 6
        ],
          borderColor: 'rgba(192, 192, 192, 1)',
          borderWidth: 1,
        },
      ]
  });
  const [options, setOptions] = useState({});


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


  useEffect(() => {
    const displayEmployees = employees.map((employee) => flipAndFilterEmployee(employee)).filter((employee) => employee !== null);
    // Process the data to calculate counts for each category
    const categoryCounts = {
      spring1: displayEmployees.filter(emp => emp.spring1).length,
      spring2: displayEmployees.filter(emp => emp.spring2).length,
      spring3: displayEmployees.filter(emp => emp.spring3).length,
      fall1: displayEmployees.filter(emp => emp.fall1).length,
      fall2: displayEmployees.filter(emp => emp.fall2).length,
      fall3: displayEmployees.filter(emp => emp.fall3).length,
    };
    // Set the data for the chart
    const chartData = {
      labels: labels,
      datasets: [
        {
          data: Object.values(categoryCounts),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',  // Bar 1
            'rgba(54, 162, 235, 0.5)',  // Bar 2
            'rgba(255, 206, 86, 0.5)',  // Bar 3
            'rgba(75, 192, 192, 0.5)',  // Bar 4
            'rgba(153, 102, 255, 0.5)', // Bar 5
            'rgba(255, 159, 64, 0.5)'   // Bar 6
        ],
          borderColor: 'rgba(192, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
    // Set the options for the chart
    const chartOptions = {
      type: 'bar',
      scales: {
        y: {
          max: Math.max(...Object.values(categoryCounts)) + 1, // Set the max value to the highest count + 1
          min: 0,
          ticks: {
              stepSize: 1
          }
        }
      },
      borderWidth: 2,
      borderColor: 'black',
      plugins: {
        title: {
          display: true,
          text: 'Employee Availability by Holiday',
          font: {
            size: 20
          }
        },
        legend: {
          display: false,
        }
      }
    };
    setData(chartData);
    setOptions(chartOptions);
    console.log(selectedYear); // TODO: Bug fixing: Being called too many times
  }, [selectedYear, employees]);

  return(<Bar options={options} data={data} />);
};

export default BarChart;

/*

*/