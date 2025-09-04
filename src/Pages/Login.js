import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (email === "test@test.com" && password === "123456") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/products");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-plum-600">Login</h2>
        
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plum-500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4 relative">
          <label className="block mb-1 text-gray-700 font-medium">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-plum-500 pr-10"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-plum-600 text-white p-3 rounded-lg font-medium hover:bg-plum-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
