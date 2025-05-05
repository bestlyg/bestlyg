/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { nanoid } from 'nanoid';
import EventEmitter from 'eventemitter3';
import { ReactBaseModel } from './react-base-model';
import React from 'react';

export abstract class Chat<
    P = any,
    EventTypes extends EventEmitter.ValidEventTypes = string | symbol,
    Context extends unknown = any,
> extends ReactBaseModel<EventTypes, Context> {
    static Component: React.FC<any> = () => null;
    static assert = (chat: Chat): chat is Chat => chat instanceof Chat;
    id = nanoid();
    timestamp = Date.now();
    conversationId: string | null = null;
    abstract type: string;
    abstract payload: P;
}

export class HelloChat extends Chat<null> {
    static Component() {
        return <div>HelloChat</div>;
    }
    static assert(chat: Chat): chat is HelloChat {
        return chat.type === HelloChat.name;
    }
    payload = null;
    type = HelloChat.name;
}

export class AskChat extends Chat<{
    traceId: string;
}> {
    static Component() {
        return <div>AskChat</div>;
    }
    static assert(chat: Chat): chat is AskChat {
        return chat.type === AskChat.name;
    }
    type = AskChat.name;
    payload = { traceId: nanoid() };
    status: 'loading' | 'success' | 'failure' = 'loading';
}

export const CHAT_LIST = [HelloChat, AskChat] as const;
