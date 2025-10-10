import { useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { toast } from "react-hot-toast";

const Register = () => {
    const { createUser, updateUserInfo, setUser, GoogleLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const axios = useAxios();

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const formData = new FormData(form);
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const age = formData.get("age");
        const address = formData.get("address");
        const phone = formData.get("phone");
        const profession = formData.get("profession");
        const password = formData.get("password");
        const file = formData.get("photo");

        const name = `${first_name} ${last_name}`;

        try {
            // 1️⃣ Firebase create user
            const userCredential = await createUser(email, password);
            console.log("✅ User created in Firebase:", userCredential.user.uid);

            // 2️⃣ Upload photo to imgbb (if exists)
            let photoURL = "https://i.ibb.co/default-avatar.png";
            if (file && file.size > 0) {
                const imgData = new FormData();
                imgData.append("image", file);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    {
                        method: "POST",
                        body: imgData,
                    }
                );
                const data = await res.json();
                console.log("📸 ImgBB response:", data);

                if (data.success) {
                    photoURL = data.data.display_url;
                } else {
                    console.warn("⚠️ ImgBB upload failed, using default avatar");
                }
            }

            // 3️⃣ Update Firebase profile
            await updateUserInfo({ displayName: name, photoURL });
            console.log("✅ Firebase profile updated");

            // 4️⃣ Update local state
            setUser({
                ...userCredential.user,
                displayName: name,
                photoURL,
            });

            // 5️⃣ Send user data to server via axios
            const serverResponse = await axios.post("/users", {
                name: name || "",
                email: email || "",
                photoURL: photoURL || "",
                age: age || "",
                address: address || "",
                phone: phone || "",
                profession: profession || "",
                role: "student", // Default role
            });

            console.log("✅ Server response:", serverResponse.data);

            toast.success("Registration successful! Welcome to Learn Plus!");
            form.reset();

            // Optional: Redirect to dashboard
            // navigate('/dashboard');

        } catch (error) {
            console.error("❌ Registration error:", error);

            // Show user-friendly error messages
            if (error.code === "auth/email-already-in-use") {
                toast.error("This email is already registered!");
            } else if (error.code === "auth/weak-password") {
                toast.error("Password should be at least 6 characters!");
            } else if (error.response) {
                // Axios error
                toast.error(`Server error: ${error.response.data.error || "Unknown error"}`);
            } else {
                toast.error(error.message || "Registration failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await GoogleLogin();
            const gUser = result.user;
            console.log("✅ Google user:", gUser);

            // Update local state
            setUser(gUser);

            // Send to server with default values for Google sign-in
            const serverResponse = await axios.post("/users", {
                name: gUser.displayName || "",
                email: gUser.email || "",
                photoURL: gUser.photoURL || "",
                age: "",
                address: "",
                phone: "",
                profession: "",
                role: "student", // Default role
            });

            console.log("✅ Google user saved to server:", serverResponse.data);
            toast.success("Welcome! Signed in with Google successfully!");

            // Optional: Redirect
            // navigate('/dashboard');

        } catch (error) {
            console.error("❌ Google sign-in error:", error);

            if (error.response) {
                toast.error(`Server error: ${error.response.data.error || "Unknown error"}`);
            } else {
                toast.error(error.message || "Google sign-in failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
            <div className="w-full max-w-2xl">
                <form
                    onSubmit={handleSignUp}
                    className="shadow-lg rounded-xl p-8 bg-white"
                >
                    <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
                        Create Account
                    </h2>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter last name"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Age and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Age <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="age"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter age"
                                min="1"
                                max="120"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-gray-700">
                                Phone Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-gray-700">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your address"
                            required
                        />
                    </div>

                    {/* Profession */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-gray-700">
                            Profession <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="profession"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Student, Engineer, Teacher"
                            required
                        />
                    </div>

                    {/* Photo */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-gray-700">
                            Profile Photo
                        </label>
                        <input
                            type="file"
                            name="photo"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="image/*"
                        />
                        <p className="text-sm text-gray-500 mt-1">Optional - Max 5MB</p>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block font-medium mb-1 text-gray-700">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter password (min 6 characters)"
                            required
                            minLength={6}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="mt-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <button
                        className="w-full mt-4 py-3 px-6 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition disabled:opacity-60 flex items-center justify-center gap-2 font-medium"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {loading ? "Signing in..." : "Continue with Google"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;