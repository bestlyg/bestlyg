abstract class ShellScript {}

export class Git extends ShellScript {
  static addAll = 'git add -A';
  static pull = 'git pull';
  static push = 'git push';
  static fetch = 'git fetch';
  static commit(msg: string) {
    return `git commit -m "${msg}"`;
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
