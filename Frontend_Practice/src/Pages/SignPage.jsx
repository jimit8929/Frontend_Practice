import React, { useState } from "react";

const SignPage = () => {
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [ok, setOk] = useState(false);
  const err = {};

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(err).length === 0 && form.email) setOk(true);
  };

  if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
    err.email = "invalid";
  if (form.password && form.password.length < 6) err.password = ">=6 chars";
  if (form.confirm && form.password !== form.confirm) err.confirm = "mismatch";

  console.log(form);

  return (
    <div className="flex items-center p-4 bg-amber-200 h-screen flex-col">
      <h1 className="font-bold text-2xl underline p-4">Sign Up</h1>



      {ok ? (
        <div>Success</div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col p-2 border-2 space-y-4"
        >
          <div className="space-x-4">
            <label className="font-bold text-2xl underline">Email:</label>
            <input
              type={form.email}
              className="border-2 rounded-2xl p-2"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {err.email && <div className="">{err.email}</div>}
          </div>

          <div className="space-x-4">
            <label className="font-bold text-2xl underline">Password:</label>
            <input
              type={form.password}
              className="border-2 rounded-2xl p-2"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            {err.password && <div className="">{err.password}</div>}
          </div>

          <div className="space-x-4">
            <label className="font-bold text-2xl underline">
              Confirm Password:
            </label>
            <input
              type={form.confirm}
              className="border-2 rounded-2xl p-2"
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            />
            {err.confirm && <div className="">{err.confirm}</div>}
          </div>

          <div
            className="border-2 rounded-2xl mx-auto p-2 bg-black text-white hover:scale-110 duration-300 transition-all
          "
          >
            <button type="submit">Create</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignPage;
