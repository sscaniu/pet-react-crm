import SettingsNavMenu from '@/components/settings/panel/settings-nav-menu'

export default async function SettingsLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <main className="bg-panel-primary px-25 py-6">
         <section className="flex gap-6">
            <SettingsNavMenu />
            {children}
         </section>
      </main>
   )
}
