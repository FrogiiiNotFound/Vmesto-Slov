import template from "@shared/template/template-icon.svg";
import "./Menu.scss";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "@/entities/user";
import { toast } from "sonner";
import { userApi } from "@/entities/user/api/user";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const Menu = () => {
    const location = useLocation();
    const { setIsAuth } = useUser();
    const queryClient = useQueryClient();
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutUser = () => {
        userApi
            .logout()
            .then(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("REACT_QUERY_OFFLINE_CACHE");
                setIsAuth(false);
                queryClient.clear();
                toast("Вы вышли из аккаунта");
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    return (
        <>
            <button className="profile__menu-toggle" onClick={() => setMenuOpen(true)}>
                ☰ Меню
            </button>
            {menuOpen && (
                <div className="profile__menu-overlay" onClick={() => setMenuOpen(false)} />
            )}
            <div className={`profile__menu ${menuOpen ? "profile__menu--open" : ""}`}>
                <button className="profile__menu-close" onClick={() => setMenuOpen(false)}>✕</button>
                <ul className="profile__list">
                <Link to={"/settings"}>
                    <li
                        className={`profile__item ${location.pathname === "/settings" ? "active" : ""}`}
                    >
                        <div className="profile__item-img">
                            <img src={template} alt="item-img" />
                        </div>
                        <h3 className="profile__item-text">Профиль</h3>
                    </li>
                </Link>
                <Link to={"/orders"}>
                    <li
                        className={`profile__item ${location.pathname === "/orders" ? "active" : ""}`}
                    >
                        <div className="profile__item-img">
                            <img src={template} alt="item-img" />
                        </div>
                        <h3 className="profile__item-text">Мои заказы</h3>
                    </li>
                </Link>
                <Link to={"/notifications"}>
                    <li
                        className={`profile__item ${location.pathname === "/notifications" ? "active" : ""}`}
                    >
                        <div className="profile__item-img">
                            <img src={template} alt="item-img" />
                        </div>
                        <h3 className="profile__item-text">Уведомления</h3>
                    </li>
                </Link>
                <Link to={"/favourites"}>
                    <li
                        className={`profile__item ${location.pathname === "/favourites" ? "active" : ""}`}
                    >
                        <div className="profile__item-img">
                            <img src={template} alt="item-img" />
                        </div>
                        <h3 className="profile__item-text">Избранное</h3>
                    </li>
                </Link>
            </ul>
            <div className="profile__bonus">
                <div className="profile__bonus-img">
                    <img src={template} alt="bonus" />
                </div>
                <div className="profile__bonus-texts">
                    <p className="profile__bonus-title">
                        <span>0</span> Б
                    </p>
                    <p className="profile__bonus-text">Бонусов на счете</p>
                </div>
            </div>
            <div className="profile__logout" onClick={() => logoutUser()}>
                Выйти из аккаунта
            </div>
        </div>
        </>
    );
};
