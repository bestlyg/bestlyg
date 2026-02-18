import { createLedger, createRequest } from './utils';
import { data } from '../temp/ledger';

async function main() {
    const request = await createRequest();
    const resp = await createLedger(request, data);
    console.log(JSON.stringify(resp));
}

main().catch((err) => {
    console.error(err);
});
