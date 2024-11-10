import React, { useState } from "react";

function NewPlantForm({ onAddPlant }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlant = { name, image, price: parseFloat(price), inStock: true };

    // Post new plant to the server
    fetch("https://api.jsonbin.io/v3/b/67310d29ad19ca34f8c79e95", {
      method: "PUT", // Use PUT to update the entire record
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": "$2a$10$xHindAX3fB2XeqxAwtMe0eL6Y3DkuHFK2mard9mYpXo298FkaiOj.",
      },
      body: JSON.stringify({ plants: newPlant }), // Send the new plant
    })
      .then((response) => response.json())
      .then((data) => {
        onAddPlant(newPlant); // Update state in PlantPage with the new plant
        setName(""); // Clear the form
        setImage("");
        setPrice("");
      })
      .catch((error) => console.error("Error adding new plant:", error));
  };

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Plant name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          type="number"
          name="price"
          step="0.01"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
