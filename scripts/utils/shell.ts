import { dayjs } from './dep';

export const gitFn: Record<string, Function> = {
  commit: (msg: string) => `git commit -m "${msg}"`,
};
export const git: Record<string, string> = {
  addAll: 'git add -A',
  pull: 'git pull',
  push: 'git push',
  fetch: 'git fetch',
  commit: gitFn.commit(`更新 ${dayjs().format('YYYY.MM.DD hh:mm:ss')}`),
};
