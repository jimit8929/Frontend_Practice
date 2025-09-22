import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [user, setUsers] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const userRes = await fetch("https://api.github.com/users/shrey");
        if (!userRes.ok) throw new Error("User fetch failed");

        const userData = await userRes.json();
        setUsers(userData);

        const reposRes = await fetch(
          "https://api.github.com/users/shrey/repos"
        );
        if (!reposRes.ok) throw new Error("Repos fetch failed");

        const reposData = await reposRes.json();
        setRepos(reposData);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  {
    loading && <div>Fetching Data...</div>;
  }
  {
    error && <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />

      {user && (
        <div className="bg-emerald-300">
          <div className="p-4 flex items-center justify-center">
            <div className="flex-col border-2 p-4 space-y-4">
              <div className="flex items-center justify-start border-2 p-2 rounded-2xl gap-4">
                <img
                  src={user.avatar_url}
                  alt="avatar_url"
                  className="h-12 w-12 rounded-2xl"
                />{" "}
                {user.name}
              </div>

              <div className="border-2 rounded-2xl flex items-center justify-start p-2">
                {user.location}
              </div>

              <div className="border-2 rounded-2xl flex items-center justify-center p-2">
                <p className="text-start">{user.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {repos.length > 0 && (
        <div className="flex items-center justify-center py-4 bg-emerald-300">
          <div className="w-full max-w-3xl space-y-2">
            <h2 className="text-xl font-semibold mb-2">Repositories</h2>
            <ul className="space-y-2">
              {repos.map((repo) => (
                <li
                  className="border p-3 rounded-lg bg-white flex justify-between items-center"
                  key={repo.id}
                >
                  <div className="">
                    <Link
                      to={repo.html_url}
                      className="font-medium hover:underline"
                    >
                      {repo.name}
                    </Link>

                    <p className="text-sm text-gray-600">
                      {repo.description ?? "No Description"}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingPage;
