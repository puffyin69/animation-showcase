"use client";
import { Outfit } from "next/font/google"; // Removed "Stick" as it doesn't exist
import Image from "next/image";
import { Manrope } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";


gsap.registerPlugin(ScrollTrigger);

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const StickyCardPin = () => {
  const container_ref = useRef(null);

  useGSAP(
    () => {
      const stickyCards = container_ref.current.querySelectorAll(".main-wrapper");

      stickyCards.forEach((card, index) => {
        if (index < stickyCards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: stickyCards[stickyCards.length - 1],
            end: "top top",
            pin: true, 
            pinSpacing: false,
          });
        }
        if(index<stickyCards.length -1 ){
          ScrollTrigger.create({
            trigger : stickyCards[index+1],
            start:"top bottom",
            end:"top top",
            onUpdate : (self)=>{
              const progress = self.progress;
              const scale = 1 - progress * 0.25;
              const rotate = (index%2==0 ? 5 : -5) * progress;
              const afterOpacity = progress;

              gsap.set(card,{
                scale:scale,
                rotation:rotate,
                "--after-opacity":afterOpacity
              })
            }
          })
        }
      });
    },
    { scope: container_ref }
  );

  const StickyCards = [
    {
      index: "01",
      title: "Precision",
      image: "/card-1.jpg",
      description:
        "Details Matter. We work with intention aligning pixels, calibrating contrast , and obsessing over every edge until it just feels right.",
    },
    {
      index: "02",
      title: "Character",
      image: "/card-2.jpg",
      description:
        "Interfaces should have personality. We embed small moments of play and irregularity to bring warmth, Charm , and a huamn feel to the digital Experience",
    },
    {
      index: "03",
      title: "Accessibility",
      image: "/card-3.jpg",
      description:
        "Inclusive by default. We prioritize clear semantics, color contrast, and keyboard support so everyone can access and enjoy the experience.",
    },
    {
      index: "04",
      title: "Consistency",
      image: "/card-4.jpg",
      description:
        "A cohesive system builds trust. We establish repeatable patterns, spacing, and motion rules to make interfaces predictable and easy to learn.",
    },
  ];

  return (
    <div ref={container_ref}>
      <h1 className={`${outfit.className} text-7xl tracking-tight mb-24 text-center`}>
        The Foundations
      </h1>
      {StickyCards.map((card, index) => {
        return (
          <div key={card.index} className="main-wrapper relative flex justify-center items-center gap-10 p-[25px] w-[1200px] min-h-screen bg-[#eaeaea]">
            <div className="relative min-h-screen w-[35%] flex flex-col justify-start items-start">
              <h1 className={`${manrope.className} text-black text-[6.5rem] tracking-tighter font-medium`}>
                {card.index}
              </h1>
            </div>
            <div className="div-2 relative h-full w-full flex flex-col justify-start items-start gap-[17px]">
              <h1 className={`${manrope.className} text-black text-[6rem] tracking-tighter font-medium`}>
                {card.title}
              </h1>
              <div className="w-[678px] h-[408px] relative overflow-hidden rounded-[5px]">
                <Image
                  src={card.image}
                  alt="card-images"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-[679px] h-[123px] flex justify-start items-start gap-5 p-4">
                <p className={`${outfit.className} text-[1.1rem] tracking-tight text-black w-full`}>
                  ABOUT THE STATE
                </p>
                <p className={`${outfit.className} text-[1.2rem] tracking-tight text-black`}>
                  {card.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <h1 className={`${outfit.className} text-7xl tracking-tight mt-24 text-center`}>
        The End
      </h1>
    </div>
  );
};

export default StickyCardPin;
