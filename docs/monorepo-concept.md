# Monorepo Concept

## What is a Monorepo?

A monorepo (monolithic repository) is a single version-controlled repository that contains multiple related projects, packages, or applications. Instead of splitting code across many separate repos, a monorepo keeps shared libraries, backend services, frontend apps, tooling, and configuration together in one place.

### Key characteristics

- One repository for multiple packages or applications
- Shared dependencies and tooling across the repo
- Centralized build, lint, and release workflows
- Easier code sharing and refactoring

## Why Use a Monorepo?

A monorepo helps teams work more efficiently when multiple projects are closely related or share common code.

### Benefits

- **Consistent tooling**: All projects can use the same linter, formatter, build tools, and CI configuration.
- **Simplified dependency management**: Shared packages and types can live in one place and be referenced across apps.
- **Easier refactoring**: Changes that span packages can be made in one commit, reducing versioning complexity.
- **Improved collaboration**: Teams can see and understand the full project context without jumping between repositories.
- **Better version alignment**: Shared code and app versions stay synchronized more naturally.

### When it makes sense

Use a monorepo when:

- Projects are tightly coupled or share a common platform
- Multiple apps use the same design system, schema, or utilities
- You want consistent developer experience across services
- Code sharing and cross-package refactors are frequent

## Why PNPM Workspaces?

PNPM is the recommended package manager for monorepos. It uses a **content-addressable global store** — every version of every package is stored once on disk and hard-linked into projects. This means:
 
- Dramatically reduced disk usage (no package duplication across workspaces)
- Near-instant repeat installs
- Strict `node_modules` layout that prevents **phantom dependency bugs** — accidentally importing a package you never declared in your own `package.json`
The workspace is defined in `pnpm-workspace.yaml` at the repo root:
 
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

### `workspace:*` Protocol
 
This is how packages inside the monorepo reference each other — no publishing required:
 
```json
// apps/web/package.json
{
  "dependencies": {
    "@repo/sanity-queries": "workspace:*",
    "@repo/sanity-types": "workspace:*"
  }
}
```
 
PNPM resolves `workspace:*` as a local symlink during development and replaces it with the real version number at publish time.
 

## Monorepo Architecture

A strong monorepo architecture balances modular packages with a clear app layout.

### Recommended structure

- `package.json` and `pnpm-workspace.yaml` at repo root
- Root-level linting, formatting, and build scripts
- `apps/` for deployable applications
- `packages/` for reusable shared code
- `docs/` for documentation and design decisions

## Folder Structure
 
```
my-monorepo/
│
├── apps/                          
│   ├── web/                       # Next.js or similliar web app
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── sanity/                       #Sanity / Backend
│       ├── schemas/
│       ├── sanity.cli.ts
│       ├── sanity.config.ts
│       └── package.json
│   
│
├── packages/
│   │
│   ├── ui/                         # Shared component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── index.ts            # barrel export
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── sanity-queries/             # Shared GROQ query helpers
│   │   ├── src/
│   │   │   ├── queries/
│   │   │   │   ├── posts.ts
│   │   │   │   ├── pages.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts            # barrel export
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── sanity-types/               # Shared TypeScript types
│       ├── src/
│       │   └── sanity-types.ts
│       └── package.json
│   
│
├── pnpm-workspace.yaml            # ← Workspace definition
├── package.json                   # Root (private: true)
├── tsconfig.base.json             # Root TypeScript base
├── .eslintrc.js                   # Root ESLint config
└── .gitignore
```
---
## Root `package.json`
 
```json
{
  "name": "your-monorepo-repo",
  "private": true,
  "description": "Sanity monorepo",
  "scripts": {
    "dev": "pnpm run --parallel dev",
    "build": "pnpm run --parallel build",
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=10.0.0"
  },
  "devDependencies": {}
}
```
 `"private": true` is required — it prevents the root package from being accidentally published to npm.

### How this repo works

- `apps/sanity/` defines the Sanity CMS studio, schema, and content relationships.
- `apps/web/` consumes the Sanity content and shared packages to render the public site.
- `packages/sanity-queries/` provides query helpers so apps do not duplicate GROQ logic.
- `packages/sanity-types/` provides shared TypeScript types for content models.

### Tooling and automation

- Use a workspace-aware package manager such as `pnpm`.
- Use root-level scripts to run tasks across all workspaces.
- Use shared configuration files for ESLint, TypeScript, and formatting.
- Use workspace linking to avoid separate package publishing when developing locally.

## Why This Architecture Is Best

This architecture is effective because it:

- Enables shared code without coupling projects too tightly
- Makes cross-project changes easier to manage
- Reduces duplication of types, query logic, and configuration
- Supports a consistent development workflow across apps and libraries
- Allows independent app deployments while keeping reusable packages centralized
- Parallel dev: One command starts all apps simultaneously — apps/web and apps/sanity both run in the same terminal.

### Practical advantages

- **Faster onboarding**: New developers clone one repo and access all projects.
- **Improved maintenance**: Fixes to shared code propagate consistently.
- **Stronger type safety**: Shared TypeScript types reduce runtime mismatch risk.
- **Easier CI/CD**: Centralized pipelines can handle multiple workspaces and only rebuild changed packages.

## Summary

A monorepo is a single repo containing related applications, packages, and tooling. It is especially useful for projects that share schemas, design systems, or backend logic. The best practice is to organize the repo into clear workspaces, use shared tooling, and keep reusable packages separated from app-specific code. This architecture improves collaboration, consistency, and long-term maintainability.
