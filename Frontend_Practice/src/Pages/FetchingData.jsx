import React, { useEffect, useState } from "react";

const FetchingData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) throw new Error("Data Fetching Failed");

        const userResponse = await response.json();
        setData(userResponse);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  {
    loading && <p>Fetching Data...</p>;
  }

  {
    error && <p className="bg-red-500">{error}</p>;
  }
  return (
    <div>
      <h1>Fetching Data Page</h1>

      {data.map((item) => (
        <div key={item.id}>
          <p>{item.userId}</p>
          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchingData;
