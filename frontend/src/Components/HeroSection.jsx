import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from './Assets/hero.png';


gsap.registerPlugin(ScrollTrigger)

export const HeroSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(imageRef.current, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.2 })
        .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4 }, '-=1.6')
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 }, '-=1.1')
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, '-=0.9');

      gsap.fromTo(
        imageRef.current,
        { yPercent: 0 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden bg-gray-50 flex items-end justify-start pb-16 md:pb-24"
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
         <img
            ref={imageRef}
            src={heroImage}
            alt="SYK Shades Editorial Campaign"
            className="w-full h-full object-cover object-center"
            style={{ transformOrigin: 'center center' }}
          />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/30 to-transparent" />
      </div>

      {/* Content — same max-w-7xl + px-6 md:px-16 as navbar and Popular */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col items-start max-w-2xl">

          <p
            ref={subtitleRef}
            className="text-base uppercase tracking-[0.2em] text-gray-500 mb-5 font-medium"
          >
            SYKSHADES / Collection 
          </p>

          <h1
            ref={titleRef}
            className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-black tracking-tight leading-[1.05] mb-8"
          >
            New Collections <br />
            <span className="font-medium">For Everyone</span>
          </h1>

          <div ref={ctaRef}>
            <Link
              to="/shop"
              className="group relative inline-flex items-center overflow-hidden border border-black px-8 py-3 text-base uppercase tracking-widest text-black hover:text-white transition-colors duration-500"
            >
              <span className="relative z-10">Shop Collection</span>
              <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}