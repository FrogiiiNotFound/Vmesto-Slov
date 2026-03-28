import search from "@shared/assets/images/search.svg";
import "./Home.scss";
import "./Products.scss";

import { LoginForm } from "@/widgets/login/ui/LoginForm";
import { MainSlider, PromoSlider, Slider } from "@widgets/home";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { RegisterForm } from "@/widgets/register";

const searchItems = [
    { label: "Для девушки", tags: "для девушки" },
    { label: "День рождения", tags: "день рождения" },
    { label: "День учителя", tags: "день учителя" },
    { label: "8 марта", tags: "8 марта" },
    { label: "Новый год", tags: "новый год" },
    { label: "14 февраля", tags: "14 февраля" },
    { label: "Новинки", tags: "новинки" },
    { label: "Акции", tags: "акции" },
    { label: "Коллеге", tags: "коллеге" },
];

export const Home = () => {
    return (
        <div>
            <section className="home">
                <div className="home__container _container">
                    <ul className="home__search-list">
                        {searchItems.map((item) => (
                            <Link key={item.tags} to={`/search?tags=${encodeURIComponent(item.tags)}`}>
                                <li className="home__search-item">
                                    <div className="home__search-img">
                                        <img src={search} alt="search" />
                                    </div>
                                    <p className="home__search-text">{item.label}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                    <div className="home__content">
                        <MainSlider />
                        <PromoSlider />
                    </div>
                </div>
            </section>
            <section className="products">
                <div className="products__container _container">
                    <div className="products__title">
                        Доставка цветов по всей России💐
                    </div>
                    <div className="products__slider-container">
                        <h3 className="products__slider-title">В тренде🔥</h3>
                        <Slider filter="в тренде" />
                    </div>
                    <div className="products__slider-container">
                        <h3 className="products__slider-title">Выгодно💯</h3>
                        <Slider filter="выгодно" />
                    </div>
                    <div className="products__slider-container">
                        <h3 className="products__slider-title">Новинки🏆</h3>
                        <Slider filter="новинки" />
                    </div>
                </div>
            </section>
            <LoginForm />
            <RegisterForm />
        </div>
    );
};
