import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcryptjs';

@Schema()
export class User extends Document {
    @Prop({
        type:String,
        required:[true,'用户名不能为空'], // 强化校验
        unique:true, // 唯一约束
        index:true,  // 构建索引加速查询
        minlength:[3,'用户名至少3个字符'],
        maxlength:[20,'用户名不能超过20个字符'],
        match:[/^[a-zA-Z0-9_]+$/,'用户名只能包含字母、数字和下划线'],
    })
    username:string
    @Prop({
        type:String,
        required:[true,'密码不能为空'],
        select:false, // 默认不反悔密码字段
        minlength:[6,'密码至少六位'],
        // set:(val:string) => bcrypt.hashSync(val,10), // 存储时自动加密
    })
    password:string
}

export const UserSchema = SchemaFactory.createForClass(User);