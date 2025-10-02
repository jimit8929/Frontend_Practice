import { useEffect, useState } from "react";

export default function TodoList() {
  const STORAGE_KEY = "mini_crud_v1";
  const [items, setItems] = useState(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]")
  );
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const handleSave = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (editId !== null) {
      setItems((prev) =>
        prev.map((it) => (it.id === editId ? { ...it, text: trimmed } : it))
      );
      setEditId(null);
    } else {
      setItems((prev) => [{ id: Date.now(), text: trimmed }, ...prev]);
    }
    setText("");
  };

  const handleDelete = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const startEdit = (item) => {
    setEditId(item.id);
    setText(item.text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditId(null);
      setText("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h3 className="text-xl font-semibold mb-4 text-center">Todo List</h3>

      <div className="flex gap-2 mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your todo..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {editId !== null ? "Save" : "Add"}
        </button>
        {editId !== null && (
          <button
            onClick={() => {
              setEditId(null);
              setText("");
            }}
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>

      <ul className="space-y-2">
        {items.map((it) => (
          <li
            key={it.id}
            className="flex justify-between items-center px-4 py-2 border rounded-lg shadow-sm"
          >
            <span>{it.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(it)}
                className="px-3 py-1 text-sm bg-yellow-400 text-white rounded-md hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(it.id)}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
