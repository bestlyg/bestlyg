import { cn } from '@/shadcn/utils';
import { Button } from '@/shadcn/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shadcn/ui/card';
import { Input } from '@/shadcn/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { routeMap } from '@/routes';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shadcn/ui/form';
import { request } from '@bestlyg/common/idl/utils';
import { useToast } from '@/shadcn/hooks/use-toast';
import { userInfoAtom, xTokenName } from '@/utils';
import { useSetAtom } from 'jotai';
import { encrypt, apiMap } from '@bestlyg/common';
import { configuration } from '@/utils/configuration';
import { Navigate } from 'react-router';

async function login(data: { username: string; password: string }) {
    const res = await request<
        any,
        {
            username: string;
            nickname: string;
            description: string;
            avatar: string;
            access_token: string;
        }
    >({
        url: apiMap.AuthController.signIn.path,
        data: {
            ...data,
            password: encrypt(data.password, configuration.aes.key, configuration.aes.iv),
        },
        method: apiMap.AuthController.signIn.method,
        serializer: 'json',
    });
    return res;
}

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export function LoginForm() {
    const { toast } = useToast();
    const setUserInfo = useSetAtom(userInfoAtom);
    const token = localStorage.getItem(xTokenName);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const res = await login(values);
        if (res) {
            const token = res.access_token;
            localStorage.setItem(xTokenName, token);
            setUserInfo(res);
            toast({
                title: 'Successful',
                description: '登录成功',
            });
        }
    }
    if (token) return <Navigate to={routeMap.welcome.path} />;
    return (
        <div className={cn('flex flex-col gap-6')}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>输入用户名和密码登录这个世界</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex flex-col gap-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>用户名</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />{' '}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>密码</FormLabel>
                                            <FormControl>
                                                <Input type="password" {...field} />
                                            </FormControl>
                                            {/* <FormDescription>
                        This is your public display name.
                      </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                            {/* <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div> */}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
