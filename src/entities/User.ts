import { prop } from "@typegoose/typegoose";
import { Length } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType('UserType')
@InputType('UserInput')
export class User {
    @Field({ nullable: true })
    _id!: string;

    @Field()
    @Length(3, 50)
    @prop()
    name!: string;

    @Field(() => [String], { nullable: true }) 
    @prop() 
    registrationIds!: string[];
}