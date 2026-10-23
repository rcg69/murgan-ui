// 'use client';

// import React from 'react';
// import Link from 'next/link';
// import "../styles/Perspectives.css";

// export default function PerspectivesSection() {
//   const stories = [
//     {
//       id: 1,
//       title: 'The Art of Elegant Dressing',
//       author: 'Style Expert',
//       image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop',
//       link: '/perspectives/1'
//     },
//     {
//       id: 2,
//       title: 'Sustainable Fashion Choices',
//       author: 'Emma Wilson',
//       image: 'https://images.unsplash.com/photo-1551486093-5fef32de9165?w=600&h=600&fit=crop',
//       link: '/perspectives/2'
//     },
//     {
//       id: 3,
//       title: 'Summer Trends 2024',
//       author: 'Fashion Director',
//       image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=600&fit=crop',
//       link: '/perspectives/3'
//     },
//     {
//       id: 4,
//       title: 'Finding Your Personal Style',
//       author: 'Style Consultant',
//       image: 'https://images.unsplash.com/photo-1597825481888-6e39f6201d4d?w=600&h=600&fit=crop',
//       link: '/perspectives/4'
//     }
//   ];

//   return (
//     <section className="py-16 md:py-24 bg-white border-t border-[#e8e8e8]">
//       <div className="container-custom">
//         <div className="mb-12 md:mb-16">
//           <h2 className="text-2xl md:text-3xl font-light mb-2">Perspectives</h2>
//           <p className="text-gray-600 text-xs md:text-sm font-light tracking-wide">STORIES, INSIGHTS, AND INSPIRATION FROM OUR COMMUNITY</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-10 md:mb-12">
//           {stories.map((story) => (
//             <Link key={story.id} href={story.link} className="group block">
//               <div className="relative h-64 md:h-72 overflow-hidden bg-gray-200 border border-[#e8e8e8]">
//                 <img 
//                   src={story.image} 
//                   alt={story.title}
//                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-5">
//                   <h3 className="text-white text-sm md:text-base font-light mb-1 tracking-tight leading-tight">{story.title}</h3>
//                   <p className="text-white/80 text-xs md:text-sm font-light">{story.author}</p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <div className="text-center">
//           <Link href="/perspectives" className="btn-secondary-pedestal">
//             View All Stories
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import "../styles/Perspectives.css";
import Heading from "./Heading";

export default function PerspectivesSection() {
const items = [
  {
    id: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoPd7hJXNlgBn0D4G0z5zWTlMX9ut2LfZM4JU42sE_F7a1Q2KPIRzSY2Q&s=10",
    title: "Timeless Elegance",
  },
  {
    id: 2,
    image: "https://static.toiimg.com/thumb/115075604/115075604.jpg?height=746&width=420&resizemode=76&imgsize=68958",
    title: "Modern Glamour",
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjT4DLn3RCC_d-y2IGWZuraQynC1O6-6BaQvX04JwitpjtDZXpe5IwqGxt&s=10",
    title: "Contemporary Chic",
  },
  {
    id: 4,
    image: "https://nadiyapaar.com/cdn/shop/files/MalavikaMohanan-1.jpg?v=1761133106&width=2774",
    title: "Effortless Grace",
  },
  {
    id: 5,
    image: "https://www.elahe.in/cdn/shop/files/15_bc0859a8-bde1-442d-bd37-6802dafa069b_2048x.png?v=1767361368",
    title: "Minimal Luxury",
  },
  {
    id: 6,
    image: "https://images.news18.com/webstories/uploads/2025/04/Scent-of-Nostalgia-2025-04-6fb3bbda0937e62cd7c9fa067ae9191c.png",
    title: "Festive Radiance",
  },
];

  return (
    <section className="perspectives-section">
      {/* Heading */}
      <Heading title="Popular Products" subtitle={null} />

      {/* FLOWING GRID */}
      <div className="perspectives-viewport">
        <div className="perspectives-track">
          {[...items, ...items].map((item, index) => (
            <div className="perspective-card" key={index}>
              <img src={item.image} alt={item.title} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
