import { useState } from "react";
import useAuth from "../../CustomHooks/useAuth";
import useAxios from "../../CustomHooks/useAxios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from '../../assets/LoginSuccess.json'

const Login = () => {
    const { signIn, setUser, GoogleLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
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
            const userCredential = await signIn(email, password);
            setUser(userCredential.user);

            // Optional: fetch user data from backend
            try {
                await axios.get(`/users/${email}`);
            } catch {}

            // Show animation
            setLoginSuccess(true);
            toast.success("Welcome back! Login successful!");
            setTimeout(() => {
                setLoginSuccess(false);
                navigate("/dashboard");
            }, 2000); // 2s animation
            form.reset();

        } catch (error) {
            console.error(error);
            if (error.code === "auth/user-not-found") toast.error("No account found!");
            else if (error.code === "auth/wrong-password") toast.error("Incorrect password!");
            else toast.error(error.message || "Login failed!");
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

            // Optional: create user if doesn't exist
            try {
                await axios.get(`/users/${gUser.email}`);
            } catch (error) {
                if (error.response?.status === 404) {
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
                }
            }

            setLoginSuccess(true);
            toast.success("Welcome! Signed in with Google successfully!");
            setTimeout(() => {
                setLoginSuccess(false);
                navigate("/dashboard");
            }, 2000);

        } catch (error) {
            console.error(error);
            if (error.code === "auth/popup-closed-by-user") toast.error("Sign-in cancelled");
            else toast.error(error.message || "Google sign-in failed");
        } finally {
            setLoading(false);
        }
    };

    // --- Success Animation Overlay ---
    if (loginSuccess) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-accent">
                <Player
                    autoplay
                    loop={false}
                    src={animation}
                    style={{ height: 250, width: 250 }}
                />
                <h2 className="text-3xl font-bold text-primary mt-4">Login Successful!</h2>
            </div>
        );
    }

    // --- Login Form ---
    return (
        <div className=" min-h-screen p-4 bg-accent">
            <div className="w-full max-w-md">
                <div className="shadow-xl rounded-2xl p-8 bg-neutral">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back!</h2>
                        <p className="text-info">Sign in to continue</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="mb-5">
                            <label className="block font-medium mb-2 text-info">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full border border-primary rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-6">
                            <label className="block font-medium mb-2 text-info">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="w-full border border-primary rounded-lg p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-info hover:text-secondary"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-primary text-neutral font-semibold hover:bg-secondary transition shadow-md hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <button
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                        className="w-full mt-6 py-3 rounded-lg bg-secondary text-neutral font-semibold hover:bg-primary transition shadow-md hover:shadow-lg disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                        Sign in with Google
                    </button>

                    <p className="mt-6 text-center text-info">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary font-semibold hover:text-secondary">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
