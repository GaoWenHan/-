import { IsNotEmpty } from 'class-validator'

export class CreateProjectDto {
    @IsNotEmpty()
    projectName:string
    @IsNotEmpty()
    colors:string
}
