import AuthBannerImg from '@/components/ui/auth-banner-image'
import AuthFormWrapper from '@/components/ui/auth-form-wrapper'
import { cn } from '@/lib/utils'

export default async function ForgotPasswordLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <main>
         <section
            className={cn(
               'z-20 flex min-h-screen flex-col justify-center bg-login-cat-img bg-cover bg-center px-6 py-10',
               'sm:px-12',
               'md:px-20',
               'lg:flex-row lg:bg-none lg:px-0 lg:py-0',
            )}
         >
            <AuthFormWrapper>{children}</AuthFormWrapper>
            <AuthBannerImg src={'/assets/login-cat-img.jpg'} />
         </section>
      </main>
   )
}
