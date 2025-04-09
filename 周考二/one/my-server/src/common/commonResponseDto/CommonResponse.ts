export class CommponResponseDto{
   constructor(
    public code:number,
    public message:string,
    public data?:any
   ){

   }
}