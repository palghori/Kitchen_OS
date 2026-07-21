declare enum OrderSource {
    MANUAL = "MANUAL",
    SWIGGY = "SWIGGY",
    ZOMATO = "ZOMATO",
    UBEREATS = "UBEREATS"
}
declare class OrderItemDto {
    name: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    kitchenId: string;
    brandId: string;
    source?: OrderSource;
    externalId?: string;
    total: number;
    items: OrderItemDto[];
    metadata?: any;
}
export {};
