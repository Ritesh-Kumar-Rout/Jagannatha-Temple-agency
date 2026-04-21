import React from 'react';
import Layout from '@/components/Layout';
import { foodCategories } from '@/lib/data';
import FoodHero from '@/components/food/FoodHero';
import FoodGrid from '@/components/food/FoodGrid';

const SweetList: React.FC = () => {
    return (
        <Layout>
            <div className="food-page-wrapper min-h-screen bg-[#fffbf0] relative overflow-x-hidden">
                {/* Immersive Hero Section */}
                <FoodHero />

                {/* Main Content Grid */}
                <main className="relative z-10">
                    <FoodGrid categories={foodCategories} />
                </main>

                {/* Decorative Bottom Section */}
                <section className="py-24 bg-festival-red/5 border-t border-festival-cream/30 text-center relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-4 relative z-10">
                        <img 
                            src="/food/mahaprasada.webp" 
                            alt="Mahaprasad" 
                            className="w-32 h-32 rounded-full mx-auto mb-8 object-cover border-4 border-white shadow-xl grayscale-[20%]"
                        />
                        <h2 className="text-3xl font-serif font-black text-festival-red mb-6 tracking-wider uppercase">Divine Blessing on Every Plate</h2>
                        <p className="text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto">
                            The cuisine of Puri is not just food; it is an offering of love and devotion. Every grain of Mahaprasad is considered spiritually pure and blessed by Lord Jagannath himself.
                        </p>
                    </div>
                </section>

                {/* Styling and Global Animations */}
                <style dangerouslySetInnerHTML={{ __html: `
                    .food-page-wrapper::before {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23B91C1C' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4v-4H4v4H0v2h4v4h2v-4h4v-2H6zm30 0v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
                        pointer-events: none;
                        opacity: 0.5;
                        z-index: 1;
                    }

                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                        100% { transform: translateY(0px); }
                    }

                    .animate-float {
                        animation: float 4s ease-in-out infinite;
                    }

                    /* Fade In Animations from Tailwind and Custom */
                    [data-aos] {
                        opacity: 0;
                        transition-property: opacity, transform;
                    }
                    [data-aos].aos-animate {
                        opacity: 1;
                    }
                `}} />
            </div>
        </Layout>
    );
};

export default SweetList;