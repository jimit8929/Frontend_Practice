import React, { useEffect, useState } from "react";

const SearchFilter = () => {
  const [post, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [user, setUser] = useState("all");
  const [sortDir, setSortDir] = useState("asc");

  useEffect(() => {
    const loadData = async () => {
      const resPosts = await fetch(
        "https://jsonplaceholder.typicode.com/posts?_limit=50"
      );

      const postsData = await resPosts.json();
      const resUsers = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const usersData = await resUsers.json();

      setUsers(usersData);
      setPosts(
        postsData.map((p) => ({
          ...p,
          username: usersData.find((u) => u.id === p.userId)?.username,
        }))
      );
    };
    loadData();
  }, []);

  const list = post
    .filter((p) => user === "all" || String(p.userId) === user)
    .filter((p) => p.title.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) =>
      sortDir === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h3>Search / Filter / Sort</h3>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Search title…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select value={user} onChange={(e) => setUser(e.target.value)}>
          <option value="all">All users</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>
        <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
          <option value="asc">A→Z</option>
          <option value="desc">Z→A</option>
        </select>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {list.map((p) => (
          <li key={p.id} style={{ padding: 8, borderBottom: "1px solid #eee" }}>
            <strong>{p.title}</strong>
            <div style={{ fontSize: 13, color: "#555" }}>by {p.username}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFilter;
