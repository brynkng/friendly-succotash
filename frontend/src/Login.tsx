import React, { useState } from "react";
import axios, { AxiosError } from "axios";

export const LOGIN_URL = process.env.REACT_APP_HOST + "/login";

export const Login = ({
  setLoggedIn,
}: {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const validateInput = (username: string, password: string) => {
    if (!username || !password) {
      setMessage("Username and password are required!");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInput(username, password)) {
      return;
    }

    try {
      await axios.post(LOGIN_URL, {
        username,
        password,
      });
      setLoggedIn(true);
    } catch (e: AxiosError | any) {
      if (axios.isAxiosError(e)) {
        e = e as AxiosError;
        setMessage(e.response?.data?.error);
      } else {
        throw e;
      }
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;
