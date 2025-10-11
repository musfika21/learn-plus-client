import { useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";

const Login = () => {
    const { signIn, setUser, GoogleLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const axios = useAxios();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const formData = new FormData(form);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            // 1️⃣ Firebase sign in
            const userCredential = await signIn(email, password);
            console.log("✅ User logged in:", userCredential.user.uid);

            // 2️⃣ Update local state
            setUser(userCredential.user);

            // 3️⃣ Fetch user data from server (optional)
            try {
                const serverResponse = await axios.get(`/users/${email}`);
                console.log("✅ User data from server:", serverResponse.data);
            } catch (error) {
                console.warn("⚠️ Could not fetch user data from server:", error);
            }

            toast.success("Welcome back! Login successful!");
            form.reset();

            // Redirect to dashboard or home
            navigate('/');

        } catch (error) {
            console.error("❌ Login error:", error);

            // Show user-friendly error messages
            if (error.code === "auth/user-not-found") {
                toast.error("No account found with this email!");
            } else if (error.code === "auth/wrong-password") {
                toast.error("Incorrect password! Please try again.");
            } else if (error.code === "auth/invalid-email") {
                toast.error("Invalid email format!");
            } else if (error.code === "auth/user-disabled") {
                toast.error("This account has been disabled!");
            } else if (error.code === "auth/too-many-requests") {
                toast.error("Too many failed attempts. Please try again later.");
            } else if (error.code === "auth/invalid-credential") {
                toast.error("Invalid email or password!");
            } else {
                toast.error(error.message || "Login failed. Please try again.");
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

            // Check if user exists in database, if not create
            try {
                const checkUser = await axios.get(`/users/${gUser.email}`);
                console.log("✅ Existing user:", checkUser.data);
            } catch (error) {
                // User doesn't exist, create new user
                if (error.response && error.response.status === 404) {
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
                    console.log("✅ New Google user created");
                }
            }

            toast.success("Welcome! Signed in with Google successfully!");

            // Redirect to dashboard
            navigate('/dashboard');

        } catch (error) {
            console.error("❌ Google sign-in error:", error);

            if (error.response) {
                toast.error(`Server error: ${error.response.data.error || "Unknown error"}`);
            } else if (error.code === "auth/popup-closed-by-user") {
                toast.error("Sign-in cancelled");
            } else if (error.code === "auth/cancelled-popup-request") {
                // User closed popup, no need to show error
            } else {
                toast.error(error.message || "Google sign-in failed");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md">
                <div className="shadow-xl rounded-2xl p-8 bg-white">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Welcome Back!
                        </h2>
                        <p className="text-gray-600">
                            Sign in to continue to Learn Plus
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="mb-5">
                            <label className="block font-medium mb-2 text-gray-700">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full border border-gray-300 rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Enter your password"
                                    required
                                    minLength={6}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>
                    </div>

                    {/* Google Sign In */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full mt-6 py-3 px-6 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition shadow-sm hover:shadow disabled:opacity-60 flex items-center justify-center gap-3 font-medium text-gray-700"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        {loading ? "Signing in..." : "Sign in with Google"}
                    </button>

                    {/* Register Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600">
                            Don't have an account?{" "}
                            <Link to="/register" className="text-blue-600 hover:text-blue-800 font-semibold">
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Additional Info */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    By signing in, you agree to our{" "}
                    <Link to="/terms" className="text-blue-600 hover:underline">
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-600 hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;