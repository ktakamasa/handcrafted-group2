import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [token, setToken] = useState<string | null>(null);

  const isUsernameValid = (username: string): boolean => {
    return username.length > 0;
  };

  const isPasswordValid = (password: string): boolean => {
    const requirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return requirementsRegex.test(password);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const loginUsername = event.target.value;
    setUsername(loginUsername);
    setUsernameError(
      isUsernameValid(loginUsername) ? "" : "Username is invalid"
    );
    // Clear password error when the username changes
    setPasswordError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const loginPassword = event.target.value;
    setPassword(loginPassword);
    setPasswordError("");
    if (submitted) {
      setPasswordError(
        isPasswordValid(loginPassword) ? "" : "Password is incorrect"
      );
    }
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (!isUsernameValid(username) || !isPasswordValid(password)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://handcrafted-group2.vercel.app/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Logged in:", data.username);
        setToken(data.token);
        router.push("/");
      } else {
        const errorMessage = await response.text();
        console.error("Failed to login. Server response:", errorMessage);
        setPasswordError("Password is incorrect");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {token ? (
        <p>You are logged in. Redirecting...</p>
      ) : (
        <form
          onSubmit={handleLogin}
          className="max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-md"
        >
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                usernameError ? "border-red-500" : ""
              }`}
              aria-describedby="username-error"
            />
            {usernameError && (
              <p id="username-error" className="text-sm text-red-500 mt-1">
                {usernameError}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className={`mt-1 p-2 w-full border rounded-md ${
                passwordError && submitted ? "border-red-500" : ""
              }`}
              aria-describedby="password-error"
            />
            {passwordError && submitted && (
              <p id="password-error" className="text-sm text-red-500 mt-1">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
