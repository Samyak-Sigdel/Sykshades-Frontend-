import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        imageRef.current,
        { scale: 1.15, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2.2 }
      )
      .fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        '-=1.6'
      )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.4 },
        '-=1.1'
      )
      .fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        '-=0.9'
      );

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
            scrub: true,
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden bg-gray-50 flex items-center md:items-end justify-start px-6 md:px-16 pb-16 md:pb-24"
    >
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          ref={imageRef}
          src="https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=2000"
          alt="Hero Campaign"
          className="w-full h-full object-cover object-center"
          style={{ transformOrigin: 'center center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent md:bg-gradient-to-r md:from-white/90 md:via-white/30 md:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full flex flex-col items-start pt-24 md:pt-0">

        <p
          ref={labelRef}
          className="text-xs uppercase tracking-widest text-gray-500 mb-4 md:mb-6 font-medium"
        >
          SYK SHADES / New Collection
        </p>

        <h1
          ref={titleRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-black tracking-tight leading-[1.05] mb-8 max-w-2xl"
        >
          Designed For <br />
          <span className="font-medium">Everyday Confidence</span>
        </h1>

        <div ref={ctaRef}>
          <Link
            to="/shop"
            className="group relative inline-flex items-center overflow-hidden border border-black px-8 py-3 text-xs uppercase tracking-widest text-black hover:text-white transition-colors duration-500"
          >
            <span className="relative z-10">Shop Collection</span>
            <span className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}