import { Clock, Eye, MapPin } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useState } from "react";

interface TestimonialCardProps {
  testimonial: any;
  onClick: () => void;
}
export default function TestimonialCard({
  testimonial,
  onClick,
}: TestimonialCardProps) {
  const imageUrl = useQuery(api.files.getFileUrl, {
    storageId: testimonial.profilePictureId,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="bg-black backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6  transition cursor-pointer">
      {/* Status badge */}
      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            testimonial.isApproved
              ? "bg-green-500/20 text-green-300"
              : "bg-yellow-500/20 text-yellow-300"
          }`}
        >
          {testimonial.isApproved ? "Approved" : "Pending"}
        </span>
        <Eye className="w-5 h-5 text-gray-400" onClick={onClick} />
      </div>

      {/* profile, name and company name   */}
      <div className="flex relative mb-5">
        {imageUrl ? (
          <div className="w-26 h-26 relative">
            <img
              src={imageUrl}
              alt={testimonial.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-white-500/50"
            />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center mb-4 text-white font-bold text-xl">
            {testimonial.name.charAt(0).toUpperCase()}
          </div>
        )}
        {/* Name and company */}
        <div className="relative flex flex-col ml-3  items-start justify-center">
          <h3 className="text-xl font-bold text-white mb-2">
            {testimonial.name}
          </h3>
          <p className="text-gray-300 text-sm mb-2">
            {testimonial.companyName}
          </p>
          <div className="flex justify-center gap-2">
            <MapPin className="w-4 h-4 text-gray-400" />{" "}
            <p className="text-sm text-gray-400">
              {testimonial.companyAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Review preview */}
      <p
        className={`text-gray-400 text-sm ${isExpanded ? "" : "line-clamp-3"}`}
      >
        {testimonial.review}
      </p>
      {testimonial.review.length > 120 && (
        <button
          className="text-blue-400 text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
      {/* Date */}
      <div className="mt-3 flex items-center gap-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <p className="text-gray-500 text-xs">
          {new Date(testimonial._creationTime).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
