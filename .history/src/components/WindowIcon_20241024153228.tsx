import Image from 'next/image'
import windowSvg from '../../public/window.svg'

const WindowIcon = () => {
  return <Image src={windowSvg} alt="Window icon" width={24} height={24} />
}

export default WindowIcon
