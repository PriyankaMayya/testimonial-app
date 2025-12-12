import TestimonialForm from "@/components/testimonialForm";
import { api } from "../../convex/_generated/api";

import { useQuery } from "convex/react";

import { Lock } from "lucide-react";

import MouseFollowOrb from "@/components/mouseFollowOrb";

export default function TestimonialsPage() {
  const isLinkVisible = useQuery(api.settings.getSettings, {
    key: "testimonialLinkVisible",
  });

  if (isLinkVisible === undefined) {
    return (
      <div className="min-h-screen dark:bg-slate-900 bg-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If link is not visible, show access denied message
  if (!isLinkVisible) {
    return (
      <div className="min-h-screen dark:bg-slate-900 bg-white relative overflow-hidden flex items-center justify-center p-4">
        {/* Background decoration */}
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

        {/* Floating orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-r from-red-500/20 to-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-r from-orange-500/20 to-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Access Denied Card */}
        <div className="relative z-10 max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-red-500/20 p-6 rounded-full">
                <Lock className="w-16 h-16 text-red-400" />
              </div>
            </div>

            {/* Message */}
            <h1 className="text-3xl font-bold text-white mb-4">
              Access Restricted
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              The testimonial form is currently not accepting submissions.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              Please check back later or contact the administrator for more
              information.
            </p>

            {/* Back Button */}
            <a
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Go to Login
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-slate-900 bg-white bg-linear-to-br relative overflow-hidden flex items-center justify-center p-4 transition-colors duration-1500">
      <div className="absolute inset-0 opacity-90 dark:opacity-90">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.3) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        ></div>
        <MouseFollowOrb size={200} blur="blur-3xl" delay={0.2} />
      </div>
      <TestimonialForm />
    </div>
  );
}
