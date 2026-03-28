import mail from "@shared/assets/images/mail.svg";
import telegram from "@shared/assets/images/telegram.svg";
import vk from "@shared/assets/images/vk.svg";

import "./footer.scss";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container _container">
                <div className="footer__content">
                    <div className="footer__main-info">
                        <h2 className="footer__logo">Вместо слов</h2>
                        <div className="footer__socials">
                            <Link to={"mailto:vmesto.slov@yandex.ru"}>
                                <div className="footer__social">
                                    <img src={mail} alt="mail" />
                                </div>
                            </Link>
                            <Link to={"https://t.me/vmesto_slov_kzn"}>
                                <div className="footer__social">
                                    <img src={telegram} alt="telegram" />
                                </div>
                            </Link>
                            <Link
                                to={"https://vk.com/vmestosloov"}
                                target="_blank"
                            >
                                <div className="footer__social">
                                    <img src={vk} alt="whatsapp" />
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="footer__columns">
                        <div className="footer__info">
                            <h3 className="footer__info-title">Каталог</h3>
                            <ul className="footer__links">
                                <li className="footer__link">
                                    <a href="">Новинки</a>
                                </li>
                                <li className="footer__link">
                                    <a href="">Цветы</a>
                                </li>
                                <li className="footer__link">
                                    <a href="">Подарки</a>
                                </li>
                                <li className="footer__link">
                                    <a href="">В тренде</a>
                                </li>
                                <li className="footer__link">
                                    <a href="">Скидки</a>
                                </li>
                                <li className="footer__link">
                                    <a href="">Вкусное</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__info">
                            <h3 className="footer__info-title">
                                Полезные ссылки
                            </h3>
                            <ul className="footer__links">
                                <li className="footer__link">
                                    <a href="/reviews">Отзывы</a>
                                </li>
                                <li className="footer__link">
                                    <a href="/bouquet-care-instructions">
                                        Инструкции по уходу за букетом
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <a href="/how-to-place-an-order">
                                        Как оформить заказ
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <a href="/help">Помощь</a>
                                </li>
                                <li className="footer__link">
                                    <a href="/services">Сервисы</a>
                                </li>
                                <li className="footer__link">
                                    <a href="/job">Вакансии</a>
                                </li>
                                <li className="footer__link">
                                    <a href="/franchise">Франшиза</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__info">
                            <h3 className="footer__info-title">
                                Дополнительно
                            </h3>
                            <ul className="footer__links">
                                <li className="footer__link">
                                    <a href="/privacy-policy">
                                        Политика конфиденциальности
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <a href="/terms-of-use">
                                        Условия пользования
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <a href="/rules">Правила</a>
                                </li>
                                <li className="footer__link">
                                    <a href="/discount">
                                        Скидка с первого заказа
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <a href="/cancellation-policy">
                                        Правила отмены заказа
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer__info">
                            <h3 className="footer__info-title">Контакты</h3>
                            <ul className="footer__links">
                                <li className="footer__link">
                                    <a href="tel:8 960 08 08 528">
                                        8 960 08 08 528
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <p>г. Казань ул.Зур Урам 1К</p>
                                </li>
                                <li className="footer__link">
                                    <a href="https://t.me/vmesto_slov_kzn">
                                        Телеграм
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <a href="mailTo:Vmesto.slov@yandex.ru">
                                        Vmesto.slov@yandex.ru
                                    </a>
                                </li>
                                <li className="footer__link">
                                    <a href="https://t.me/frogiiinotfound">
                                        Создание сайтов - RumpStudio
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__addition">
                    <a
                        href="https://t.me/frogiiinotfound"
                        className="footer__addition-text"
                    >
                        Дизайн и верстку для проекта в портфолио подготовил:{" "}
                        <span>FrogiiiNotFound</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
