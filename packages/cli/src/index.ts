import * as utils from './utils/index';
import * as vendor from './vendor/vendor';

const globalInjectData = {
    utils,
    ...vendor,
};

export default globalInjectData;

export * as utils from './utils/index';
export * from './vendor/vendor';
