# Contributing to TypeScript Review

Thank you for your interest in contributing to the TypeScript Review project! This document provides guidelines and best practices to ensure a smooth contribution process.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Environment](#development-environment)
- [Coding Standards](#coding-standards)
  - [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)
  - [Domain-Driven Design (DDD)](#domain-driven-design-ddd)
  - [TypeScript Best Practices](#typescript-best-practices)
- [Branching Strategy (Git Flow)](#branching-strategy-git-flow)
- [Commit Message Guidelines (Conventional Commits)](#commit-message-guidelines-conventional-commits)
- [Versioning Policy (Semantic Versioning)](#versioning-policy-semantic-versioning)
- [Pull Request Process](#pull-request-process)

---

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all. Please be respectful and professional in all interactions.

## Development Environment

- **TypeScript**: Version 7.0.2 or higher.
- **Node.js**: Modern LTS version (supporting ESM).
- **Configuration**:
  - Target: `ES2022`
  - Module Resolution: `NodeNext`
  - Strict mode is enabled.

To get started:
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Build the project: `npm run build`.
4. Run the application: `npm start`.

## Coding Standards

### Object-Oriented Programming (OOP)

- **Encapsulation**: Use ECMAScript private fields (`#property`) instead of the `private` keyword or `_` prefix for true runtime privacy.
- **Inheritance & Polymorphism**: Use them judiciously to share behavior or define interfaces, favoring composition where appropriate.
- **Solid Principles**: Adhere to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.

### Domain-Driven Design (DDD)

- **Aggregate Roots**: Identify and implement aggregate roots (e.g., `SalesOrder`) to maintain consistency boundaries. All changes to the aggregate must go through the root.
- **Value Objects**: Use immutable Value Objects (e.g., `Money`, `Currency`, `DateTime`) for attributes that are defined by their value rather than an identity.
- **Ubiquitous Language**: Use terms from the business domain (e.g., `confirm`, `ship`, `cancel`) consistently in code, comments, and documentation.
- **Bounded Contexts**: Respect the boundaries between contexts (e.g., `crm`, `sales`, `shared`).

### TypeScript Best Practices

- **Explicit Typing**: Avoid `any`. Use specific types, interfaces, or type aliases.
- **Modern Features**: Leverage template literal types, union types, and `as const` assertions for maximum type safety.
- **ESM Modules**: Always include `.js` extensions in internal imports as required by `NodeNext` module resolution.

## Branching Strategy (Git Flow)

We follow the **Git Flow** branching model:

- `main`: Stores the official release history.
- `develop`: The main integration branch for features.
- `feature/*`: For developing new features. Branch off from `develop`.
- `release/*`: For preparing a new production release.
- `hotfix/*`: For quick patches to production. Branch off from `main`.

## Commit Message Guidelines (Conventional Commits)

We use **Conventional Commits** to maintain a clear and readable history.

Format: `<type>(<scope>): <description>`

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation changes.
- **style**: Changes that do not affect the meaning of the code.
- **refactor**: A code change that neither fixes a bug nor adds a feature.
- **perf**: A code change that improves performance.
- **test**: Adding missing tests or correcting existing tests.
- **chore**: Changes to the build process or auxiliary tools.

Example: `feat(sales): add discount calculation to SalesOrder`

## Versioning Policy (Semantic Versioning)

This project follows **Semantic Versioning (SemVer)**: `MAJOR.MINOR.PATCH`

- **MAJOR**: Incompatible API changes.
- **MINOR**: Functionality added in a backwards-compatible manner.
- **PATCH**: Backwards-compatible bug fixes.

## Pull Request Process

We use Pull Requests (PRs) to manage changes to the codebase. The process depends on the type of branch you are working on.

### Feature Branches (`feature/*`)

1. **Create**: Branch off from `develop`.
2. **Develop**: Implement your changes following the coding standards.
3. **Verify**: Ensure all tests pass and documentation (including `CHANGELOG.md`) is updated.
4. **Submit**: Create a PR targeting the `develop` branch.
5. **Review**: Provide a clear description and link for related issues.
6. **Merge**: Once approved, the PR will be merged into `develop`.

### Release Branches (`release/*`)

1. **Create**: When `develop` is ready for a release, branch off from `develop`.
2. **Finalize**: Perform final bug fixes, documentation updates, and version bumps.
3. **Submit**: Create two PRs:
   - One targeting the `main` branch (for the official release).
   - One targeting the `develop` branch (to ensure any fixes made in the release branch are integrated back).
4. **Merge**: Once approved:
   - The PR to `main` is merged and tagged with the version number.
   - The PR to `develop` is merged to keep it in sync.

### Hotfix Branches (`hotfix/*`)

1. **Create**: Branch off from `main`.
2. **Fix**: Address the critical issue in production.
3. **Submit**: Create two PRs targeting both `main` and `develop`.
4. **Merge**: Once approved, merge into both branches to ensure the fix persists.
