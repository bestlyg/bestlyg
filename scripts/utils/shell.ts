export const git = {
  addAll: 'git add -A',
  push: 'git push',
  fetch: 'git fetch',
  commit: (msg: string) => `git commit -m "${msg}"`,
  pull: (src: string = 'master') => `git pull origin ${src}`,
  globalName: (name: string) => `git config --global user.name "${name}"`,
  globalEmail: (email: string) => `git config --global user.email "${email}"`,
  clone: (repoUrl: string) => `git clone ${repoUrl}`,
};
export const yarn = {
  updateDep: 'yarn upgrade-interactive --latest',
  install: 'yarn',
  run: (script: string) => `yarn ${script}`,
  workspaceRun: (workspace: string, script: string) => `yarn workspace ${workspace} ${script}`,
};
