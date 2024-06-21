import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: true },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  const [list, setList] = useState(initialItems);

  const addItem = (desc, qty) => {
    const newItem = {
      id: Date.now(),
      description: desc,
      quantity: qty,
      packed: false,
    };
    setList((initialItems) => [...initialItems, newItem]);
  };

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList list={list} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏖️ FAR AWAY 💼</h1>;
}

function Form({ addItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    addItem(description, quantity);

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

function PackingList({ list }) {
  return (
    <div className="list">
      <ul>
        {list.map((item) => (
          <Item
            description={item.description}
            quantity={item.quantity}
            packed={item.packed}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ description, quantity, packed }) {
  return (
    <li>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>💼 You Have X items on your list, and you already packed X (X%)</em>
    </footer>
  );
}
