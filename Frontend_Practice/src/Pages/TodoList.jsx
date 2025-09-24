import { useEffect, useState } from "react";

const TodoList = () => {
  const key = "mini_crud_v1";
  const [items, setItems] = useState(() =>
    JSON.parse(localStorage.getItem(key) || "[]")
  );
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(items));
  }, [items]);

  const add = () => {
    if (!text.trim()) return;
    if (editId) {
      setItems(items.map((i) => (i.id === editId ? { ...i, text } : i)));
      setEditId(null);
    } else {
      setItems([{ id: Date.now(), text }, ...items]);
    }
    setText("");
  };
  const del = (id) => setItems(items.filter((i) => i.id !== id));
  const startEdit = (it) => {
    setEditId(it.id);
    setText(it.text);
  };

  return (
    <div style={{ padding: 16, maxWidth: 640 }}>
      <h3>Simple CRUD</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="title"
          style={{ flex: 1 }}
        />
        <button onClick={add}>{editId ? "Save" : "Add"}</button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setText("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((it) => (
          <li
            key={it.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: 8,
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{it.text}</span>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => startEdit(it)}>Edit</button>
              <button onClick={() => del(it.id)}>Del</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
