import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

// Schema for validation
const loginSchema = z.object({
  identifier: z.string().min(3, "Please enter a valid email or mobile number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Login successful");
        navigate("/admin/dashboard");
      } else {
        toast.error(result.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Failed to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-festival-gold via-festival-red to-festival-gold"></div>

          <div className="text-center mb-8 flex flex-col items-center">
            <div className="mb-4">
              <Logo size="lg" showText={true} />
            </div>
            <h1 className="text-xl font-medium text-white mb-1">Admin Portal</h1>
            <p className="text-neutral-400 text-sm">Sign in with your credentials</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-neutral-300">Email or Mobile</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-500" />
                </div>
                <input
                  type="text"
                  {...register("identifier")}
                  className={`w-full pl-10 pr-4 py-3 bg-neutral-950/50 border ${
                    errors.identifier ? "border-red-500 focus:ring-red-500" : "border-neutral-800 focus:border-primary focus:ring-primary"
                  } rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all`}
                  placeholder="admin@example.com or 9999999999"
                />
              </div>
              {errors.identifier && <p className="text-red-500 text-xs mt-1">{errors.identifier.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-neutral-300">Password</label>
                <button type="button" onClick={() => toast.info("Please contact the super admin to reset your password.")} className="text-xs text-primary hover:text-primary/80 transition-colors">
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className={`w-full pl-10 pr-12 py-3 bg-neutral-950/50 border ${
                    errors.password ? "border-red-500 focus:ring-red-500" : "border-neutral-800 focus:border-primary focus:ring-primary"
                  } rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-1 transition-all`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 px-4 rounded-xl transition-all active:scale-[0.98] disabled:opacity-70 flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          
          <div className="mt-8 text-center border-t border-neutral-800 pt-6">
            <p className="text-xs text-neutral-500">
              Authorized personnel only. Access is logged.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
