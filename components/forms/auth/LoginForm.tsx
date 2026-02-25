"use client"
import { useMutate } from '@/hooks/useMutate'
import { loginUser } from '@/services/auth.service'
import { LoginFormData, loginSchema } from '@/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const router = useRouter()

    const { login } = useAuthStore()

    const { mutate, isPending } = useMutate({
        mutationFn: loginUser,
        setError,
        onSuccess: (res) => {
            login({
                user_id: res.user.user_id,
                email: res.user.email,
            }, res.access, res.refresh)
            router.push('/')
        }
    })

    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };

    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                {errors && <p className='text-red-500'>{errors.email?.message}</p>}

            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label className="th-label">Password</label>
                    <Link
                        href="/forgot-password"
                        className="text-[11px] font-semibold"
                        style={{ color: "var(--th-amber)" }}
                    >
                        Forgot?
                    </Link>
                </div>

                <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-lg px-4 py-3 text-sm"
                    style={{
                        background: "var(--th-surface)",
                        border: "1px solid var(--th-border-2)",
                        color: "var(--th-text)",
                    }}
                />
                {errors && <p className='text-red-500'>{errors.password?.message}</p>}
            </div>

            <button
                type="submit"
                className="th-btn-primary mt-2 w-full py-3 text-sm"
                disabled={isPending}
            >
                {isPending ? "Logging in..." : "Login →"}
            </button>
        </form>
    )
}

export default LoginForm