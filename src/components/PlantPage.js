import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch plants data from the API on initial load
  useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/67310d29ad19ca34f8c79e95', {
      headers: {
        'X-Master-Key': '$2a$10$xHindAX3fB2XeqxAwtMe0eL6Y3DkuHFK2mard9mYpXo298FkaiOj.',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setPlants(data.record.plants); // Set the fetched plants
      })
      .catch(error => console.error("Error fetching plants data:", error));
  }, []);

  // Filter plants based on search term
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new plant to both state and update the API
  const handleAddPlant = (newPlant) => {
    const updatedPlants = [...plants, newPlant];

    // Update the local state
    setPlants(updatedPlants);

    // Update the plants on the server
    fetch('https://api.jsonbin.io/v3/b/67310d29ad19ca34f8c79e95', {
      method: "PUT", // Use PUT to update the entire record
      headers: {
        'X-Master-Key': '$2a$10$xHindAX3fB2XeqxAwtMe0eL6Y3DkuHFK2mard9mYpXo298FkaiOj.',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ plants: updatedPlants }) // Send the updated plant list
    })
      .then(response => response.json())
      .then(data => console.log("Updated plants data:", data))
      .catch(error => console.error("Error updating plants data:", error));
  };

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search onSearchChange={(term) => setSearchTerm(term)} />
      <PlantList plants={filteredPlants} />
    </main>
  );
}

export default PlantPage;
