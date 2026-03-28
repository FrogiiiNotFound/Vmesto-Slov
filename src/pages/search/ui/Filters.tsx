import { Checkbox } from "@/shared/ui/checkbox";
import arrow from "@shared/assets/images/arrow-filters.svg";
import "./Filters.scss";

import { Slider } from "@/shared/components/ui/slider";
import { useState, type ChangeEvent } from "react";
import { tagsList } from "../constants/tags";
import { flowersName } from "../constants/flowersName";
import { useSearchParams } from "react-router-dom";

export const Filters = ({ open, onClose }: { open?: boolean; onClose?: () => void }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const category = searchParams.get("category") || "all";
    const priceFrom = Number(searchParams.get("priceFrom")) || 0;
    const priceTo = Number(searchParams.get("priceTo")) || 20000;
    const compositionParam = searchParams.get("composition")?.split(",").filter(Boolean) ?? [];
    const tagsParam = searchParams.get("tags")?.split(",").filter(Boolean) ?? [];

    const [priceRange, setPriceRange] = useState<[number, number]>([priceFrom, priceTo]);

    const [isFlowersOpen, setIsFlowersOpen] = useState(true);
    const [isSpecialOpen, setIsSpecialOpen] = useState(true);

    const update = (key: string, value: string | null) => {
        const p = new URLSearchParams(searchParams);
        if (!value) p.delete(key);
        else p.set(key, value);
        p.delete("page");
        setSearchParams(p);
    };

    const handleCategoryChange = (newCategory: string) => {
        update("category", newCategory === "all" ? null : newCategory);
    };

    const handleSliderChange = (value: number[]) => {
        const [from, to] = value as [number, number];
        setPriceRange([from, to]);
        const p = new URLSearchParams(searchParams);
        from === 0 ? p.delete("priceFrom") : p.set("priceFrom", String(from));
        to === 20000 ? p.delete("priceTo") : p.set("priceTo", String(to));
        p.delete("page");
        setSearchParams(p);
    };

    const onPriceFromInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = Math.min(Number(e.target.value) || 0, priceRange[1]);
        setPriceRange([val, priceRange[1]]);
        update("priceFrom", val === 0 ? null : String(val));
    };

    const onPriceToInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = Math.max(Number(e.target.value) || 20000, priceRange[0]);
        setPriceRange([priceRange[0], val]);
        update("priceTo", val === 20000 ? null : String(val));
    };

    const toggleMultiParam = (paramKey: string, current: string[], value: string) => {
        const next = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        update(paramKey, next.length ? next.join(",") : null);
    };

    return (
        <div className={`filters__filters ${open ? "filters__filters--open" : ""}`}>
            {onClose && (
                <button className="filters__close" onClick={onClose}>✕</button>
            )}
            <div className="filters__filter">
                <h3 className="filters__filter-title">Категории</h3>
                <div className="filters__filter-buttons">
                    {[
                        { label: "Все", value: "all" },
                        { label: "Цветы", value: "flowers" },
                        { label: "Подарки", value: "presents" },
                        { label: "Сладкое", value: "sweet" },
                        { label: "Украшения", value: "decorations" },
                    ].map((cat) => (
                        <div
                            key={cat.value}
                            className={`filters__filter-button ${category === cat.value ? "active" : ""}`}
                            onClick={() => handleCategoryChange(cat.value)}
                        >
                            <div className="filters__filter-button-text">{cat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="filters__filter">
                <h3 className="filters__filter-title">Параметры</h3>
                <h4 className="filters__filter-subtitle">Цена</h4>
                <div className="filters__filter-inputs">
                    <input
                        value={priceRange[0]}
                        type="number"
                        className="filters__filter-input"
                        placeholder="0"
                        onChange={onPriceFromInputChange}
                    />
                    <input
                        value={priceRange[1]}
                        type="number"
                        className="filters__filter-input"
                        placeholder="20000"
                        onChange={onPriceToInputChange}
                    />
                </div>
                <Slider
                    value={priceRange}
                    onValueChange={handleSliderChange}
                    min={0}
                    max={20000}
                    step={100}
                />
            </div>
            <div className="filters__addition-filters">
                <div className="filters__addition-filter">
                    <div
                        className="filters__addition-filter-header"
                        onClick={() => setIsFlowersOpen(!isFlowersOpen)}
                    >
                        <h3 className="filters__addition-filter-title">Цветы в составе</h3>
                        <div className={`filters__addition-filter-icon ${isFlowersOpen ? "active" : ""}`}>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>
                    <div className={`filters__addition-filter-body ${isFlowersOpen ? "active" : ""}`}>
                        <div className="body-buttons">
                            {flowersName.map((flower) => (
                                <Checkbox
                                    key={flower.value}
                                    text={flower.label}
                                    checked={compositionParam.includes(flower.value)}
                                    onChange={() => toggleMultiParam("composition", compositionParam, flower.value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="filters__addition-filter">
                    <div
                        className="filters__addition-filter-header"
                        onClick={() => setIsSpecialOpen(!isSpecialOpen)}
                    >
                        <h3 className="filters__addition-filter-title">Теги</h3>
                        <div className={`filters__addition-filter-icon ${isSpecialOpen ? "active" : ""}`}>
                            <img src={arrow} alt="arrow" />
                        </div>
                    </div>
                    <div className={`filters__addition-filter-body ${isSpecialOpen ? "active" : ""}`}>
                        <div className="body-buttons">
                            {tagsList.map((tag) => (
                                <Checkbox
                                    key={tag.value}
                                    text={tag.label}
                                    checked={tagsParam.includes(tag.value)}
                                    onChange={() => toggleMultiParam("tags", tagsParam, tag.value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
