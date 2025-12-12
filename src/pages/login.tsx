import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "convex/react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../convex/_generated/api";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/themeToggle";
import MouseFollowOrb from "@/components/mouseFollowOrb";
import { Id } from "convex/_generated/dataModel";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const login = useMutation(api.auth.login);
  const navigate = useNavigate();

  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;

  const sessionValid = useQuery(
    api.auth.verifySession,
    admin?.id ? { adminId: admin.id as Id<"admin"> } : "skip",
  );
  //check if testimonial link should be visible
  const isLinkVisible = useQuery(api.settings.getSettings, {
    key: "testimonialLinkVisible",
  });
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (sessionValid?.valid) {
      navigate("/dashboard", { replace: true });
    }
  }, [sessionValid, navigate]);

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
    <div className="min-h-screen bg-white dark:bg-slate-900 relative overflow-hidden flex  items-center justify-center p-4 duration-1500">
      <ThemeToggle />
      {/* Animated background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-100 h-100 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-100 h-100 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div> */}
      <div className="absolute inset-0 opacity-90 dark:opacity-90">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.3) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
      </div>

      <MouseFollowOrb size={200} blur="blur-3xl" delay={0.2} />
      {/* Floating Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-linear-to-r from-blue-300 to-blue-400  dark:from-blue-700 dark:to-blue-800 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-r from-black/40 to-black/45 dark:from-white/40 dark:to- white/50 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* login card */}

      <div className="relative w-full max-w-md  text-black dark:text-white">
        <div className="bg-white backdrop-blur-lg rounded-2xl shadow-2xl border  p-8 dark:bg-slate-800">
          {/* header  */}
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="flex gap-3">
              <Lock className="w-8 h-8" />
              <h1 className="text-3xl font-bold  mb-2">Admin Portal</h1>
            </div>

            <p>Sign in to access your dashboard</p>
          </div>

          {/* Form field  */}
          <div className="space-y-6">
            {/* email field  */}
            <div className="flex flex-col  gap-3">
              <label htmlFor="email" className="block text-sm font-bold">
                EMAIL:
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300  dark:text-gray-500 " />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-black rounded-lg placeholder-gray-300 
                  dark:placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
            {/* password field */}
            <div className="flex flex-col gap-3">
              <label htmlFor="password" className="block text-sm font-bold  ">
                PASSWORD:
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 text-gray-400 h-5 dark:text-gray-500  " />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  className="w-full pl-11 pr-4 py-3 bg-white/5 border border-black rounded-lg  placeholder-gray-300 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 dark:text-gray-500  transition"
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
        {isLinkVisible && (
          <div className="flex items-center justify-center mt-2 text-gray-700 dark:text-white underline">
            <a href="/testimonialForm">
              <p>Testimonial form Link </p>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
