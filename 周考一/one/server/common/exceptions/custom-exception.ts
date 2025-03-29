import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor(
        message: string,
        stringCode: number
    ) {
        super(message, stringCode)
    }
}