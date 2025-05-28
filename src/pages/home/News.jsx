import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import news1 from "../../assets/news/news-1.png"
import news2 from "../../assets/news/news-2.png"
import news3 from "../../assets/news/news-3.png"
import news4 from "../../assets/news/news-4.png"
import { Link } from 'react-router-dom';

const news = [
    {
        "id": 1,
        "title": "NASA Interns Conduct Aerospace Research in Microgravity",
        "description": "NASA interns are working on groundbreaking aerospace research projects in microgravity environments, contributing to future space exploration.",
        "image": news1,
        "link": "https://science.nasa.gov/learning-resources/for-colleges-universities/nasa-stem-projects/nasa-interns-conduct-aerospace-research-in-microgravity/"
    },
    {
        "id": 2,
        "title": "South City Mall Bookshop Goes Into Liquidation",
        "description": "A popular bookshop in South City Mall has entered liquidation, marking another casualty in the changing retail landscape for physical bookstores.",
        "image": news2,
        "link": "https://www.thepress.co.nz/nz-news/360703103/south-city-mall-bookshop-goes-liquidation"
    },
    {
        "id": 3,
        "title": "Google Faces Antitrust Lawsuit as AI Chip Race Heats Up",
        "description": "The DOJ files antitrust charges against Google while tech giants like Nvidia and Meta invest billions in AI chip development to power next-gen AI systems.",
        "image": news3,
        "link": "https://qz.com/google-antitrust-doj-nvidia-ai-chips-mark-zuckerberg-ai-1851779976"
    },
    {
        "id": 4,
        "title": "Stock Markets Watch Nvidia Earnings Closely",
        "description": "Investors await Nvidia's earnings report as stock markets show mixed signals, with tech stocks particularly sensitive to AI industry developments.",
        "image": news4,
        "link": "https://finance.yahoo.com/news/live/stock-market-today-dow-sp-500-nasdaq-futures-slip-with-all-eyes-on-nvidia-earnings-233141858.html"
    }
]

const News = () => {
  return (
    <div className='py-16'>
        <h2 className='text-3xl font-semibold mb-6'>News</h2>

        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        
        {
            news.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12 h-full'>
                        {/* content */}
                        <div className='py-4 h-full flex flex-col'>
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                                 <h3 className='text-lg font-medium hover:text-blue-500 mb-4 line-clamp-2'>{item.title}</h3>
                            </a>
                            <div className='w-12 h-[4px] bg-primary mb-5'></div>
                            <p className='text-sm text-gray-600 line-clamp-3'>{item.description}</p>
                        </div>

                        <div className='flex-shrink-0'>
                            <img src={item.image} alt="" className='w-full object-cover'/>
                        </div>
                    </div>
                </SwiperSlide>
            ) )
        }
      </Swiper>
    </div>
  )
}

export default News