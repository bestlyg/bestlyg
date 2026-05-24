import figlet from 'figlet';
import { echo } from 'zx';

const logo = await figlet('bestlyg'.toUpperCase(), {
    font: 'Doh',
    whitespaceBreak: true,
});

echo(logo);
