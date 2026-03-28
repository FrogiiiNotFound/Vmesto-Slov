import { Menu } from '@widgets/menu';
import './orders.scss';
import { useGetOrders } from '@/entities/user/model/useGetOrders';
import { useState } from 'react';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/shared/components/ui/pagination';

const LIMIT = 3;

export const Orders = () => {
    const [page, setPage] = useState(1);
    const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
    const { data, isLoading, error } = useGetOrders(page);

    const totalPages = Math.ceil((data?.totalCount ?? 0) / LIMIT);

    const toggleExpand = (orderId: string) => {
        setExpandedOrders((prev) => {
            const next = new Set(prev);
            next.has(orderId) ? next.delete(orderId) : next.add(orderId);
            return next;
        });
    };

    const getPages = () => {
        const pages: number[] = [];
        for (let i = Math.max(1, page - 2); i <= Math.min(totalPages, page + 2); i++) {
            pages.push(i);
        }
        if (!pages.includes(totalPages) && totalPages > 0) pages.push(totalPages);
        return pages;
    };

    const goToPage = (p: number) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="orders">
            <div className="orders__container _container">
                <h2 className="orders__title title">Профиль</h2>
                <div className="orders__content main-content">
                    <Menu />
                    <div className="orders__info-wrapper">
                        <h2 className="orders__title title">Мои заказы</h2>
                        {isLoading && <div>Загрузка...</div>}
                        {error && <div>Ошибка загрузки</div>}
                        {!isLoading && data?.data?.length === 0 && (
                            <div className="orders__empty">У вас пока нет заказов</div>
                        )}
                        <div className="orders__list">
                            {data?.data?.map((order: any) => (
                                <div key={order._id} className="orders__order">
                                    <div className="orders__order-items-wrapper">
                                        <div className="orders__order-items">
                                            {(expandedOrders.has(order._id) ? order.items : order.items?.slice(0, 2))?.map((item: any) => {
                                                const product = order.products?.find(
                                                    (p: any) => String(p._id) === String(item.product_id)
                                                );
                                                return (
                                                    <div key={item._id} className="orders__order-item">
                                                        <div className="orders__order-img">
                                                            <img src={product?.image} alt={product?.name} />
                                                        </div>
                                                        <div className="orders__order-content">
                                                            <h4 className="orders__order-title">
                                                                {product?.name}
                                                            </h4>
                                                            <div className="orders__order-price">
                                                                <p className="orders__order-new-price">{item.price} ₽</p>
                                                                <p className="orders__order-quantity">× {item.quantity}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        {order.items?.length > 2 && (
                                            <div className="orders__orders-btn" onClick={() => toggleExpand(order._id)}>
                                                <p className="orders__order-btn-text">
                                                    {expandedOrders.has(order._id) ? 'Скрыть' : `Ещё ${order.items.length - 2}`}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="orders__order-info">
                                        <div className="orders__price">
                                            <h4 className="orders__price-title">Заказ на сумму:</h4>
                                            <p className="orders__price-value">{order.total_price} ₽</p>
                                        </div>
                                        <div className="orders__status">
                                            <h4 className="orders__status-title">Статус заказа:</h4>
                                            <div className="orders__status-value">{order.status}</div>
                                        </div>
                                        <div className="orders__address">
                                            <h4 className="orders__address-title">Адрес:</h4>
                                            <p className="orders__address-value">{order.address}</p>
                                        </div>
                                        <div className="orders__date-info">
                                            <h4 className="orders__date-title">Дата доставки:</h4>
                                            <p className="orders__date-value">{order.delivery_date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {totalPages > 1 && (
                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className={page <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                            onClick={(e) => { e.preventDefault(); if (page > 1) goToPage(page - 1); }}
                                        />
                                    </PaginationItem>
                                    {getPages().map((p) => (
                                        <PaginationItem key={p}>
                                            <PaginationLink
                                                isActive={p === page}
                                                className="cursor-pointer"
                                                onClick={(e) => { e.preventDefault(); goToPage(p); }}
                                            >
                                                {p}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            className={page >= totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                                            onClick={(e) => { e.preventDefault(); if (page < totalPages) goToPage(page + 1); }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
