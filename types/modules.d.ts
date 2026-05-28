// ================ CSS Module Declarations ================

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.css' {
  const content: string;
  export default content;
}

// ================ hls.js Declaration ================

declare module 'hls.js' {
  interface HlsConfig {
    [key: string]: unknown;
  }

  interface HlsEventData {
    [key: string]: unknown;
  }

  class Hls {
    static isSupported(): boolean;
    constructor(config?: HlsConfig);
    attachMedia(element: HTMLMediaElement): void;
    loadSource(url: string): void;
    destroy(): void;
    on(event: string, handler: (event: unknown, data: HlsEventData) => void): void;
    [key: string]: unknown;
  }

  export default Hls;
}

// ================ react-icons Declarations ================

declare module 'react-icons' {
  import { ComponentType, SVGProps } from 'react';
  export type IconType = ComponentType<SVGProps<SVGSVGElement>>;
}

declare module 'react-icons/fa6' {
  import { IconType } from 'react-icons';
  export const FaArrowRight: IconType;
  export const FaArrowLeft: IconType;
  export const FaUser: IconType;
  export const FaPlay: IconType;
  export const FaForward: IconType;
  export const FaWandMagic: IconType;
  export const FaWandMagicSparkles: IconType;
  export const FaWandSparkles: IconType;
  export const FaCheck: IconType;
  export const FaStar: IconType;
  export const FaHeart: IconType;
  export const FaSearch: IconType;
  export const FaClock: IconType;
  export const FaFire: IconType;
  export const FaCirclePlay: IconType;
  export const FaBookmark: IconType;
  export const FaCircleCheck: IconType;
  export const FaTv: IconType;
  export const FaFilm: IconType;
  export const FaXmark: IconType;
  export const FaBars: IconType;
  export const FaChevronDown: IconType;
  export const FaChevronUp: IconType;
  export const FaChevronLeft: IconType;
  export const FaChevronRight: IconType;
  export const FaEllipsisVertical: IconType;
  export const FaCirclePlus: IconType;
  export const FaTrashCan: IconType;
  export const FaPause: IconType;
  export const FaVolumeHigh: IconType;
  export const FaVolumeXmark: IconType;
  export const FaExpand: IconType;
  export const FaCompress: IconType;
  export const FaGear: IconType;
  export const FaInfo: IconType;
  export const FaRegBookmark: IconType;
  export const FaYoutube: IconType;
  export const FaLightbulb: IconType;
  export const FaComment: IconType;
  export const FaAngleDown: IconType;
  export const FaAngleUp: IconType;
}

declare module 'react-icons/fa' {
  import { IconType } from 'react-icons';
  export const FaStar: IconType;
  export const FaBackward: IconType;
  export const FaForward: IconType;
  export const FaPlay: IconType;
  export const FaPause: IconType;
  export const FaHeart: IconType;
  export const FaRegHeart: IconType;
  export const FaCheck: IconType;
  export const FaArrowRight: IconType;
}

declare module 'react-icons/md' {
  import { IconType } from 'react-icons';
  export const MdDeleteOutline: IconType;
  export const MdArrowBack: IconType;
  export const MdMovie: IconType;
  export const MdTv: IconType;
  export const MdHome: IconType;
  export const MdSearch: IconType;
  export const MdBookmark: IconType;
  export const MdPerson: IconType;
  export const MdSettings: IconType;
  export const MdLogout: IconType;
  export const MdMenu: IconType;
  export const MdClose: IconType;
  export const MdPlayArrow: IconType;
  export const MdOutlineFavorite: IconType;
  export const MdOutlineFavoriteBorder: IconType;
  export const MdOutlineFrontHand: IconType;
}

declare module 'react-icons/rx' {
  import { IconType } from 'react-icons';
  export const RxExit: IconType;
  export const RxCross2: IconType;
  export const RxHamburgerMenu: IconType;
  export const RxChevronDown: IconType;
  export const RxChevronUp: IconType;
}

declare module 'react-icons/go' {
  import { IconType } from 'react-icons';
  export const GoPlus: IconType;
  export const GoCheck: IconType;
}

declare module 'react-icons/io5' {
  import { IconType } from 'react-icons';
  export const IoPlay: IconType;
  export const IoPause: IconType;
  export const IoVolumeHigh: IconType;
  export const IoVolumeMute: IconType;
  export const IoExpand: IconType;
  export const IoContract: IconType;
  export const IoPlayCircle: IconType;
  export const IoPauseCircle: IconType;
  export const IoSearch: IconType;
  export const IoCloseOutline: IconType;
  export const IoCalendarClearOutline: IconType;
  export const IoPersonOutline: IconType;
  export const IoLayers: IconType;
  export const IoStar: IconType;
}

declare module 'react-icons/io' {
  import { IconType } from 'react-icons';
  export const IoMdSettings: IconType;
  export const IoMdSearch: IconType;
  export const IoIosArrowDown: IconType;
  export const IoIosArrowUp: IconType;
  export const IoMdClose: IconType;
  export const IoMdCheckmark: IconType;
  export const IoIosSearch: IconType;
}

declare module 'react-icons/lu' {
  import { IconType } from 'react-icons';
  export const LuSearch: IconType;
  export const LuMenu: IconType;
  export const LuX: IconType;
  export const LuExpand: IconType;
  export const LuEye: IconType;
  export const LuClock3: IconType;
  export const LuAlignLeft: IconType;
}

declare module 'react-icons/hi' {
  import { IconType } from 'react-icons';
  export const HiOutlineSearch: IconType;
  export const HiOutlineDesktopComputer: IconType;
}

declare module 'react-icons/hi2' {
  import { IconType } from 'react-icons';
  export const HiOutlineBars3: IconType;
  export const HiOutlineXMark: IconType;
}

declare module 'react-icons/bi' {
  import { IconType } from 'react-icons';
  export const BiSearch: IconType;
  export const BiMenu: IconType;
  export const BiCollapse: IconType;
  export const BiBullseye: IconType;
}

// ================ Process Env ================

declare namespace NodeJS {
  interface ProcessEnv {
    TMDB_API_KEY: string;
    RABBIT_API_KEY?: string;
    NEXT_PUBLIC_URL?: string;
  }
}
