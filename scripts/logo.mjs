import '@bestlyg/cli/globals';

const logo = await best.figlet('bestlyg'.toUpperCase(), {
    font: 'Doh',
    whitespaceBreak: true,
});

echo`${logo}`;
