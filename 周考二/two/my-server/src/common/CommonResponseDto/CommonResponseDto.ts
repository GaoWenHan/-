export class CommonResponseDto {
    constructor(
       public code:number,
       public message:string,
       public data?:any
    ){}
}