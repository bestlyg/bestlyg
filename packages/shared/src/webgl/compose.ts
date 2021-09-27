import { Track } from './track';

export class Compose {
  private parent: Compose | null = null;
  private children: Compose[] = [];
  addChildren(child: Compose) {
    child.parent = this;
    this.children.push(child);
  }
  update(timestamp: number) {
    this.children.forEach(v => v.update(timestamp));
  }
}
