import { useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { toast } from "react-hot-toast";
import animation from '../../assets/LoginSuccess.json'

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
            const userCredential = await createUser(email, password);
            let photoURL = "https://i.ibb.co/default-avatar.png";

            if (file && file.size > 0) {
                const imgData = new FormData();
                imgData.append("image", file);

                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    { method: "POST", body: imgData }
                );
                const data = await res.json();
                if (data.success) photoURL = data.data.display_url;
            }

            await updateUserInfo({ displayName: name, photoURL });
            setUser({ ...userCredential.user, displayName: name, photoURL });

            await axios.post("/users", {
                name,
                email,
                photoURL,
                age,
                address,
                phone,
                profession,
                role: "student",
            });

            toast.success("Registration successful! Welcome!");
            form.reset();
        } catch (error) {
            if (error.code === "auth/email-already-in-use") toast.error("Email already registered!");
            else if (error.code === "auth/weak-password") toast.error("Password must be at least 6 characters!");
            else toast.error(error.message || "Registration failed!");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await GoogleLogin();
            const gUser = result.user;
            setUser(gUser);

            await axios.post("/users", {
                name: gUser.displayName || "",
                email: gUser.email || "",
                photoURL: gUser.photoURL || "",
                age: "",
                address: "",
                phone: "",
                profession: "",
                role: "student",
            });

            toast.success("Welcome! Signed in with Google successfully!");
        } catch (error) {
            toast.error(error.message || "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 bg-accent">
            <div className="w-full max-w-2xl">
                <form
                    onSubmit={handleSignUp}
                    className="shadow-xl rounded-2xl p-8 bg-neutral"
                >
                    <h2 className="text-3xl font-bold text-primary text-center mb-6">
                        Create Account
                    </h2>

                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1 text-info">
                                First Name <span className="text-secondary">*</span>
                            </label>
                            <input
                                type="text"
                                name="first_name"
                                className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter first name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-info">
                                Last Name <span className="text-secondary">*</span>
                            </label>
                            <input
                                type="text"
                                name="last_name"
                                className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter last name"
                                required
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-info">
                            Email <span className="text-secondary">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter email"
                            required
                        />
                    </div>

                    {/* Age and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block font-medium mb-1 text-info">
                                Age <span className="text-secondary">*</span>
                            </label>
                            <input
                                type="number"
                                name="age"
                                className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter age"
                                min="1"
                                max="120"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium mb-1 text-info">
                                Phone <span className="text-secondary">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                                placeholder="Enter phone number"
                                required
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-info">
                            Address <span className="text-secondary">*</span>
                        </label>
                        <input
                            type="text"
                            name="address"
                            className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter address"
                            required
                        />
                    </div>

                    {/* Profession */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-info">
                            Profession <span className="text-secondary">*</span>
                        </label>
                        <input
                            type="text"
                            name="profession"
                            className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="e.g., Student, Engineer"
                            required
                        />
                    </div>

                    {/* Photo */}
                    <div className="mb-4">
                        <label className="block font-medium mb-1 text-info">Profile Photo</label>
                        <input
                            type="file"
                            name="photo"
                            className="w-full border border-primary rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            accept="image/*"
                        />
                        <p className="text-sm text-info mt-1">Optional - Max 5MB</p>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block font-medium mb-1 text-info">
                            Password <span className="text-secondary">*</span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Enter password"
                            minLength={6}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-primary text-neutral font-semibold hover:bg-secondary transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="mt-4">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-primary"></div>
                        </div>
                        <div className="relative flex justify-center text-sm text-info bg-accent px-2">
                            Or continue with
                        </div>
                    </div>

                    <button
                        className="w-full mt-4 py-3 rounded-lg bg-secondary text-neutral font-semibold hover:bg-primary transition disabled:opacity-60 flex items-center justify-center gap-2"
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
