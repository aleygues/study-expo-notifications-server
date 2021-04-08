import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UsersResolver } from './resolvers/Users';
import mongoose from 'mongoose';
import { MessagesResolver } from './resolvers/Messages';

const initialize = async () => {
    console.log('Connecting mongodb...');
    await mongoose
        .connect('mongodb://127.0.0.1:27017/lcpushnotifications', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            autoIndex: true,
        });

    const schema = await buildSchema({ resolvers: [UsersResolver, MessagesResolver] });
    const server = new ApolloServer({ schema });
    await server.listen(4300);
    console.log('Server has started!');
};

initialize();
