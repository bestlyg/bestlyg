import { createRequest } from './utils';

async function main() {
    const request = await createRequest();
}

main().then(err => {
    console.error(err);
});
