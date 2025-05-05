import { ReactBaseModel } from './react-base-model';
import tapable from 'tapable';

export class Application extends ReactBaseModel {
    hooks = Object.freeze({
        onLoad: new tapable.AsyncParallelHook<[number]>(['time']),
    });
}
