import { prop } from "@typegoose/typegoose";
import { Length } from "class-validator";
import { Field, InputType, Int, ObjectType } from "type-graphql";

@InputType('MessageInput')
@ObjectType('MessageType')
export class Message {
    @Field({ nullable: true })
    _id!: string;

    @Field()
    @Length(3, 50)
    @prop()
    content!: string;
}