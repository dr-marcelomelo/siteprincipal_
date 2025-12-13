import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Testimonial } from '../types';

interface TestimonialsCarouselProps {
    testimonials: Testimonial[];
}

const TestimonialsCarousel: React.FC<TestimonialsCarouselProps> = ({ testimonials }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-play carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full">
            {/* Carousel Container */}
            <div className="relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <div className="bg-neutral-darkGray p-6 md:p-8 rounded-xl md:rounded-2xl shadow-lg border-t-2 md:border-t-4 border-gold-medium">
                            {/* Avatar and Info - Compact Horizontal Layout */}
                            <div className="flex items-center gap-3 mb-4">
                                {/* Smaller Avatar */}
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gold-medium flex-shrink-0">
                                    {testimonials[currentIndex].avatar?.startsWith('/') ? (
                                        <img
                                            src={testimonials[currentIndex].avatar}
                                            alt={testimonials[currentIndex].name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gold-medium to-gold-dark flex items-center justify-center">
                                            <span className="text-white font-bold text-xs md:text-sm">
                                                {testimonials[currentIndex].avatar || testimonials[currentIndex].name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Name, Service, and Location */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm md:text-base text-white truncate">{testimonials[currentIndex].name}</p>
                                    <p className="text-[10px] md:text-xs text-gold-medium font-medium">{testimonials[currentIndex].service}</p>
                                    <p className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-wide">{testimonials[currentIndex].location}</p>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="text-gold-medium text-2xl md:text-4xl font-serif mb-2 md:mb-3">"</div>
                            <p className="text-xs md:text-base text-gray-300 italic leading-relaxed">
                                {testimonials[currentIndex].text}
                            </p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6 md:mt-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-gold-medium w-6 md:w-8' : 'bg-gray-600 hover:bg-gray-500'
                            }`}
                        aria-label={`Ir para depoimento ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TestimonialsCarousel;
