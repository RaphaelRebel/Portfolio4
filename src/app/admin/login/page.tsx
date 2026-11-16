import { LoginForm } from '@/components/admin/LoginForm'
import { cn } from '@/lib/cn'
import { labelClass } from '@/lib/styles'

const LoginPage = () => (
  <main className="grid min-h-dvh place-items-center px-5 py-12">
    <div className="flex w-full max-w-[420px] flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className={cn(labelClass, 'm-0 font-bold tracking-[0.12em]')}>Raphael Rebel</p>
        <h1 className="m-0 font-serif text-[clamp(40px,8vw,64px)] font-normal leading-[0.95] tracking-[-0.025em]">
          <span className="block font-extralight uppercase tracking-[-0.01em]">Beheer</span>
          <span className="block pl-10 font-grotesk font-extrabold tracking-[-0.035em]">inloggen</span>
        </h1>
      </div>
      <LoginForm />
    </div>
  </main>
)

export default LoginPage
