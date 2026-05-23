import figlet from 'figlet';
import fs from 'fs-extra';
import { resolve } from './resolve';

export const PKG_INFO = await fs.readJSON(resolve('package.json'));
export const LIB_NAME: string = PKG_INFO.name.toUpperCase();
export const CWD = process.env.XIDL_CWD ?? process.cwd();
export const LOGO = await figlet.text(LIB_NAME.split('/').at(-1) ?? LIB_NAME, {
    font: 'Slant',
    horizontalLayout: 'full',
    verticalLayout: 'full',
    width: process.stdout.columns,
    whitespaceBreak: false,
});
