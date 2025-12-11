import { Id } from "convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import {
  Building2Icon,
  CheckCircle,
  Clock,

  Globe,
  Mail,
  MapPin,
  Trash2,
  XCircle,
} from "lucide-react";

interface TestimonialModalProps {
  testimonial: any; // Replace with proper type
  onClose: () => void;
  onApprove: (id: Id<"testimonials">) => void;
  onDelete: (id: Id<"testimonials">) => void;
}

export default function TestimonialModal({
  testimonial,
  onClose,
  onApprove,
  onDelete,
}: TestimonialModalProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const imageUrl = useQuery(api.files.getFileUrl, {
    storageId: testimonial.profilePictureId,
  });
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* header  */}
        <div className="sticky top-0 bg-slate-900/95 backdrop-blur-lg border-b border-white/10 p-6 flex justify-between">
          <div className="flex justify-between items-start gap-4">
            {imageUrl ? (
              <img
                src={imageUrl}
                className="w-16 h-16 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                {testimonial.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-col justify-center ">
              <h2 className="text-2xl font-bold text-white mb-2">
                {testimonial.name}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  testimonial.isApproved
                    ? "bg-green-500/20 text-green-300"
                    : "bg-yellow-500/20 text-yellow-300"
                }`}
              >
                {testimonial.isApproved ? "Approved" : "Pending Review"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition mb-6"
          >
            <XCircle className="w-6 h-6" />
          </button>
        </div>

        {/* Content  */}
        <div className="p-10">
          <div className="space-y-2">
            <div className="flex gap-3 items-center text-gray-400">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>{testimonial.email}</span>
            </div>

            <div className="flex gap-3 items-center text-gray-400">
              <Building2Icon className="w-5 h-5 text-blue-400" />
              <span>{testimonial.companyName}</span>
            </div>

            {testimonial.companyWebsite && (
              <div className="flex gap-3 items-center text-gray-400">
                <Globe className="w-5 h-5 text-blue-400" />

                <a
                  href={testimonial.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  {testimonial.companyWebsite}
                </a>
              </div>
            )}

            {testimonial.companyAddress && (
              <div className="flex  gap-3 text-gray-400 items-center">
                <MapPin className="w-5 h-5 text-blue-400 " />
                <span>{testimonial.companyAddress}</span>
              </div>
            )}
          </div>

          {/* Review */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-white mb-3">Review</h3>
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {testimonial.review}
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center  gap-2 text-gray-500 text-sm mt-4">
            <Clock className="w-4 h-4" />
            <p>Submitted on {formatDate(testimonial._creationTime)}</p>
          </div>
        </div>
        {/* Actions  */}
        <div className="w-full pb-5">
          <div className="flex  justify-between gap-4 px-5 items-center">
            {!testimonial.isApproved && (
              <button
                onClick={() => onApprove(testimonial._id)}
                className="flex-1 flex items-center justify-center gap-2  py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition  h-10"
              >
                <CheckCircle className="w-5 h-5" />
                Approve
              </button>
            )}
            <button
              onClick={() => onDelete(testimonial._id)}
              className="flex-1 flex items-center justify-center gap-2 h-10 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-200 font-semibold rounded-lg transition"
            >
              <Trash2 className="w-5 h-5" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
