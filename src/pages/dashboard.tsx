import TestimonialCard from "@/components/testimonialCard";
import { api } from "../../convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Id } from "convex/_generated/dataModel";
import TestimonialModal from "@/components/testimonialModal";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const testimonials = useQuery(api.testimonial.getAllTestimonials);
  const approveTestimonial = useMutation(api.testimonial.approveTestimonials);
  const deleteTestimonial = useMutation(api.testimonial.deleteTestimonial);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/");
  };

  const handleApprove = async (id: Id<"testimonials">) => {
    try {
      await approveTestimonial({ testimonialId: id });
      setSelectedTestimonial(null);
    } catch (error) {
      console.error("Error approving testimonial:", error);
    }
  };

  const handleDelete = async (id: Id<"testimonials">) => {
    if (window.confirm("Are you sure you want to delete this testimonial?")) {
      try {
        await deleteTestimonial({ testimonialId: id });
        setSelectedTestimonial(null);
      } catch (error) {
        console.error("Error deleting testimonial:", error);
      }
    }
  };

  const filteredTestimonials = testimonials?.filter((t) => {
    if (filter === "pending") return !t.isApproved;
    if (filter === "approved") return t.isApproved;
    return true;
  });
  return (
    <div className="min-h-screen bg-linear-to-br  relative overflow-hidden  p-4">
      {/* header  */}
      <div className="relative max-w-7xl mx-auto mb-8">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-3xl mb-2">Admin Dashboard</h1>
              <p className="text-gray-300">Manage Testimonials and reviews</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-200/20 hover:bg-black py-2 px-4 rounded-2xl flex gap-2 items-center border-amber-50 border-2"
            >
              <LogOut className="w-5 h-5" /> Logout
            </button>
          </div>

          {/* stats  */}
          <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8">
            <div className="bg-amber-50/10 rounded-2xl flex flex-col items-center p-5 gap-2">
              <p className="text-gray-400 text-xl">Total</p>
              <p className="text-2xl font-bold text-white">
                {testimonials?.length || 0}
              </p>
            </div>
            <div className="bg-amber-50/10 rounded-2xl flex flex-col items-center p-5  gap-2">
              <p className="text-gray-400 text-xl">Pending</p>
              <p className="text-2xl font-bold text-white">
                {testimonials?.filter((t) => !t.isApproved).length || 0}
              </p>
            </div>
            <div className="bg-amber-50/10 rounded-2xl flex flex-col items-center p-5  gap-2">
              <p className="text-gray-400 text-xl">Approved</p>
              <p className="text-2xl font-bold text-white">
                {testimonials?.filter((t) => t.isApproved).length || 0}
              </p>
            </div>
          </div>

          {/* Filter  */}
          <div className="flex gap-2 mt-6">
            <button
              className={`px-4 py-2 rounded-lg transition ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition ${
                filter === "pending"
                  ? "bg-yellow-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition ${
                filter === "approved"
                  ? "bg-green-500 text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              onClick={() => setFilter("approved")}
            >
              Approved
            </button>
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
