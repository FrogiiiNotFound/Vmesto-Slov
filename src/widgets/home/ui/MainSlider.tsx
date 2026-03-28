import arrow from "@shared/assets/images/arrow-slider.svg";
import { useRef } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import slideAd1 from "../assets/bento-cake.png";
import slideAd2 from "../assets/strawberry-in-chocolate.png";
import slideAd3 from "../assets/bright-ballons.png";
import slideAd4 from "../assets/couple-with-flowers.png";
import slideAd5 from "../assets/girl-in-flowers.png";
import "./MainSlider.scss";
import { useNavigate } from "react-router-dom";

const slides = [
    { img: slideAd2, title: "Клубника в шоколаде", text: "Сладкие моменты для вас!", category: "sweet" },
    { img: slideAd1, title: "Бенто-торты", text: "Милый тренд для особых моментов", q: "торты" },
    { img: slideAd3, title: "Яркие воздушные шары", text: "Идеал для любого праздника!", q: "шары" },
    { img: slideAd4, title: "Только свежие цветы", text: "С лучших плантаций и проверенных поставщиков", category: "flowers" },
    { img: slideAd5, title: "Быстрая доставка и яркие эмоции", text: "Подари незабываемые впечатления", category: "flowers" },
] as const;

export const MainSlider = () => {
    const swiperRef = useRef<SwiperRef>(null);
    const navigate = useNavigate();

    const handleSlideClick = (slide: (typeof slides)[number]) => {
        if ('category' in slide) {
            navigate(`/search?category=${slide.category}`);
        } else {
            navigate(`/search?q=${encodeURIComponent(slide.q)}`);
        }
    };

    return (
        <div className="main-slider">
            <Swiper
                className="main-slider__wrapper"
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                navigation={false}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                speed={600}
            >
                {slides.map((slide, i) => (
                    <SwiperSlide
                        key={i}
                        className="main-slider__slide"
                        onClick={() => handleSlideClick(slide)}
                        style={{ cursor: "pointer" }}
                    >
                        <div className="main-slider__img">
                            <img src={slide.img} alt="slide-img" />
                        </div>
                        <div className="main-slider__info">
                            <h3 className="main-slider__info-title">{slide.title}</h3>
                            <p className="main-slider__info-text">{slide.text}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="main-slider__buttons">
                <div
                    onClick={() => swiperRef.current?.swiper.slidePrev()}
                    className="main-slider__prev"
                >
                    <img src={arrow} alt="arrow" />
                </div>
                <div
                    onClick={() => swiperRef.current?.swiper.slideNext()}
                    className="main-slider__next"
                >
                    <img src={arrow} alt="arrow" />
                </div>
            </div>
        </div>
    );
};
