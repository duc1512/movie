"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; 

const FOOTER_LINKS_DATA = [
    { 
        title: 'Home', 
        links: [
            { name: 'Home', href:'/' },
            { name: 'Contact us', href: '/contact' },
            { name: 'Term of services', href: '/terms' },
            { name: 'About us', href: '/about' },
        ] 
    },
    { 
        title: 'Live', 
        links: [
            { name: 'Live', href: '/live' },
            { name: 'FAQ', href: '/faq' },
            { name: 'Premium', href: '/premium' },
        ] 
    },
    { 
        title: 'You must watch', 
        links: [
            { name: 'Recent release', href: '/recent-release' },
            { name: 'Top IMDB', href: '/top-imdb' },
            { name: 'Privacy policy', href: '/privacy-policy' },
        ] 
    },
];

const Footer = () => {
    const handleScrollToTop = () => {
        window.scrollTo(0, 0);
    };

    return (
       
        <footer className="relative w-full h-140 flex flex-col justify-end text-white overflow-hidden">
            
            <Image
                src="https://calm-cendol-f3d19f.netlify.app/assets/footer-bg-e4b3ddb4.jpg" 
                alt="Movie collage background"
                fill
                priority
                className="object-cover object-center z-0 filter blur-sm brightness-50" 
                sizes="100vw"
            />

            
            <div className="absolute inset-0  z-10"></div> 

          
            <div className="container mx-auto px-6 pt-24 pb-10 relative z-20">
               
                <div className="flex justify-center mb-16">
                    <div className="flex items-center space-x-2">
     <Link
          href="/"
          className="inline-flex items-center hover:no-underline"
          onClick={handleScrollToTop}
        >
          <img
            src="/tmovie.png"
            alt="Logo"
            className="mr-4 w-8 md:w-12"
          />
          <span
            className="
              text-white font-semibold text-2xl md:text-5xl
              transition-colors duration-300 
              hover:text-red-500 hover:!text-red-500
            "
          >
            theMovies
          </span>
        </Link>
                    </div>
                </div>

                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-22 ml-80 gap-x-82 mb-16">
                    {FOOTER_LINKS_DATA.map((section, sectionIndex) => (
                        <div key={sectionIndex} className="flex flex-col   items-center md:items-start text-center md:text-left  ">  
                            <ul>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="mb-8">
                                        <Link 
                                            href={link.href}
                                            className="text-3xl text-gray-400 hover:text-red-500 transition-colors whitespace-nowrap "
                                            onClick={handleScrollToTop}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                   
                    <div className="hidden lg:flex flex-col items-center md:items-start text-center md:text-left">
                      
                    </div>
                    
                    <div className="hidden xl:flex flex-col items-center md:items-start text-center md:text-left">
                       
                    </div>
                </div>

                
               
               
            </div>
        </footer>
    );
};

export default Footer;