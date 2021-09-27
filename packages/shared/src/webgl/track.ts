import { Animation } from './types';
import { line } from '../functions';
import { Compose } from './compose';

export class Track extends Compose {
  constructor(
    private data: Record<string, number>,
    private animation: Animation[],
    private start = Date.now()
  ) {
    super();
  }
  update(timestamp: number) {
    this.animation.forEach(ani => this.updateAnimiation(ani, timestamp));
  }
  private updateAnimiation({ key, frames, loop }: Animation, timestamp: number) {
    const size = frames.length;
    const timeLen = frames[size - 1].time;
    if (size < 2 || (this.start + frames[size - 1].time < timestamp && loop === false)) return;
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
