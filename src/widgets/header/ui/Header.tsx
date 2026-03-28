import { useFilters } from "@/pages/search/model/useFiltersStore";
import searchIcon from "../assets/search.svg";
import cartIcon from "../assets/shopping-cart.svg";
import profileIcon from "../assets/user.svg";

import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/entities/user";
import { useLogin } from "@/widgets/login/model/useLoginStore";
import { useRegister } from "@/widgets/register/model/useRegisterStore";
import { useCartStore } from "@/entities/cart";
import { useState } from "react";

export const Header = () => {
    const { toggleLogin } = useLogin();
    const { toggleRegister } = useRegister();
    const { isAuth } = useUser();
    const { setCategory, setTags } = useFilters();
    const { cart } = useCartStore();
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);

    const handleSearch = () => {
        if (!query.trim()) return;
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    const handleSearchIconClick = () => {
        if (searchOpen && query.trim()) {
            handleSearch();
        } else {
            setSearchOpen(!searchOpen);
        }
    };

    return (
        <header className="header">
            <div className="header__container _container">
                <div className="header__menu menu">
                    <div className="menu__icon icon-menu">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <nav className="header__nav nav-header menu__body">
                        <ul className="header__nav-list nav-header__list menu__list">
                            <Link
                                onClick={() => setTags("новинки")}
                                to={"/search/?tags=8+марта"}
                            >
                                <li className="header__nav-item">
                                    <p className="header__nav-text">Новинки</p>
                                </li>
                            </Link>
                            <Link
                                onClick={() => setCategory("flowers")}
                                to={"/search/?category=flowers"}
                            >
                                <li className="header__nav-item">
                                    <p className="header__nav-text">Цветы</p>
                                </li>
                            </Link>
                            <Link
                                onClick={() => setCategory("presents")}
                                to={"/search/?category=presents"}
                            >
                                <li className="header__nav-item">
                                    <p className="header__nav-text">Подарки</p>
                                </li>
                            </Link>
                            <Link
                                onClick={() => setCategory("all")}
                                to={"/search/?tags=в+тренде"}
                            >
                                <li className="header__nav-item">
                                    <p className="header__nav-text">В тренде</p>
                                </li>
                            </Link>
                        </ul>
                    </nav>
                </div>
                <Link to="/">
                    <h2 className="header__logo">Вместо слов</h2>
                </Link>

                <div className="header__content">
                    <div className={`header__search-wrapper ${searchOpen ? "header__search-wrapper--open" : ""}`}>
                        <input
                            type="text"
                            className="header__search-input"
                            placeholder="Поиск"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        />
                        <div className="header__search-icon" onClick={handleSearchIconClick}>
                            <img src={searchIcon} alt="search" />
                        </div>
                    </div>
                    {isAuth ? (
                        <div className="header__icons">
                            <Link className="header__link" to="/cart">
                                <div className="header__cart">
                                    <img src={cartIcon} alt="cart" />
                                </div>
                                <div className="header__cart-value">
                                    {cart.length}
                                </div>
                            </Link>
                            <Link to="/settings">
                                <div className="header__profile">
                                    <img src={profileIcon} alt="profile" />
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div className="header__auth">
                            <div
                                onClick={() => toggleLogin()}
                                className="header__auth-text"
                            >
                                Войти
                            </div>
                            <div className="header__auth-decor">/</div>
                            <div
                                onClick={() => toggleRegister()}
                                className="header__auth-text"
                            >
                                Регистрация
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
