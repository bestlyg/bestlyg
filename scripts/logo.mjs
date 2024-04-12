import 'zx/globals';
import figlet from 'figlet';

const logo = await figlet('bestlyg'.toUpperCase(), {
    font: 'Doh',
    whitespaceBreak: true,
});

echo`${logo}`;
