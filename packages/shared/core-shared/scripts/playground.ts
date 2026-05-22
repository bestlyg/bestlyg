import IdlClient from '@bestlyg/core-shared/idl/client';
import IdlServer from '@bestlyg/core-shared/idl/server';
import express from 'express';

// server
const router = express.Router();
router[IdlServer.api.bestlyg.BestlygService.HealthCheck.method](
    IdlServer.api.bestlyg.BestlygService.HealthCheck.url,
    async (req, res) => {
        const data: IdlServer.api.bestlyg.BestlygService.HealthCheck.Request = req.body;
        const resData: IdlServer.api.bestlyg.BestlygService.HealthCheck.Response = {
            // code: 0,
            // data: data.env,
            code: 0,
            data: '',
        };
        res.json(resData);
    },
);
const app = express().use(router);
// client
const res = await IdlClient.api.bestlyg.BestlygService.HealthCheck.request({ env: '111' });
