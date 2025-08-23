import { cn } from "@/lib/utils";
import { Marquee } from '@/components/marquee';

interface Review {
  id: number;
  user_name: string;
  user_username: string;
  destination_name: string;
  content: string;
  rating: number;
  image_url: string | null;
  created_at: string;
}

interface MarqueeTestiProps {
  testimonials: Review[];
}

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
  destination,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  rating: number;
  destination: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-72 cursor-pointer overflow-hidden rounded-xl border p-4 bg-white shadow-md",
        "border-gray-200 hover:shadow-lg transition-shadow duration-200"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <img 
          className="rounded-full w-12 h-12 object-cover" 
          alt={name} 
          src={img || "/default-avatar.png"} 
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-semibold text-gray-800">
            {name}
          </figcaption>
          <p className="text-xs text-gray-500">{username}</p>
        </div>
      </div>
      
      {/* Rating Stars */}
      <div className="flex items-center mb-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            {i < rating ? '★' : '☆'}
          </span>
        ))}
      </div>
      
      <blockquote className="text-sm text-gray-600 mb-2 line-clamp-3">
        "{body}"
      </blockquote>
      
      <p className="text-xs text-gray-500 italic">
        - {destination}
      </p>
    </figure>
  );
};

export function MarqueeTesti({ testimonials }: MarqueeTestiProps) {
  // Format data untuk marquee
  const formattedTestimonials = testimonials.map(testimonial => ({
    id: testimonial.id,
    img: testimonial.image_url || "/default-avatar.png",
    name: testimonial.user_name,
    username: testimonial.user_username,
    body: testimonial.content,
    rating: testimonial.rating,
    destination: testimonial.destination_name
  }));

  const firstRow = formattedTestimonials.slice(0, Math.ceil(formattedTestimonials.length / 2));
  const secondRow = formattedTestimonials.slice(Math.ceil(formattedTestimonials.length / 2));

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8">
      <Marquee pauseOnHover className="[--duration:25s]">
        {firstRow.map((review) => (
          <ReviewCard 
            key={review.id} 
            {...review} 
          />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s] mt-4">
        {secondRow.map((review) => (
          <ReviewCard 
            key={review.id} 
            {...review} 
      
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white"></div>
    </div>
  );
}