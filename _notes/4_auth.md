# Supabase Auth

```sh
npm install @supabase/supabase-js @supabase/ssr
```

@supabase/supabase-js — Supabase JS SDK，封装了 Auth（signUp/signIn/signOut/resetPassword 等）、Postgres 数据查询、Storage、Realtime 的 API 调用。

@supabase/ssr — 专门给 Next.js 这种 SSR 框架用的扩展，核心是 createServerClient()/createBrowserClient()，把 Supabase 的 session（access token + refresh token）正确地读写进 cookies()，而不是存在 localStorage（SSR 场景下服务端拿不到 localStorage）。没有这个包，session 在服务端组件/Server Action 里就读不到。

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx

DATABASE_URL=postgresql://...
```

supabase -> project overview -> use the `Copy` dropdown beside project name

##

```prompt
implement a simple email/password authentication using Supabase Auth, admin flag ,and give me a admin account and a normal user account,
```

## Add authUserId field to user table

```js
authUserId: uuid("auth_user_id").unique(),
```

Supabase Auth 自己管理一张 auth.users 表（存邮箱、密码 hash 等），主键是 UUID

但应用里的业务数据（车、保养记录、is_admin 等）存在App自己的 public.users 表，主键是 serial（自增整数），跟 Supabase 的 UUID 是两套不同的 ID 体系。

authUserId 就是这两套体系之间的桥：登录后 Supabase 给你一个 auth.users.id（UUID），lib/session.ts 里的 getCurrentUser() 拿这个 UUID 去 public.users 表按 auth_user_id 查，找到这user对应的业务数据（id、fullName、isAdmin）。

.unique() 保证一个 Supabase 账号只能对应一条业务用户记录，不会出现一个人查出两条 profile 的情况。

没有这一列的话，系统就没法把"Supabase 验证过的这个登录身份"和"数据库里这个人的车、权限"关联起来。

## Code

lib/supabase/server.ts: Supabase 服务端客户端，把 session token 读写进 cookies()

proxy.ts 每个请求最先经过这里, 刷新 token、粗粒度路由保护（/profile、/cars、/admin 需登录，/login、/signup 登录了就踢走）

lib/session.ts: auth 核心, getCurrentUser()（查 session + 关联业务用户）、requireUser()（未登录重定向）、requireAdmin()（非 admin 重定向）

lib/actions/auth.ts: signUp/signIn/signOut/forgotPassword/resetPassword 五个 Server Action，真正调 Supabase API 的地方

app/auth/confirm/route.ts: 处理邮箱确认/重置密码邮件里的链接，verifyOtp 换 session
