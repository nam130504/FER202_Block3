import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const slides = [
"/images/supluon.webp",
"/images/buncha.jpg",
"/images/myquang.webp",
"/images/pho.webp",
];


export default function CarouselSlider({ autoplay = true }) {
const settings = {
dots: true,
infinite: true,
autoplay,
autoplaySpeed: 2000,
arrows: true,
slidesToShow: 1,
slidesToScroll: 1,
pauseOnHover: true,
};
return (
<div className="carousel">
<Slider {...settings}>
{slides.map((src, i) => (
<div key={i}>
<img src={src} alt={`slide-${i}`} />
</div>
))}
</Slider>
</div>
);
}