import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = useMutation(api.auth.login);
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const admin = await login({ email, password });
      localStorage.setItem("admin", JSON.stringify(admin));
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
      setError("Invalid credentials");
      console.error(error);
    }
  }
  return (
    <div className="min-h-screen bg-linear-to-br  relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-100 h-100 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div> */}

      {/* login card */}

      <div className="relative w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* header  */}
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="flex gap-3">
              <Lock className="w-8 h-8 text-white" />
              <h1 className="text-3xl font-bold text-white mb-2">
                Admin Portal
              </h1>
            </div>

            <p className="text-gray-300">Sign in to access your dashboard</p>
          </div>

          {/* Form field  */}
          <div className="space-y-6">
            {/* email field  */}
            <div className="flex flex-col  gap-3">
              <label
                htmlFor="email"
                className="block text-sm font-bold text-gray-200 "
              >
                EMAIL:
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
            {/* password field */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-200 "
              >
                PASSWORD:
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full py-3 px-4 mt-5 bg-linear-to-r bg-blue-600  hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              size="lg"
            >
              Sign In
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-2 text-gray-500 underline">
          <a href="/testimonialForm">
            <p>Testimonial form Link </p>
          </a>
        </div>
      </div>
    </div>
  );
}
