# Contributing to AI 3D SaaS Platform

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive criticism
- Respect differing viewpoints and experiences

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, Node version, etc.)

### Suggesting Features

1. Check if the feature has been suggested
2. Create a new issue with:
   - Clear description of the feature
   - Use case and benefits
   - Possible implementation approach

### Pull Requests

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes following our coding standards
4. Write/update tests if applicable
5. Update documentation as needed
6. Commit with clear messages
7. Push to your fork
8. Create a Pull Request

## Development Setup

See [SETUP.md](./SETUP.md) for detailed setup instructions.

## Coding Standards

### TypeScript/JavaScript
- Use TypeScript strict mode
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for complex functions
- Keep functions small and focused

### Python
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions/classes
- Keep modules focused

### Git Commits
- Use clear, descriptive commit messages
- Start with a verb (Add, Fix, Update, Remove)
- Keep first line under 72 characters
- Add details in commit body if needed

Example:
```
Add user authentication endpoint

- Implement JWT-based authentication
- Add password hashing with bcrypt
- Create login and register routes
- Add validation middleware
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage
- Test edge cases

## Documentation

- Update README.md if needed
- Update API.md for API changes
- Add inline comments for complex logic
- Update SETUP.md for setup changes

## Questions?

Feel free to ask questions in:
- GitHub Discussions
- Issues (with question label)
- Discord (if available)

Thank you for contributing! 🎉
