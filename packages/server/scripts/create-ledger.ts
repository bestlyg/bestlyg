import { createLedger, createRequest } from './utils';
import { data } from '../temp/ledger';

async function main() {
    const request = await createRequest();
    const resp = await createLedger(request, data);
    console.log(JSON.stringify(resp.data));
}

main().then(err => {
    console.error(err);
});
