import { callApi } from './utils';

const authControllerApiMap = {
    signIn: {
        method: 'post',
        path: '/api/auth/login',
    },
} as const;

export type AuthSignInApiRequest = { username: string; password: string };
export type AuthSignInApiResponse = {
    username: string;
    nickname?: string;
    description?: string;
    avatar?: string;
    accessToken?: string;
    access_token?: string;
};
export async function authSignIn(
    input: AuthSignInApiRequest,
): Promise<AuthSignInApiResponse | null> {
    return callApi<AuthSignInApiResponse>({
        endpoint: authControllerApiMap.signIn,
        body: input,
    });
}
