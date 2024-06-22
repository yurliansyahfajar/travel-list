export default function Stats({ items }) {
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
