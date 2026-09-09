"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const openModal = (title = "Book a Free Consultation") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("openConsultationModal", { detail: { title } }));
  }
};

const defaultTestimonials = [
  {
    name: "Rahul S.",
    role: "Project Manager",
    location: "Texas, USA",
    cert: "PMP® Certified",
    quote: "Certification Planner's instructor-led training helped me clear PMP® on my first attempt.",
    badge: "Promotion",
    badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200"
  },
  {
    name: "Priya M.",
    role: "Security Manager",
    location: "Ontario, Canada",
    cert: "CISSP® Certified",
    quote: "The support and resources are unmatched. Highly recommend CP!",
    badge: "Salary Hike 30%",
    badgeColor: "bg-blue-50 text-brand-blue border-blue-200"
  },
  {
    name: "James T.",
    role: "Solutions Architect",
    location: "Sydney, Australia",
    cert: "AWS Solutions Architect",
    quote: "Great training, real-world examples and excellent instructor support.",
    badge: "New Career",
    badgeColor: "bg-purple-50 text-purple-600 border-purple-200"
  }
];

export default function Testimonials({ siteSettings = {} }) {
  const displayTestimonials = siteSettings.testimonials && siteSettings.testimonials.length > 0
    ? siteSettings.testimonials
    : defaultTestimonials;

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const isCarousel = displayTestimonials.length > 3;

  React.useEffect(() => {
    if (!isCarousel || isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isCarousel, isHovered, displayTestimonials.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % displayTestimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + displayTestimonials.length) % displayTestimonials.length);
  };

  // Get 3 visible items starting from currentIndex
  const visibleTestimonials = isCarousel
    ? [
        displayTestimonials[currentIndex % displayTestimonials.length],
        displayTestimonials[(currentIndex + 1) % displayTestimonials.length],
        displayTestimonials[(currentIndex + 2) % displayTestimonials.length]
      ]
    : displayTestimonials;

  return (
    <section className="py-16 md:py-24 bg-white border-b border-gray-100 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTA */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h2 className="text-3xl md:text-5xl font-black text-brand-navy tracking-tight leading-tight">
              {siteSettings.testimonials_title ? (
                <span dangerouslySetInnerHTML={{ __html: siteSettings.testimonials_title }} />
              ) : (
                <>
                  Real Stories.<br />
                  <span className="text-brand-orange">Real Success.</span>
                </>
              )}
            </h2>

            <p className="text-xs md:text-sm text-gray-500 font-semibold leading-relaxed">
              {siteSettings.testimonials_subtitle || "Our students achieve their goals and transform their careers."}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => openModal("Book a Free Consultation")}
                className="inline-flex items-center justify-center rounded-2xl bg-brand-blue px-7 py-4 text-xs font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-opacity-90 transition-all hover:scale-[1.01] cursor-pointer"
              >
                View More Success Stories
              </button>

              {isCarousel && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="h-10 w-10 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-brand-blue/5 text-gray-600 hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer"
                    title="Previous Testimonial"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-10 w-10 rounded-xl border border-gray-200 hover:border-brand-blue hover:bg-brand-blue/5 text-gray-600 hover:text-brand-blue flex items-center justify-center transition-all cursor-pointer"
                    title="Next Testimonial"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column Testimonials Cards */}
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="lg:col-span-8 grid sm:grid-cols-3 gap-6 relative"
          >
            {visibleTestimonials.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-gray-200/80 p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px] text-left space-y-6 animate-in fade-in zoom-in-95"
              >
                <div className="space-y-4">
                  {/* Badge & Rating */}
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${item.badgeColor || 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                      {item.badge || 'Graduate'}
                    </span>
                    <div className="flex text-amber-400">
                      {[...Array(parseInt(item.rating || 5))].map((_, i) => (
                        <span key={i} className="text-xs">★</span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <p className="text-xs text-gray-600 font-semibold leading-relaxed italic line-clamp-4">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center text-sm border border-brand-blue/20 shrink-0">
                    {item.name ? item.name.charAt(0) : "S"}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-brand-navy">{item.name}</h4>
                    <p className="text-[10px] text-gray-400 font-bold">{item.role} • {item.location || 'USA'}</p>
                    <p className="text-[10px] font-bold text-brand-blue">{item.cert}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
