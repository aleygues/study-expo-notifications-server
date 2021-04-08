import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./../entities/User";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Message } from "../entities/Message";
import { PushService } from "./../services/push";

@Resolver(() => Message)
export class MessagesResolver {
    @Query(() => [Message])
    public async getMessages(): Promise<Message[]> {
        const MessageModel = getModelForClass(Message);
        return MessageModel.find().exec();
    }

    @Query(() => Message, { nullable: true })
    public async getMessage(@Arg('id') id: string): Promise<Message | null> {
        const MessageModel = getModelForClass(Message);
        return MessageModel.findById(id).exec();
    }
    
    @Mutation(() => Message)
    public async createMessage(@Arg('data', () => Message) data: Message): Promise<Message> {
        const MessageModel = getModelForClass(Message);
        const message = await MessageModel.create(data);

        // send push notifications
        const UserModel = getModelForClass(User);
        const users = await UserModel.find();
        const registrationIds = users.reduce((registrationIds, user) => registrationIds.concat(user.registrationIds || []), <string[]>[]);
        PushService.sendNewMessage(registrationIds, message.content, message._id);

        return message;
    }
}