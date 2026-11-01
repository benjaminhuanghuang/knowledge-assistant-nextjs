# Setup

```sh
npx create-next-app@latest .
```

## husky + lint-staged + gitleaks

```sh
npm install -D husky lint-staged
```

```precommit
npx lint-staged
gitleaks protect --staged --redact --no-banner
```

本地 pre-commit gitleaks git --staged —— 只扫这次提交的暂存改动, 能被：git commit --no-verify 绕过

CI gitleaks git（默认）—— 扫整个 git 历史的所有 commit

## shadcn

```sh
@base-ui/react — shadcn base-nova style 用的无样式组件库（Radix 的替代，shadcn CLI 新预设默认用这个）
class-variance-authority — 组件 variant（如 Button 的 size/variant）管理
cn + lib/utils.ts 里的 cn() — className 合并 helper（clsx + tailwind-merge 的替代包）
lucide-react — icon library
tw-animate-css — Tailwind v4 动画工具类（代替老版 tailwindcss-animate）
shadcn — CLI 
```

- Modify app/globals.css
- Add components.json — shadcn CLI 配置

Add component

```sh
npx shadcn@latest add label button input card badge table sonner chart tooltip
npx shadcn@latest add field empty spinner
npx shadcn@latest add skeleton sonner alert-dialog alert dropdown-menu separator select textarea
```
