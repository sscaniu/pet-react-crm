import AuthHeadingLogo from './auth-heading-logo'

interface Props {
   title?: string
   subheading?: string
}

export default function AuthFormTitle({ title, subheading }: Props) {
   return (
      <div className="flex flex-col gap-12">
         <AuthHeadingLogo />

         <div className="flex flex-col gap-2 font-medium">
            {title && <h1 className="text-3xl">{title}</h1>}
            {subheading && <h4 className="text-grey">{subheading}</h4>}
         </div>
      </div>
   )
}
