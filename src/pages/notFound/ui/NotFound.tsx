import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
    return (
        <div className="not-found">
            <div className="not-found__container">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__text">
                    Страница, которую вы ищете, не найдена или была удалена.
                </p>
                <Link to={"/"}>
                    <div className="not-found__btn">
                        <p className="not-found__btn-text">На главную</p>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
