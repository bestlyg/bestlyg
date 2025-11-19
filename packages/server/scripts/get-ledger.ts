import { getLedgerList, createRequest } from './utils';

async function main() {
    const request = await createRequest();
    const resp = await getLedgerList(request);
    console.log(JSON.stringify(resp));
}

main().catch(err => {
    console.error(err);
});
