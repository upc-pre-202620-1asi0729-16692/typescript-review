# TypeScript Review

This is a console application illustrating TypeScript-based CRM and Sales concepts with Object-Oriented Programming (OOP) and Domain-Driven Design (DDD) principles.

## Prerequisites

- **Node.js**: Modern LTS version supporting ESM.
- **TypeScript**: Version 7.0.2 or higher.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd typescript-review
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

## Object-Oriented and Domain-Driven Design Principles

The project employs several OOP and DDD principles to ensure a robust and maintainable codebase:

- **Encapsulation**: Uses ECMAScript private fields (`#property`) for true runtime privacy. The `SalesOrder` aggregate root encapsulates its internal state and collection of items, exposing behavior through intent-revealing methods.
- **Aggregate Roots**: `SalesOrder` acts as the entry point for the sales domain, enforcing business invariants and protecting the integrity of its child entities.
- **Value Objects**: Immutable types like `Money`, `Currency`, and `DateTime` are defined by their value rather than identity, ensuring consistency across the domain.
- **Bounded Contexts**: The application is organized into logical boundaries:
  - `crm`: Customer relationship management.
  - `sales`: Order processing and sales management.
  - `shared`: Generic domain logic and utility types.
- **Single Responsibility**: Each class has a focused purpose, from domain models to utility objects.
- **Ubiquitous Language**: The codebase uses terminology derived directly from the business domain (e.g., `confirm`, `ship`, `cancel`).

## TypeScript 7.0.2 Features

This project leverages modern TypeScript features to enhance type safety and developer experience:

- **Private Fields**: Native ECMAScript private fields (`#`) for encapsulation.
- **Template Literal Types**: Used for complex string patterns like `CurrencyCode`.
- **Union Types & Type Guards**: Ensuring safe state transitions in the `SalesOrder` lifecycle.
- **ESM Support**: Configured for `NodeNext` module resolution, requiring `.js` extensions in imports.
- **Strict Mode**: Fully enabled to catch potential issues at compile time.

## Documentation

- **User Stories**: Detailed functional requirements can be found in [docs/user-stories.md](docs/user-stories.md).
- **Class Diagram**: Visual representation of the domain models is available in [docs/class-diagram.puml](docs/class-diagram.puml).
- **Changelog**: See [CHANGELOG.md](CHANGELOG.md) for a history of changes.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for our coding standards, branching strategy (Git Flow), and pull request process.

## License

This project is licensed under the MIT License. See the [LICENSE.md](./LICENSE.md) file for details.