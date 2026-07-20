import { IsString, IsNumber, IsOptional, IsEnum, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

enum OrderSource {
  MANUAL = 'MANUAL',
  SWIGGY = 'SWIGGY',
  ZOMATO = 'ZOMATO',
  UBEREATS = 'UBEREATS'
}

class OrderItemDto {
  @IsString()
  name: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @IsString()
  kitchenId: string;

  @IsString()
  brandId: string;

  @IsEnum(OrderSource)
  @IsOptional()
  source?: OrderSource;

  @IsString()
  @IsOptional()
  externalId?: string;

  @IsNumber()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @IsOptional()
  metadata?: any;
}
