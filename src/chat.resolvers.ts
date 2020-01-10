import { Resolver, Mutation, Subscription, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

const CHAT_EVENT_NAME = 'chat';

@Resolver('Chat')
export class ChatResolvers {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) { }

  @Mutation('sendMessage')
  async sendMessage(@Args('text') text, @Args('chatId') chatId) {
    const message = { id: Date.now(), text };
    console.log(text);
    this.pubSub.publish(`${CHAT_EVENT_NAME}_${chatId}`, { [CHAT_EVENT_NAME]: { message } });
    return message;
  }

  @Subscription(CHAT_EVENT_NAME)
  chat(@Args('id') id) {
    console.log(id);
    return this.pubSub.asyncIterator(`${CHAT_EVENT_NAME}_${id}`);
  }
}