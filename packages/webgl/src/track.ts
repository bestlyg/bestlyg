import { Animation } from './types';
import { line } from './utils';
import { Compose } from './compose';

export class Track extends Compose {
  constructor(
    public data: object,
    public animation: Animation[],
    public updateQueue: ((timestamp: number, data: object) => void)[] = [],
    public start = Date.now()
  ) {
    super();
  }
  update(timestamp: number) {
    this.updateQueue.forEach(fn => fn(timestamp, this.data));
    this.animation.forEach(ani => this.updateAnimiation(ani, timestamp));
  }
  private updateAnimiation({ key, frames, loop }: Animation, timestamp: number) {
    const size = frames.length;
    if (size < 2 || (this.start + frames[size - 1].time < timestamp && loop === false)) return;
    const timeLen = frames[size - 1].time - frames[0].time;
    const time = (timestamp - this.start) % timeLen;
    for (let i = 1; i < size; i++) {
      if (time >= frames[i - 1].time && time <= frames[i].time) {
        this.data[key] = line(
          [frames[i - 1].time, frames[i - 1].value],
          [frames[i].time, frames[i].value]
        )(time);
        return;
      }
    }
  }
}
