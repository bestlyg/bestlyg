import * as utils from './utils/index';
import * as vendor from './vendor/index';

const globalInjectData = {
    utils,
    ...vendor,
};

export default globalInjectData;

export * as utils from './utils/index';
export * from './vendor/index';
