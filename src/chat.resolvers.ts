import { Resolver, Mutation, Subscription, Args } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSubEngine } from 'graphql-subscriptions';

const CHAT_EVENT_NAME = 'chat';

@Resolver('Chat')
export class ChatResolvers {
  constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

  @Mutation('sendMessage')
  async sendMessage(@Args('text') text) {
    const message = { id: Date.now(), text };
    console.log(text);
    this.pubSub.publish(CHAT_EVENT_NAME, { [CHAT_EVENT_NAME]: { message } });
    return message;
  }

  @Subscription(CHAT_EVENT_NAME)
  chat() {
    return this.pubSub.asyncIterator(CHAT_EVENT_NAME);
  }
}