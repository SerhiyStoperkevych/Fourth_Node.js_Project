import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    setNewItem(e.target.value);
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const addItem = async () => {
    if (!newItem.trim()) {
      alert('Item name cannot be empty');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3001/api/items', {
        id: Date.now(),
        name: newItem
      });
      setItems([...items, response.data]);
      setNewItem('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/items/${id}`);
      setItems(items.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="App">
      <h1>Item Manager</h1>
      <div>
        <input value={newItem} onChange={handleChange} />
        <button onClick={addItem}>
          Add Item
        </button>
      </div>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
