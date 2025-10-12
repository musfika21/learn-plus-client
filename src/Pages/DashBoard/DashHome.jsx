import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaBirthdayCake,
  FaMapMarkerAlt,
  FaPhone,
  FaBriefcase,
  FaUserShield,
  FaRegClock,
  FaBookOpen,
  FaCheckCircle,
  FaCertificate,
  FaClipboardList,
  FaMedal,
  FaChartLine,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAxios from "../../CustomHooks/useAxios";
import useAuth from "../../CustomHooks/useAuth";
import Loading2 from "../../Components/Loading/Loading2";

const DashHome = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${user.email}`);
        if (res.data.success) setProfile(res.data.data);
        else toast.error("Failed to load user data");
      } catch (error) {
        console.error(error);
        toast.error("Error fetching user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.email]);

  if (loading) return <Loading2 />;

  if (!profile) return <p className="text-center text-red-500 mt-10">User not found.</p>;

  return (
    <div className="mx-auto w-full p-2 md:p-8 lg:p-10 space-y-8">
      {/* Profile Section */}
      <h2 className="text-3xl font-bold mb-6 text-primary">Your Profile</h2>
      <div className="bg-accent shadow-lg shadow-primary/50 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex items-center gap-3 text-info">
          <FaUser className="text-2xl text-secondary" />
          <span><strong>Name:</strong> {profile.name || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-info">
          <FaEnvelope className="text-2xl text-secondary" />
          <span><strong>Email:</strong> {profile.email}</span>
        </div>
        <div className="flex items-center gap-3 text-info">
          <FaBirthdayCake className="text-2xl text-secondary" />
          <span><strong>Age:</strong> {profile.age || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-info">
          <FaMapMarkerAlt className="text-2xl text-secondary" />
          <span><strong>Address:</strong> {profile.address || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-info">
          <FaPhone className="text-2xl text-secondary" />
          <span><strong>Phone:</strong> {profile.phone || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-info">
          <FaBriefcase className="text-2xl text-secondary" />
          <span><strong>Profession:</strong> {profile.profession || "N/A"}</span>
        </div>
        <div className="flex items-center gap-3 text-info">
          <FaUserShield className="text-2xl text-secondary" />
          <span><strong>Role:</strong> {profile.role}</span>
        </div>
        <div className="flex items-center gap-3 text-info">
          <FaRegClock className="text-2xl text-secondary" />
          <span><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</span>
        </div>

        {profile.photoURL && (
          <div className="col-span-1 md:col-span-2 flex justify-center mt-4">
            <img
              src={profile.photoURL}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-primary"
            />
          </div>
        )}
      </div>

      {/* Learning Dashboard Section */}
      <h2 className="text-3xl font-bold mb-6 text-primary">Learning Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-accent p-5 rounded-2xl shadow-md flex flex-col items-center text-info hover:scale-105 transition-transform">
          <FaBookOpen className="text-4xl text-secondary mb-2" />
          <p className="text-lg font-semibold">Courses Enrolled</p>
          <p className="text-2xl font-bold mt-1">5</p>
        </div>
        <div className="bg-accent p-5 rounded-2xl shadow-md flex flex-col items-center text-info hover:scale-105 transition-transform">
          <FaCheckCircle className="text-4xl text-secondary mb-2" />
          <p className="text-lg font-semibold">Completed Lessons</p>
          <p className="text-2xl font-bold mt-1">42</p>
        </div>
        <div className="bg-accent p-5 rounded-2xl shadow-md flex flex-col items-center text-info hover:scale-105 transition-transform">
          <FaCertificate className="text-4xl text-secondary mb-2" />
          <p className="text-lg font-semibold">Certificates</p>
          <p className="text-2xl font-bold mt-1">3</p>
        </div>
        <div className="bg-accent p-5 rounded-2xl shadow-md flex flex-col items-center text-info hover:scale-105 transition-transform">
          <FaClipboardList className="text-4xl text-secondary mb-2" />
          <p className="text-lg font-semibold">Quizzes Taken</p>
          <p className="text-2xl font-bold mt-1">15</p>
        </div>
        <div className="bg-accent p-5 rounded-2xl shadow-md flex flex-col items-center text-info hover:scale-105 transition-transform">
          <FaMedal className="text-4xl text-secondary mb-2" />
          <p className="text-lg font-semibold">Achievements</p>
          <p className="text-2xl font-bold mt-1">7</p>
        </div>
        <div className="bg-accent p-5 rounded-2xl shadow-md flex flex-col items-center text-info hover:scale-105 transition-transform">
          <FaChartLine className="text-4xl text-secondary mb-2" />
          <p className="text-lg font-semibold">Progress</p>
          <p className="text-2xl font-bold mt-1">78%</p>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
