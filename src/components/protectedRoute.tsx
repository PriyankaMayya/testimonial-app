import { api } from "../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;

  const sessionValid = useQuery(
    api.auth.verifySession,
    admin?.id ? { adminId: admin.id as Id<"admin"> } : "skip",
  );

  useEffect(() => {
    if (!admin) {
      navigate("/", { replace: true });
      return;
    }
    if (sessionValid !== undefined && !sessionValid?.valid) {
      localStorage.removeItem("admin");
      navigate("/", { replace: true });
    }
  }, [admin, sessionValid, navigate]);

  // Show loading while verifying
  if (!admin || sessionValid === undefined) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Verifying session...</div>
      </div>
    );
  }

  if (!sessionValid?.valid) {
    return null;
  }

  //session valid, render protected content
  return <>{children}</>;
}
