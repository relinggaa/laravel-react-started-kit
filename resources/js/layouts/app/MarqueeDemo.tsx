import { cn } from "@/lib/utils";
import { Marquee } from '@/components/marquee';
import { Parallax } from 'react-scroll-parallax'; // Import Parallax
import ijenImage from '@/assets/ijen.jpg';
import djawatan from '@/assets/djawatan.jpg';
import pulaumerah from '@/assets/pulaumerah.jpg';
import bedil from '@/assets/bedil.jpeg';

const reviews = [
  {
    img: ijenImage,
  },
  {
    img: djawatan,
  },
  {
    img: pulaumerah,
  },
  {
    img: bedil,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img }: { img: string }) => {
  return (
    <div className=" w-1/3 p-2">
      {/* Add Parallax to image */}
        <img
          className="w-full h-auto rounded-xl"
          alt="Review"
          src={img}
        />
    
    </div>
  );
};

export function MarqueeDemo() {
  return (
    <div className="bg-blue-50 relative w-full  flex flex-col items-center justify-center overflow-hidden ">
      <Parallax speed={100}> 
      <Marquee pauseOnHover className="[--duration:20s]">
        <div className="w-4xl flex space-x-2">
          {firstRow.map((review) => (
            <ReviewCard key={review.img} img={review.img} />
          ))}
        </div>
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        <div className="w-4xl flex space-x-2">
          {secondRow.map((review) => (
            <ReviewCard key={review.img} img={review.img} />
          ))}
        </div>
      </Marquee>
        </Parallax>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
