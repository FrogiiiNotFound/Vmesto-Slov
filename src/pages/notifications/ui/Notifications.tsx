import { Menu } from "@widgets/menu";
import "./notifications.scss";
import { Checkbox } from "@shared/ui/checkbox";
import { useState } from "react";

export const Notifications = () => {
    const [sms, setSms] = useState(false);
    const [email, setEmail] = useState(false);
    const [promos, setPromos] = useState(false);
    const [news, setNews] = useState(false);

    return (
        <div className="notifications">
            <div className="notifications__container _container">
                <h2 className="notifications__title title">Профиль</h2>
                <div className="notifications__content main-content">
                    <Menu />
                    <div className="notifications__info-wrapper">
                        <h2 className="notifications__title title">
                            Уведомления
                        </h2>
                        <div className="notifications__content">
                            <form action="#" className="notifications__form">
                                <fieldset className="notifications__inputs">
                                    <legend className="notifications__notification-title">
                                        Способ получения
                                    </legend>
                                    <Checkbox text="SMS сообщения" checked={sms} onChange={() => setSms(!sms)} />
                                    <Checkbox text="E-mail" checked={email} onChange={() => setEmail(!email)} />
                                </fieldset>
                                <fieldset className="notifications__inputs">
                                    <legend className="notifications__notification-title">
                                        Подписаться на уведомления
                                    </legend>
                                    <Checkbox text="Акции и скидки" checked={promos} onChange={() => setPromos(!promos)} />
                                    <Checkbox text="Новости" checked={news} onChange={() => setNews(!news)} />
                                </fieldset>
                                <button className="notifications__btn">
                                    Сохранить изменения
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
