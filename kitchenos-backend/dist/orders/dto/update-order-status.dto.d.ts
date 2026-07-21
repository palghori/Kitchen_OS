export declare enum OrderStatus {
    PENDING = "PENDING",
    ACCEPTED = "ACCEPTED",
    PREPARING = "PREPARING",
    COOKING = "COOKING",
    PACKING = "PACKING",
    READY = "READY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    REJECTED = "REJECTED"
}
export declare class UpdateOrderStatusDto {
    status: OrderStatus;
}
