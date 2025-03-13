/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { nanoid } from 'nanoid';

export type ChatType = 'hello-chat';

export abstract class ChatBase<T extends ChatType, P = any> {
    protected _id = nanoid();
    get id() {
        return this._id;
    }
    protected _timestamp = Date.now();
    get timestamp() {
        return this._timestamp;
    }
    get type() {
        return this._type;
    }
    get payload() {
        return this._payload;
    }
    constructor(
        protected _type: T,
        protected _payload: P,
    ) {}
    setId(v: ChatBase<T, P>['_id']) {
        this._id = v;
        return this;
    }
    setTimestamp(v: ChatBase<T, P>['_timestamp']) {
        this._timestamp = v;
        return this;
    }
    setType(v: ChatBase<T, P>['type']) {
        this._type = v;
        return this;
    }
    setPayload(v: ChatBase<T, P>['payload']) {
        this._payload = v;
        return this;
    }
}

export class HelloChat extends ChatBase<'hello-chat', null> {}
