import  { IsNotEmpty,IsString,IsBoolean } from  'class-validator';

export class  UpdateStatusDto {
  @IsString()
  @IsNotEmpty()
  _id:string
  @IsBoolean()
  @IsNotEmpty()
  status:boolean
}

