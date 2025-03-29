import { HttpException,ExceptionFilter,Catch,ArgumentsHost } from "@nestjs/common";
import { Request,Response } from 'express';
import { CustomException } from "../exceptions/custom-exception";


@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        if(exception instanceof CustomException){
            response.status(status).json({
                StatusCode:status,
                timeStamp: new Date().toISOString(),
                path:request.url,
                message:exception.message
            });
        }else{
            response.status(status).json({
                StatusCode:status,
                timeStamp: new Date().toISOString(),
                path:request.url,
                message:exception.message
            });
        }
    };
};