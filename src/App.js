import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
// ];

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const handleCheckItem = (id) => {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onCheckItem={handleCheckItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ FAR AWAY 💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false
    };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ? </h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {[...new Array(20)].map((_, el) => (
          <option value={el + 1} key={el}>
            {el + 1}
          </option>
        ))}
        {/* {Array.from({ length: 20 }, (_, i) => i + 1).map((el) => (
          <option value={el} key={el}>
            {el}
          </option>
        ))} */}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>ADD</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onCheckItem }) {
  return (
    <div className="list">
      {items.length !== 0 ? (
        <ul>
          {items.map((item) => (
            <Item
              description={item.description}
              quantity={item.quantity}
              packed={item.packed}
              id={item.id}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onCheckItem={onCheckItem}
            />
          ))}
        </ul>
      ) : (
        <div>
          <h3>Packing List is Empty...</h3>
        </div>
      )}
    </div>
  );
}

function Item({
  description,
  quantity,
  packed,
  id,
  onDeleteItem,
  onCheckItem
}) {
  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={() => {
          onCheckItem(id);
        }}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
  const numItem = items.length;
  const packedItem = items.filter((item) => item.packed === true).length;
  const packedPercentage = Math.round((packedItem / numItem) * 100);

  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items into your packing list 🚀</em>
      </p>
    );
  }

  return (
    <footer className="stats">
      {packedPercentage !== 100 ? (
        <em>
          💼 You Have {numItem} items on your list, and you already packed{" "}
          {packedItem} ({packedPercentage}%)
        </em>
      ) : (
        <em>You are all packed! and ready to go! ✈️</em>
      )}
    </footer>
  );
}
