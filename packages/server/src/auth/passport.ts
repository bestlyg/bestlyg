/* eslint-disable @typescript-eslint/no-namespace */
import { SECRET } from '@/utils/index';
import Router from '@koa/router';
import passport from 'koa-passport';
// import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';

// JWT配置选项
export const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET, // 替换为真实的安全密钥，在生产环境中要妥善保管
};

// 创建JWT策略
passport.use(
    new JWTStrategy(jwtOptions, (jwtPayload: { username: string }, done: (...v: any[]) => void) => {
        const { username } = jwtPayload;
        const user = { username };
        done(null, user);
        // prisma.xUser.findFirst({ where: { username } }).then(
        //     user => {
        //         done(null, user);
        //     },
        //     () => {
        //         return done(null, false);
        //     },
        // );
    }),
);

export const passportMiddleware: Router.Middleware = async (ctx, next) => {
    return new Promise<void>(resolve => {
        passport.authenticate(
            'jwt',
            {
                session: false,
            },
            (err: any, user: any, _: string) => {
                if (err || !user) {
                    // console.info('JWT', err, user, info);
                    ctx.body = {
                        code: 1,
                        msg: '认证失败',
                    };
                    resolve();
                }
                ctx.state.user = user;
                resolve(next());
            },
        )(ctx, next);
    });
};

export default passport;
