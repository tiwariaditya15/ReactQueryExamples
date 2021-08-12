import axios from "axios";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route, useParams, Link } from "react-router-dom";
function Users() {
  const [users, setUsers] = useState([]);
  async function fetchUsers() {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    setUsers(data);
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  console.log({ users });
  return (
    <>
      {users.length &&
        users.map((user) => (
          <section>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </section>
        ))}
    </>
  );
}

function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  async function fetchUser() {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    setUser(data);
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Link to="/">Home</Link>
      {!user && <h4>Loading...</h4>}
      {user && <h4>{user.name}</h4>}
      {user && <h4>{user.username}</h4>}
      {user && <h4>{user.email}</h4>}
      {user && <h4>{user.website}</h4>}
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
