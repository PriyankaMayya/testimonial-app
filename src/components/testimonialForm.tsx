import {
  AtSign,
  BriefcaseBusiness,
  Image,
  Link,
  MapPin,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import ThemeToggle from "./themeToggle";

export default function TestimonialForm() {
  const submitTestimonial = useMutation(api.testimonial.submitTestimonial);
  const generateUploadUrl = useAction(api.files.generateUploadUrl);
  const saveFile = useMutation(api.files.saveFile);
  const initialFormState = {
    name: "",
    email: "",
    companyName: "",
    companyWebsite: "",
    companyAddress: "",
    profilePicture: null as File | null,
    review: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [fileInputKey, setFileInputKey] = useState(0);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({ ...prev, profilePicture: file }));
  };
  const handleSubmit = async () => {
    try {
      if (
        !formData.name.trim() ||
        !formData.email.trim() ||
        !formData.companyName.trim() ||
        !formData.companyWebsite.trim() ||
        !formData.companyAddress.trim() ||
        !formData.review.trim()
      ) {
        alert("Please fill all required fields before submitting.");
        return;
      }

      // if picture is required
      if (!formData.profilePicture) {
        alert("Please upload a profile picture.");
        return;
      }

      let profilePictureId = undefined;
      if (formData.profilePicture) {
        //step 1: get upload url
        const uploadUrl = await generateUploadUrl();
        //step 2: upload the file
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": formData.profilePicture.type },
          body: formData.profilePicture,
        });
        if (!result.ok) {
          throw new Error("Failed to upload image");
        }
        //Step 3: Get storage Id
        const { storageId } = await result.json();
        //save reference in db
        const fileDocId = await saveFile({ storageId });

        console.log("Image saved in DB as file:", fileDocId);
        profilePictureId = storageId;
      }
      await submitTestimonial({
        name: formData.name,
        email: formData.email,
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        companyAddress: formData.companyAddress,
        review: formData.review,
        profilePictureId: profilePictureId,
      });
      // Success! Reset form
      alert("Testimonial submitted successfully!");
      setFormData(initialFormState);
      setFileInputKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error submitting testimonial: ", error);
    }
  };

  // const handleSubmit = () => {
  //   console.log("Testimonial submitted:", formData);
  //   setFormData(initailFormState); // why profile picture field is not resetting to null
  //   setFileInputKey((prev) => prev + 1);
  // };
  return (
    <div className="w-full max-w-6xl bg-white dark:bg-slate-900  duration-1600 text-black p-6 rounded-2xl backdrop-blur-2xl backdrop-brightness-150 ">
      {/* background decoration  */}
      {/* <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div> */}

      <div className="relative w-full  max-w-6xl dark:text-white">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* header
           */}
          <div className=" text-center mb-8">
            <div className="flex flex-col items-center justify-center ">
              <div className="flex gap-3 items-center justify-center">
                <MessageSquare className=" text-[#003cd8] dark:text-blue-400 w-8 h-8" />
                <h1 className="text-3xl font-bold text-[#003cd8] dark:text-blue-400">
                  Share Your experience
                </h1>
              </div>
              <p className="text-[#003dd8b7] dark:text-blue-300 mt-2">
                Your feedback helps us improve and grow
              </p>
            </div>
            <ThemeToggle />
          </div>

          <div className="space-y-6">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="block text-xl font-bold ">
                Name:
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-black rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-[18px]"
                />
              </div>
            </div>
            {/* Email  */}
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="block text-xl font-bold ">
                Email:
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@gmail.com"
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-black rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-[18px]"
                />
              </div>
            </div>

            {/* Company name  */}
            <div className="flex flex-col gap-3">
              <label htmlFor="companyName" className="block text-xl font-bold ">
                Company Name:
              </label>
              <div className="relative">
                <BriefcaseBusiness className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Your Company Name"
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-black rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-[18px]"
                />
              </div>
            </div>
            {/* Company website  */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="companyWebsite"
                className="block text-xl font-bold "
              >
                Company Website:
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="companyWebsite"
                  name="companyWebsite"
                  type="text"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-black rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-[18px]"
                />
              </div>
            </div>

            {/* company address  */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="companyAddress"
                className="block text-xl font-bold "
              >
                Company Address:
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-4  w-5 h-5 text-gray-400" />
                <textarea
                  name="companyAddress"
                  id="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  placeholder="123 Main Street, City, State, ZIP"
                  rows={3}
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-black rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-[18px]"
                />
              </div>
            </div>
            {/* Profile picture  */}
            <div className="flex flex-col gap-3">
              <label
                htmlFor="profilePicture"
                className="block text-xl font-bold "
              >
                Profile Picture:
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="profilePicture"
                  name="profilePicture"
                  key={fileInputKey}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full pl-11 pr-4 py-4 bg-white/5 border border-black rounded-lg text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-[18px]"
                />
              </div>
            </div>

            {/* Review  */}
            <div className="flex flex-col gap-3">
              <label htmlFor="review" className="block text-xl font-bold ">
                Review:
              </label>

              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
                placeholder="Share your experience with us..."
                rows={8}
                className="w-full px-4 py-3 bg-white/5 border border-black rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-[18px]"
              />
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full py-3 px-4 mt-5 bg-linear-to-r bg-blue-600  hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              size="lg"
            >
              <Send className="w-5 h-5" />
              Submit Testimonial
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Your feedback is valuable to us and will be reviewed carefully
          </div>
        </div>
      </div>
    </div>
  );
}
