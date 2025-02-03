/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import ItemList from "./components/ItemList";

const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_URI);
      if (!response.ok) {
        alert(`Error: ${response.status}`);
      }
      const data = await response.json();
      setItems(data);
    } catch (err) {
      alert(err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        alert(`Delete failed: ${response.status}`);
      }
      const deletedItem = await response.json();
      setItems(items.filter(item => item.id !== deletedItem.id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <ItemList items={items} onDelete={deleteItem} />
    </div>
  );
}



export default App;
