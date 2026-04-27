# Monorepo Tools: Turbo vs Nx

This document explains the difference between the `monorepo-tools` branch and the `monorepo-tools-nx` branch, what Turbo and Nx actually are, and what each tool changes in a project like this one.

## Branch Context
 
### `main`
 
`main` is the base Sanity + Next.js monorepo.
 
### `monorepo-tools`
 
This branch represents the Turbo version of the workspace. The project is organized as a monorepo with shared packages, and Turbo is used to run tasks across the repo.
 
### `monorepo-tools-nx`
 
This branch keeps the monorepo structure but swaps Turbo for Nx. The workspace is defined more explicitly through `nx.json` and per-project `project.json` files.
 
---
 
## This Project's Structure
 
Before comparing tools, it helps to be clear about what this repo actually contains:
 
```
apps/
  web/        # Next.js frontend
  sanity/     # Sanity Studio + schema + typegen
 
packages/
  sanity-types/    # Generated TypeScript types shared across apps
  sanity-queries/  # Shared GROQ query helpers consumed by web
```
 
Two apps. Two shared packages. One team. This is a small monorepo.
 
That fact matters when choosing a tool, because both Turbo and Nx solve real problems — but they solve problems at different scales.
 

## What Turbo Is

Turbo is a task runner built for monorepos. Its job is to run your existing scripts faster by caching outputs and understanding which tasks depend on other tasks.
 
It works by reading your `package.json` scripts and a single `turbo.json` config at the root. When you run `pnpm build`, Turbo figures out the correct order, runs tasks in parallel where possible, and caches results so unchanged packages are never rebuilt.
 
Turbo does not try to understand your code. It does not model your workspace. It just runs scripts smartly.

It helps you:

- run commands across multiple packages
- cache build results
- avoid repeating work that has already been done
- keep the setup lightweight

Turbo is strongest when the workspace is fairly simple and the main goal is fast script orchestration.

## What Nx Is

Nx is a full monorepo platform. It does what Turbo does — task orchestration and caching — but it also builds an explicit model of your workspace: which projects exist, what targets they expose, and how they depend on each other.
 
This model is defined through `nx.json` at the root and a `project.json` file inside each app and package. Nx reads these files to construct a project graph, which it uses to run tasks in the right order, cache intelligently, and support commands like `nx affected` — which only runs tasks on projects touched by a given code change.
 
Nx also has a plugin ecosystem. The `@nx/next` plugin, for example, wraps Next.js build and dev commands with a proper executor rather than raw shell commands.

It helps you:

- define projects and targets explicitly
- model dependencies between apps and packages
- cache outputs with more structure
- run affected tasks based on what changed
- manage larger workspaces with more rules and conventions

Nx is stronger when the repository is growing and you want the tool to understand the structure of the workspace.

## Main Difference

Turbo is mostly a task orchestrator.

Nx is both a task orchestrator and a workspace model.

That means:

- Turbo focuses on running scripts quickly
- Nx focuses on understanding projects, dependencies, and build boundaries

## What Changed Between The Branches

### From `main` to `monorepo-tools`

The repo becomes a real monorepo:

- shared query code moves into `packages/sanity-queries`
- shared generated types move into `packages/sanity-types`
- apps stop duplicating logic
- root scripts are used to run common tasks
- Turbo handles task execution and caching

### From `monorepo-tools` to `monorepo-tools-nx`

The repo becomes more explicit and graph-aware:

- `nx.json` defines workspace-wide behavior
- each app or package gets a `project.json`
- tasks like `build`, `dev`, `typegen`, and `schema:extract` are defined per project
- Nx knows which projects depend on which other projects
- caching is tied to specific inputs and outputs


## Large Project Recommendation

For a large project, Nx is usually the better choice.

### Why Nx is better for large projects

- It scales better when you have many apps and packages
- It gives a clearer dependency graph
- It makes build and cache boundaries explicit
- It works well when multiple teams share the same repo
- It supports affected commands and workspace-aware automation
- It is easier to enforce consistent rules across the repo

### Why Turbo can still be a good choice

- It is simpler to learn
- It has less configuration
- It is fast for straightforward task pipelines
- It works well when the repo is small or medium-sized

## Advantages And Disadvantages

### Turbo Advantages

- Simple setup
- Fast task execution
- Easy to understand
- Good for smaller monorepos

### Turbo Disadvantages

- Less workspace awareness
- Weaker project graph support
- More manual wiring as the repo grows
- Fewer built-in monorepo management features

### Nx Advantages

- Strong project graph
- Explicit targets per project
- Better cache and dependency modeling
- Better fit for shared packages and multiple apps
- Stronger support for scaling teams and codebases

### Nx Disadvantages

- More configuration files
- Slightly harder to learn at first
- Can feel heavier than Turbo in a tiny repo


## Short Summary

- Turbo is a lighter task runner for monorepos
- Nx is a fuller monorepo platform with a stronger project graph
- Turbo is usually easier for smaller setups
- Nx is usually better for larger projects with shared packages and multiple apps
