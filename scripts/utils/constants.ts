import { minimist } from './dep';

export const args = minimist(process.argv.slice(2));
export const __DEV__ = process.env.NODE_ENV === 'development';
export const __PROD__ = process.env.NODE_ENV === 'production';
export const EMPTY_OBJ = Object.create(null);
export const LOGO = `***********************************************************
*      ____  ______  _____ _______ _  __     _______      *
*     |  _ \\|  ____|/ ____|__   __| | \\ \\   / / ____|     *
*     | |_) | |__  | (___    | |  | |  \\ \\_/ / |  __      *
*     |  _ <|  __|  \\___ \\   | |  | |   \\   /| | |_ |     *
*     | |_) | |____ ____) |  | |  | |____| | | |__| |     *
*     |____/|______|_____/   |_|  |______|_|  \\_____|     *
*                                                         *
***********************************************************`;
