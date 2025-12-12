import TestimonialCard from "@/components/testimonialCard";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Eye, EyeOff, LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id } from "convex/_generated/dataModel";
import TestimonialModal from "@/components/testimonialModal";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  //get admin data
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  const adminId = admin?.id as Id<"admin">;

  const testimonials = useQuery(
    api.testimonial.getAllTestimonials,
    adminId ? { adminId } : "skip",
  );
  const approveTestimonial = useMutation(api.testimonial.approveTestimonials);
  const deleteTestimonial = useMutation(api.testimonial.deleteTestimonial);

  const isLinkVisible = useQuery(api.settings.getSettings, {
    key: "testimonialLinkVisible",
  });

  const toggleLinkVisibility = useMutation(api.settings.toggleSettings);
  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const handleApprove = async (id: Id<"testimonials">) => {
    try {
      await approveTestimonial({ testimonialId: id, adminId });
      setSelectedTestimonial(null);
    } catch (error) {
      console.error("Error approving testimonial:", error);
    }
  };

  const handleDelete = async (id: Id<"testimonials">) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial({ testimonialId: id, adminId });
        setSelectedTestimonial(null);
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };
  const handleToggleLink = async () => {
    try {
      await toggleLinkVisibility({ key: "testimonialLinkVisible" });
    } catch (error) {
      console.error("Error toggling link visibility: ", error);
    }
  };

  const filteredTestimonials = testimonials?.filter((t) => {
    if (filter === "pending") return !t.isApproved;
    if (filter === "approved") return t.isApproved;
    return true;
  });
  return (
    <div className="min-h-screen bg-slate-900  relative overflow-hidden  p-4 text-white">
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
      {/* header  */}
      <div className="relative max-w-7xl mx-auto mb-8">
        <div className="bg-black backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-3xl mb-2">Admin Dashboard</h1>
              <p className="text-gray-400">Manage Testimonials and reviews</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500/50 text-red-200  hover:bg-red-500/75 hover:text-white py-2 px-4 rounded-2xl flex gap-2 items-center font-semibold transition duration-1000"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>

          {/* stats  */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
            <div className="bg-amber-50/20 rounded-2xl flex flex-col items-center p-5 gap-2">
              <p className="text-gray-400 text-xl">Total</p>
              <p className="text-2xl font-bold text-white">
                {testimonials?.length || 0}
              </p>
            </div>
            <div className="bg-amber-50/20 rounded-2xl flex flex-col items-center p-5  gap-2">
              <p className="text-gray-400 text-xl">Pending</p>
              <p className="text-2xl font-bold text-white">
                {testimonials?.filter((t) => !t.isApproved).length || 0}
              </p>
            </div>
            <div className="bg-amber-50/20 rounded-2xl flex flex-col items-center p-5  gap-2">
              <p className="text-gray-400 text-xl">Approved</p>
              <p className="text-2xl font-bold text-white">
                {testimonials?.filter((t) => t.isApproved).length || 0}
              </p>
            </div>
          </div>

          {/* Filter  */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2 mt-6">
              <button
                className={`px-4 py-2 rounded-lg transition ${
                  filter === "all"
                    ? "bg-blue-500 text-white"
                    : "bg-white/25 text-gray-300 hover:bg-white/10"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-white/25 text-gray-300 hover:bg-white/10"
                }`}
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition ${
                  filter === "approved"
                    ? "bg-green-500 text-white"
                    : "bg-white/25 text-gray-300 hover:bg-white/10"
                }`}
                onClick={() => setFilter("approved")}
              >
                Approved
              </button>
            </div>
            <div className="flex mt-6 gap-3 items-center justify-center text-gray-400">
              <span>Form Link:</span>
              <button onClick={handleToggleLink}>
                {isLinkVisible ? <Eye /> : <EyeOff />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial grid  */}
      <div className="relative max-w-7xl mx-auto">
        {!testimonials ? (
          <div className="text-center text-white">Loading...</div>
        ) : filteredTestimonials?.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-12 text-center">
            <p className="text-gray-300 text-lg">No testimonials found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTestimonials?.map((testimonial) => (
              <TestimonialCard
                key={testimonial._id}
                testimonial={testimonial}
                onClick={() => setSelectedTestimonial(testimonial as any)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          onClose={() => setSelectedTestimonial(null)}
          onApprove={handleApprove}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
