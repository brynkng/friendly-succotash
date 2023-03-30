import { useState } from "react";
import "./App.css";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <div className="Login App">
      {loggedIn ? <h1>Logged In!</h1> : <Login setLoggedIn={setLoggedIn} />}
    </div>
  );
}

export default App;
