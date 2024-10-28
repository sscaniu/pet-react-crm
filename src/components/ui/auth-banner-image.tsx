import Image from 'next/image'

interface Props {
   src: string
}

export default function AuthBannerImg({ src }: Props) {
   return (
      <div className="relative hidden min-h-screen flex-1 lg:block">
         <Image src={src} fill objectFit="cover" objectPosition="center" alt="Banner Image" />
      </div>
   )
}
