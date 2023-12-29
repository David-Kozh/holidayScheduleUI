import React from 'react';
import { render, screen } from '@testing-library/react';
import EmployeeListContainer from './src/EmployeeListContainer.jsx';  // component to test
import fetchMock from 'jest-fetch-mock'; // Import fetchMock
fetchMock.enableMocks();

const mockData = [
    {
        id: 1,
        lastName: 'Doe',
        firstName: 'John',
        spring1: true,
        spring2: false,
        spring3: true,
        winter1: false,
        winter2: true,
        winter3: false,
      },
      {
        id: 2,
        lastName: 'Smith',
        firstName: 'Jane',
        spring1: false,
        spring2: true,
        spring3: false,
        winter1: true,
        winter2: false,
        winter3: true,
      }
];

test('renders data fetched from the API', async () => {
  // Mock the fetch response for a specific URL
  fetchMock.mockOnce(JSON.stringify(mockData));

  // Render component
  render(<EmployeeListContainer/>);

  // Wait for the component to load and display data
  const dataElement = await screen.findByText('John Doe'); // Expected output

  // Assert that the data is displayed correctly
  expect(dataElement).toBeInTheDocument();
});