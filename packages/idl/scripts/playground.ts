import client from '@bestlyg/idl/client';
import server from '@bestlyg/idl/server';
import express from 'express';

// server
const router = express.Router();
router.use(server.api.bestlyg.BestlygService.HealthCheck.url, async (req, res) => {
    const data = req.body as server.api.bestlyg.BestlygService.HealthCheck.Request;
    const resData: server.api.bestlyg.BestlygService.HealthCheck.Response = {
        code: 0,
        data: data.env,
    };
    res.json(resData);
});
const app = express().use(router);
// client
const res = await client.api.bestlyg.BestlygService.HealthCheck.request({ env: '111' });
