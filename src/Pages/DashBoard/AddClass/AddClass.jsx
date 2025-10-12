import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAxios from "../../../CustomHooks/useAxios";
import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaListAlt,
  FaSignal,
  FaClock,
  FaImage,
  FaVideo,
  FaInfoCircle,
  FaDollarSign,
  FaChair,
  FaPlusCircle,
} from "react-icons/fa";

const imageHostingKey = import.meta.env.VITE_IMGBB_API_KEY;

const AddClass = () => {
  const axiosSecure = useAxios();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      chapters: [{ title: "", description: "", videoUrl: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "chapters",
  });

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", data.image[0]);
      const uploadRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imageHostingKey}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const imgData = await uploadRes.json();

      if (!imgData.success) {
        toast.error("Image upload failed!");
        return;
      }

      const newClass = {
        className: data.className,
        instructor: data.instructor,
        category: data.category,
        difficulty: data.difficulty,
        duration: data.duration,
        price: parseFloat(data.price),
        availableSeats: parseInt(data.availableSeats),
        description: data.description,
        thumbnail: imgData.data.display_url,
        introVideo: data.introVideo,
        chapters: data.chapters,
        status: "pending",
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/classes", newClass);
      if (res.data.insertedId) {
        toast.success("Class added successfully!");
        reset();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-accent p-8 rounded-2xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-center text-primary flex items-center justify-center gap-2 mb-6">
        <FaBookOpen className="text-secondary" /> Add New Class
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-3">
            <FaChalkboardTeacher className="text-secondary" /> Basic Information
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Class Name */}
            <div>
              <label className="block font-medium mb-1">Class Name</label>
              <input
                type="text"
                {...register("className", { required: "Class name is required" })}
                className="input input-bordered w-full"
                placeholder="e.g. React Mastery Course"
              />
              {errors.className && (
                <p className="text-red-500 text-sm">{errors.className.message}</p>
              )}
            </div>

            {/* Instructor */}
            <div>
              <label className="block font-medium mb-1">Instructor Name</label>
              <input
                type="text"
                {...register("instructor", { required: "Instructor is required" })}
                className="input input-bordered w-full"
                placeholder="e.g. John Doe"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                {...register("category", { required: "Select a category" })}
                className="select select-bordered w-full"
              >
                <option value="">Select...</option>
                <option value="web">Web Development</option>
                <option value="design">UI/UX Design</option>
                <option value="marketing">Digital Marketing</option>
                <option value="data">Data Science</option>
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block font-medium mb-1">Difficulty Level</label>
              <select
                {...register("difficulty", { required: "Select difficulty" })}
                className="select select-bordered w-full"
              >
                <option value="">Select...</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block font-medium mb-1">Duration (hours)</label>
              <input
                type="number"
                {...register("duration", { required: "Duration is required" })}
                className="input input-bordered w-full"
                placeholder="e.g. 10"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2">
                <FaImage className="text-secondary" /> Thumbnail Image
              </label>
              <input
                type="file"
                accept="image/*"
                {...register("image", { required: "Image is required" })}
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>
        </div>

        {/* Course Media Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-3">
            <FaVideo className="text-secondary" /> Course Media
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Intro Video */}
            <div>
              <label className="block font-medium mb-1">Intro Video URL</label>
              <input
                type="url"
                {...register("introVideo", { required: "Intro video required" })}
                className="input input-bordered w-full"
                placeholder="e.g. https://youtu.be/example"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2">
                <FaInfoCircle className="text-secondary" /> Course Description
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="textarea textarea-bordered w-full"
                rows="3"
                placeholder="Write about your course..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Pricing & Seats */}
        <div>
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-3">
            <FaDollarSign className="text-secondary" /> Pricing & Availability
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price ($)</label>
              <input
                type="number"
                {...register("price", { required: "Price is required" })}
                className="input input-bordered w-full"
                placeholder="e.g. 99"
              />
            </div>
            <div>
              <label className="block font-medium mb-1 flex items-center gap-2">
                <FaChair className="text-secondary" /> Available Seats
              </label>
              <input
                type="number"
                {...register("availableSeats", { required: "Seats are required" })}
                className="input input-bordered w-full"
                placeholder="e.g. 30"
              />
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="border-t pt-4">
          <h3 className="text-xl font-semibold text-primary flex items-center gap-2 mb-3">
            <FaListAlt className="text-secondary" /> Course Chapters
          </h3>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="border p-4 rounded-xl mb-3 bg-gray-50 dark:bg-neutral"
            >
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  {...register(`chapters.${index}.title`, {
                    required: "Title is required",
                  })}
                  placeholder="Chapter Title"
                  className="input input-bordered w-full"
                />
                <input
                  {...register(`chapters.${index}.videoUrl`, {
                    required: "Video URL required",
                  })}
                  placeholder="Video URL (YouTube, Vimeo...)"
                  className="input input-bordered w-full"
                />
              </div>
              <textarea
                {...register(`chapters.${index}.description`)}
                className="textarea textarea-bordered w-full mt-2"
                placeholder="Chapter Description"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-error btn-sm mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ title: "", description: "", videoUrl: "" })}
            className="btn btn-outline btn-primary w-full flex items-center justify-center gap-2"
          >
            <FaPlusCircle /> Add Chapter
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={uploading}
          className="btn btn-primary w-full mt-5"
        >
          {uploading ? "Uploading..." : "Add Class"}
        </button>
      </form>
    </div>
  );
};

export default AddClass;
