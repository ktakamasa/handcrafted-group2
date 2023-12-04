import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [usernameExistsError, setUsernameExistsError] = useState<string>("");

  const isPasswordValid = (password: string): boolean => {
    const requirementsRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return requirementsRegex.test(password);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
    // Clear the usernameExistsError when the username is changed
    setUsernameExistsError("");
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError(
      isPasswordValid(newPassword)
        ? ""
        : "Password must contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and be at least 8 characters long."
    );
  };

  const handleUserTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setUserType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (passwordError || loading) {
      console.log(
        "Invalid password or already processing. Please fix the errors."
      );
      return;
    }

    setLoading(true);

    try {
      // Check if username already exists
      const usernameExistsResponse = await fetch(
        `/api/users?username=${username}`
      );

      if (!usernameExistsResponse.ok) {
        console.error(
          "Failed to check username existence. Server response:",
          usernameExistsResponse.statusText
        );
        setUsernameExistsError("Failed to check username existence.");
        return;
      }

      const existingUsers = await usernameExistsResponse
        .json()
        .catch((error) => {
          console.error("Error parsing username existence response:", error);
          setUsernameExistsError("Failed to check username existence.");
          return [];
        });
      const usernameAlreadyExists = existingUsers.some(
        (user: any) => user.username === username
      );

      if (usernameAlreadyExists) {
        setUsernameExistsError(
          "Username already exists. Please choose a different username."
        );
        return;
      } else {
        setUsernameExistsError(""); // Clear the error message if the username is unique
      }

      // If the username is unique, create user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          userType,
          email,
          address,
          city,
          phone,
          photo,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User created:", data?.user?.username);
        router.push("/login");
      } else {
        console.error(
          "Failed to create user. Server response:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
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
          className="mt-1 p-2 w-full border rounded-md"
          aria-describedby="username-error"
        />
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
            passwordError ? "border-red-500" : ""
          }`}
          aria-describedby="password-error"
        />
        {passwordError && (
          <p id="password-error" className="text-sm text-red-500 mt-1">
            {passwordError}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="userType"
          className="block text-sm font-medium text-gray-600"
        >
          User Type:
        </label>
        <select
          id="userType"
          name="userType"
          value={userType}
          onChange={handleUserTypeChange}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="">Select...</option>
          <option value="Buyer">Buyer</option>
          <option value="Seller">Seller</option>
        </select>
      </div>

      {usernameExistsError && (
        <p id="username-error" className="text-sm text-red-500 my-2">
          {usernameExistsError}
        </p>
      )}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
