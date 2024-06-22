import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onCheckItem,
  onDeleteAllItem
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItem;

  if (sortBy === "input") sortedItem = items;

  if (sortBy === "description")
    sortedItem = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItem = items
      .slice()
      .sort((a, b) => Number(b.packed) - Number(a.packed));

  return (
    <div className="list">
      {sortedItem.length !== 0 ? (
        <>
          <ul>
            {sortedItem.map((item) => (
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
          <div className="actions">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="input">Sort by input order</option>
              <option value="description">Sort by description</option>
              <option value="packed">Sort by packed status</option>
            </select>
            <button onClick={onDeleteAllItem}>Clear List</button>
          </div>
        </>
      ) : (
        <div>
          <h3>Packing List is Empty...</h3>
        </div>
      )}
    </div>
  );
}
