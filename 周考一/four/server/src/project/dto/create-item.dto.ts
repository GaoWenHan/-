import { IsNotEmpty } from 'class-validator';

export class CreateItemDto {
    @IsNotEmpty()
    ItemName:string
    @IsNotEmpty()
    ItId:string
}