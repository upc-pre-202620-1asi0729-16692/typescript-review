# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-08-26

### Added
- Comprehensive `CONTRIBUTING.md` defining OOP, DDD, Git Flow, and Conventional Commit guidelines.
- `multiply` method to the `Money` Value Object.
- Support for TypeScript 7.0.2 features.

### Changed
- **Encapsulation**: Refactored all domain models (`Customer`, `SalesOrder`, `SalesOrderItem`, `Money`, `Currency`, `DateTime`, `ProductId`) to use ECMAScript private fields (`#`) instead of `_` prefixes.
- **DDD Improvements**: Updated `SalesOrder` aggregate root to return `ReadonlyArray` of items and removed public state setters to preserve aggregate integrity.
- **Build System**: Updated `tsconfig.json` to target `ES2022` and use `NodeNext` for module resolution, aligning with modern ESM standards.
- **Modern ESM Support**: Updated all internal imports to include `.js` extensions as required by Node.js ESM.
- **Class Diagrams**: Updated class diagrams to reflect the new private field syntax and encapsulation changes.

### Fixed
- Improved type safety across domain models using template literal types and strict private field enforcement.

## [1.0.0] - 2026-04-12

### Added
- Initial stable release of the CRM and Sales modules.
- Core Domain-Driven Design structure with Bounded Contexts: `crm`, `sales`, and `shared`.
- Basic Aggregate Roots and Value Objects for Customers and Sales Orders.
- Project-level documentation and class diagrams.
- TypeScript configuration for project-wide type safety.

## [0.1.0] - 2025-09-03

### Added
- Initial project setup and architecture design.
- Basic implementation of CRM, Sales, and Shared domain models.
- License and repository configuration.
