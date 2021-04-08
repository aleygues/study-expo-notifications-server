

import { getModelForClass } from "@typegoose/typegoose";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";

@Resolver(() => User)
export class UsersResolver {
    @Query(() => [User])
    public async getUsers(): Promise<User[]> {
        const UserModel = getModelForClass(User);
        return UserModel.find().exec();
    }

    @Query(() => User, { nullable: true })
    public async getUser(@Arg('id') id: string): Promise<User | null> {
        const UserModel = getModelForClass(User);
        return UserModel.findById(id).exec();
    }

    @Mutation(() => Boolean)
    public async deleteUser(@Arg('name') name: string): Promise<Boolean> {
        const UserModel = getModelForClass(User);
        await UserModel.deleteOne({ name }).exec();
        return true;
    }

    @Mutation(() => User)
    public async updateUser(@Arg('id') id: string, @Arg('data', () => User) data: User): Promise<User | null> {
        const UserModel = getModelForClass(User);
        return UserModel.findByIdAndUpdate(id, data, { new: true });
    }

    @Mutation(() => User)
    public async createUser(@Arg('data', () => User) data: User): Promise<User> {
        const UserModel = getModelForClass(User);
        return UserModel.create(data);
    }
}