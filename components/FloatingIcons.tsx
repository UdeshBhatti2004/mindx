"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Calculator, Code2, GraduationCap, Laptop } from "lucide-react";

const floatingIcons = [
  {
    Icon: Calculator,
    desktop: "left-[8%] top-[25%]",
    tablet: "left-[5%] top-[22%]",
    mobile: "left-[2%] top-[22%]",
    rotate: -12,
  },
  {
    Icon: Code2,
    desktop: "right-[10%] top-[22%]",
    tablet: "right-[6%] top-[20%]",
    mobile: "right-[2%] top-[20%]",
    rotate: 15,
  },
  {
    Icon: GraduationCap,
    desktop: "left-[12%] bottom-[22%]",
    tablet: "left-[8%] bottom-[18%]",
    mobile: "left-[1%] bottom-[1%]",
    rotate: 8,
  },
  {
    Icon: Laptop,
    desktop: "right-[15%] bottom-[20%]",
    tablet: "right-[8%] bottom-[16%]",
    mobile: "right-[1%] bottom-[1%]",
    rotate: -10,
  },
  {
    Icon: Brain,
    desktop: "right-[30%] top-[12%]",
    tablet: "right-[28%] top-[10%]",
    mobile: "hidden sm:flex",
    rotate: 5,
  },
];

export default function FloatingIcons() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0 w-full max-w-[1500px]">
      {floatingIcons.map((props, index) => (
        <DraggableIcon
          key={index}
          {...props}
          index={index}
          isActive={active === index}
          setActive={setActive}
        />
      ))}
    </div>
  );
}

// ... Keep the exact same DraggableIcon component code you already had below here ...
type DraggableIconProps = {
  Icon: React.ElementType;
  desktop: string;
  tablet: string;
  mobile: string;
  rotate: number;
  index: number;
  isActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<number | null>>;
};

function DraggableIcon({
  Icon,
  desktop,
  tablet,
  mobile,
  rotate,
  index,
  isActive,
  setActive,
}: DraggableIconProps) {
  return (
    <motion.div
      drag
      dragSnapToOrigin={true}
      dragConstraints={{ top: -90, bottom: 90, left: -90, right: 90 }}
      dragElastic={0.08}
      dragMomentum={false}
      onDragStart={() => setActive(index)}
      onDragEnd={() => setActive(null)}
      onMouseEnter={() => setActive(index)}
      onMouseLeave={() => setActive(null)}
      whileDrag={{ scale: 1.15, rotate: 0, zIndex: 100 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        opacity: { delay: index * 0.15, duration: 0.6 },
        scale: { delay: index * 0.15, duration: 0.6, type: "spring" },
      }}
      className={`
        ${mobile} ${tablet} ${desktop}
        pointer-events-auto absolute flex h-10 w-10
        cursor-grab touch-none select-none items-center justify-center
        rounded-xl border active:cursor-grabbing backdrop-blur-sm
        sm:h-12 sm:w-12 md:h-14 md:w-14
        ${
          isActive
            ? "border-[#ff7a00]/80 bg-[#ff7a00]/15 text-[#ff7a00] shadow-[0_0_30px_rgba(255,122,0,0.2)]"
            : "border-white/10 bg-white/[0.03] text-white/40 hover:text-white/70"
        }
      `}
      style={{ rotate }}
    >
      <Icon size={18} strokeWidth={1.5} className="sm:h-5 sm:w-5 md:h-6 md:w-6" />
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: isActive ? 1 : 0 }}
        className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#ff7a00] shadow-[0_0_8px_rgba(255,122,0,0.8)]"
      />
    </motion.div>
  );
}