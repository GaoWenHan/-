import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
    @IsNotEmpty()
    ListName:string
    @IsNotEmpty()
    LId:string
}