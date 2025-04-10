import { IsNotEmpty,IsString,MinLength,MaxLength,Matches } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9_]+$/)
    username:string
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password:string
}
