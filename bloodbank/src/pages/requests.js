import React, { useState, useEffect } from 'react';

// api for requests
const ElementList = () => {
    const [elements, setElements] = useState([]);
  
    useEffect(() => {
      // Fetch data from the API
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/pages',{
            method: 'GET',
            },
          ); // Replace with your API endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          setElements(data); // Update the state with the fetched data
        } catch (error) {
          console.error('Error fetching data:', error);
          // Handle errors
        }
      };
  
      fetchData(); // Call the fetch function when the component mounts
    }, []);

    return (
        <div>
          <h2>List of Requests</h2>
          <ul>
            {elements.map((element) => (
              <ElementItem key={element.id} {...element} />
            ))}
          </ul>
        </div>
      );
    };

const ElementItem = ({ id, name, description }) => (
    <li>
        <strong>{id}</strong> - {name} - {description}
    </li>
    );
    
export default ElementList;