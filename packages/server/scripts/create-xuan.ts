import { createRequest, createXuanData, nDaysAgo } from './utils';
import { data } from '../temp/xuan';

async function main() {
    const request = await createRequest();
    const res = createXuanData(request, data);
    console.log(JSON.stringify(res, null, 4));
}

main().catch((err) => {
    console.error(err);
});
