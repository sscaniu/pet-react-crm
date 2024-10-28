import Image from 'next/image'
import heroImg from '../../../public/assets/hero-logo.png'

const AuthHeadingLogo: React.FC = () => {
   return (
      <div className="relative flex w-full flex-1 justify-center">
         <Image src={heroImg} width={140} alt="Hero Title Logo" />
      </div>
   )
}

export default AuthHeadingLogo
