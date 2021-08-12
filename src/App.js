import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Routes, Route, useParams, Link } from "react-router-dom";
function Users() {
  const { data } = useQuery("users", () =>
    fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res.json()
    )
  );
  console.log({ data });
  return (
    <>
      {data &&
        data.map((user) => (
          <section>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </section>
        ))}
    </>
  );
}

function User() {
  const { id } = useParams();
  const { data } = useQuery(`/user/${id}`, () =>
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) =>
      res.json()
    )
  );
  return (
    <>
      <Link to="/">Home</Link>
      {!data && <h4>Loading...</h4>}
      {data && <h4>{data.name}</h4>}
      {data && <h4>{data.dataname}</h4>}
      {data && <h4>{data.email}</h4>}
      {data && <h4>{data.website}</h4>}
    </>
  );
}

export default function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/user/:id" element={<User />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}
