import figlet from 'figlet';

/** CLI/服务启动时展示的 bestlyg ASCII logo。 */
export const LOGO = figlet.textSync('bestlyg'.toUpperCase(), {
    font: 'Doh',
    whitespaceBreak: false,
});
