// app/components/LoginForm.tsx
"use client";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services";
import getErrorMessage from "@/utils/get-error-message";

export default function LoginForm() {
  const { login } = useAuth();
  const { showErrorToast } = useToast();
  const fpPromise = FingerprintJS.load();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const fp = await fpPromise;
      const result = await fp.get();
      const deviceId = result.visitorId;

      const res = await authService.login({
        email: data.email,
        password: data.password,
        deviceId: deviceId,
      });

      if (res) {
        const { accessToken, refreshToken, user } = res;
        login(accessToken, refreshToken, user);
      }
    } catch (err) {
      showErrorToast("Ops!", getErrorMessage(err));
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        className="p-8 rounded shadow-md w-full max-w-sm"
        style={{
          backgroundColor: "var(--card)",
          color: "var(--card-foreground)",
        }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="bg-[var(--input)] text-[var(--foreground)] border-[var(--border)]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <Input
              type="password"
              placeholder="********"
              {...register("password", { required: "Password is required" })}
              className="bg-[var(--input)] text-[var(--foreground)] border-[var(--border)]"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-2"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
