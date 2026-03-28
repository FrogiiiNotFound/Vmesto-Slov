import "./checkbox.scss";

interface CheckboxProps {
    text: string;
    onChange: () => void;
    checked?: boolean; // добавляем контролируемый проп
}

export const Checkbox: React.FC<CheckboxProps> = ({
    text,
    onChange,
    checked = false,
}) => {
    return (
        <label className="checkbox">
            <input
                type="checkbox"
                className="checkbox__input"
                checked={checked} // управляемый чекбокс
                onChange={onChange} // вызываем callback при клике
            />
            <span className="checkbox__checkmark"></span>
            {text}
        </label>
    );
};
