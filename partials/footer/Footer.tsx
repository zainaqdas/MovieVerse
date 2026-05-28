import { FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#242735b3] border-t-[1px] border-[#39374b] text-[.9rem] text-[#bac1cd] w-full h-16 flex items-center justify-between px-[12rem] max-[900px]:flex-col max-[900px]:h-auto max-[900px]:gap-2 max-[900px]:py-3 max-[900px]:px-4 max-[900px]:text-center">

      <div>JadeScreen does not store any files on our server — we only link to media hosted on third-party services.</div>
      <div className="flex items-center gap-2 text-emerald-400">Made with <FaHeart className="text-red-400" /> for movie lovers</div>

    </div>
  )
}

export default Footer