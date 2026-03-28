import { useEffect, useRef, useState } from "react";
import "./YandexMapPicker.scss";

interface Props {
    onConfirm: (address: string) => void;
    onClose: () => void;
}

const YANDEX_API_KEY = "e84278b7-0466-4499-8a11-622abe269583";

const loadYmaps = (): Promise<any> => {
    return new Promise((resolve) => {
        if ((window as any).ymaps) {
            (window as any).ymaps.ready(() => resolve((window as any).ymaps));
            return;
        }
        const script = document.createElement("script");
        script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
        script.onload = () => {
            (window as any).ymaps.ready(() => resolve((window as any).ymaps));
        };
        document.head.appendChild(script);
    });
};

export const YandexMapPicker = ({ onConfirm, onClose }: Props) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [selectedAddress, setSelectedAddress] = useState("");

    useEffect(() => {
        let map: any = null;

        const init = async () => {
            const ymaps = await loadYmaps();
            if (!mapRef.current) return;

            map = new ymaps.Map(mapRef.current, {
                center: [55.796391, 49.108891],
                zoom: 10,
                controls: ["zoomControl"],
            });

            let placemark: any = null;

            map.events.add("click", async (e: any) => {
                const coords: [number, number] = e.get("coords");

                if (placemark) {
                    placemark.geometry.setCoordinates(coords);
                } else {
                    placemark = new ymaps.Placemark(coords, {}, { preset: "islands#redDotIcon" });
                    map.geoObjects.add(placemark);
                }

                const res = await ymaps.geocode(coords, { results: 1 });
                const obj = res.geoObjects.get(0);
                const address = obj?.getAddressLine() ?? `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`;
                setSelectedAddress(address);
            });
        };

        init();

        return () => {
            if (map) map.destroy();
        };
    }, []);

    return (
        <>
            <div className="map-picker">
                <div className="map-picker__header">
                    <h3 className="map-picker__title">Выберите адрес на карте</h3>
                    <button className="map-picker__close" onClick={onClose}>✕</button>
                </div>
                <div ref={mapRef} className="map-picker__map" />
            </div>
            <p className="map-picker__selected">
                {selectedAddress || "Кликните на карту, чтобы выбрать адрес"}
            </p>
            <button
                className="map-picker__confirm"
                disabled={!selectedAddress}
                onClick={() => onConfirm(selectedAddress)}
            >
                Подтвердить
            </button>
        </>
    );
};
