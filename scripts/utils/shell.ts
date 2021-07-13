abstract class ShellScript {}

export class Git extends ShellScript {
  static addAll = 'git add -A';
  static push = 'git push';
  static fetch = 'git fetch';
  static commit(msg: string) {
    return `git commit -m "${msg}"`;
  }
  static pull(src: string = 'master') {
    return `git pull origin ${src}`;
  }
}
export class Yarn extends ShellScript {
  static updateDep = 'yarn upgrade-interactive --latest';
  static install = 'yarn';
  static run(script: string) {
    return `yarn ${script}`;
  }
  static workspaceRun(workspace: string, script: string) {
    return `yarn workspace ${workspace} ${script}`;
  }
}
