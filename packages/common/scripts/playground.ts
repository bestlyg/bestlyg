import IdlClient from '@bestlyg/common/idl/client';
import IdlServer from '@bestlyg/common/idl/server';
import express from 'express';

// server
const router = express.Router();
router.use(IdlServer.api.bestlyg.BestlygService.HealthCheck.url, async (req, res) => {
    const data = req.body as IdlServer.api.bestlyg.BestlygService.HealthCheck.Request;
    const resData: IdlServer.api.bestlyg.BestlygService.HealthCheck.Response = {
        code: 0,
        data: data.env,
    };
    res.json(resData);
});
const app = express().use(router);
// client
const res = await IdlClient.api.bestlyg.BestlygService.HealthCheck.request({ env: '111' });
