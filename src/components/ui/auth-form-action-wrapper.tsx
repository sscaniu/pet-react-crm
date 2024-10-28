interface Props {
   children: React.ReactNode
}
export default function AuthFormActionWrapper({ children }: Props) {
   return <div className="flex flex-col gap-6 pt-16 lg:pt-6">{children}</div>
}
