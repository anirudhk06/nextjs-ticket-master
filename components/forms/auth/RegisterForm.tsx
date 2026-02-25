import { useMutate } from "@/hooks/useMutate"
import { registerUser } from "@/services/auth.service"
import { RegisterFormData, registerSchema } from "@/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { useAuthStore } from "@/store/authStore"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const router = useRouter()
    const { setUser } = useAuthStore()

    const { mutate, isPending } = useMutate({
        mutationFn: registerUser,
        setError,
        onSuccess: (data) => {
            setUser({
                user_id: data.user.user_id,
                email: data.user.email,
            })
            router.push('/dashboard')
        },
    })

    const onSubmit = (data: RegisterFormData) => {
        mutate(data)
    }

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
                <label className="th-label">Email Address</label>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg px-4 py-3 text-sm"
                    style={{
                        background: "var(--th-surface)",
                        border: "1px solid var(--th-border-2)",
                        color: "var(--th-text)",
                    }}
                />
                {errors && <p className="text-red-500">{errors.email?.message}</p>}
            </div>

            {/* Password */}
            <div>
                <label className="th-label">Password</label>
                <div className="relative">
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Min 8 characters"
                        className="w-full rounded-lg px-4 py-3 pr-10 text-sm"
                        style={{
                            background: "var(--th-surface)",
                            border: "1px solid var(--th-border-2)",
                            color: "var(--th-text)",
                        }}
                    />
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px]"
                        style={{ color: "var(--th-muted)" }}
                    >
                        👁
                    </span>
                </div>
                {errors && <p className="text-red-500">{errors.password?.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="th-label">Confirm Password</label>
                <div className="relative">
                    <input
                        {...register("confirm_password")}
                        type="password"
                        placeholder="Re-enter password"
                        className="w-full rounded-lg px-4 py-3 pr-10 text-sm"
                        style={{
                            background: "var(--th-surface)",
                            border: "1px solid var(--th-border-2)",
                            color: "var(--th-text)",
                        }}
                    />
                    <span
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[16px]"
                        style={{ color: "var(--th-muted)" }}
                    >
                        👁
                    </span>
                </div>
                {errors && <p className="text-red-500">{errors.confirm_password?.message}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-3 pt-1">
                <div
                    className="mt-[2px] h-4 w-4 rounded border"
                    style={{ borderColor: "var(--th-border-2)" }}
                />
                <span
                    className="text-[12px] leading-relaxed"
                    style={{ color: "var(--th-muted-2)" }}
                >
                    I agree to TicketHive's{" "}
                    <Link href="/terms" style={{ color: "var(--th-amber)" }}>
                        Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" style={{ color: "var(--th-amber)" }}>
                        Privacy Policy
                    </Link>
                </span>
            </label>

            {/* Submit */}
            <button
                type="submit"
                className="th-btn-primary mt-2 w-full py-3 text-sm"
                disabled={isPending}
            >
                {isPending ? "Creating..." : "Create Account →"}
            </button>
        </form>
    )
}

export default RegisterForm