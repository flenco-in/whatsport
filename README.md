# 🔍 whatsport

[![flenco](https://flenco.in/wp-content/uploads/2023/09/cropped-flenco-2023.png)](https://flenco.in)

Find what's using your port and kill it easily.

## Problem

"Port 3000 is already in use." 

You google, then run 3 commands manually. Every. Single. Time.

## Solution

```bash
npx whatsport 3000
```

**Output:**
```
🔍 PID 4512 → node /myapp/server.js
📁 Path: /Users/you/myapp
🧩 Command: node
✅ Suggestion: kill -9 4512
💡 Or run: npx whatsport 3000 --kill
```

**With --kill flag:**
```bash
npx whatsport 3000 --kill
```
```
🔍 PID 4512 → node /myapp/server.js
📁 Path: /Users/you/myapp
🧩 Command: node
💀 Killing process 4512...
✅ Process 4512 killed successfully!
🎉 Port 3000 is now free!
```

## Usage

```bash
npx whatsport <port> [--kill|-k]
```

### Examples

Check what's using a port:
```bash
npx whatsport 3000
```

Kill the process directly:
```bash
npx whatsport 3000 --kill
# or
npx whatsport 3000 -k
```

## Why it's hot

Every dev hits this weekly. Now it's one command instead of three.

## Installation

No installation needed! Just use `npx`:

```bash
npx whatsport <port>
```

Or install globally:

```bash
npm install -g whatsport
whatsport 3000
```

## Supported Platforms

- ✅ macOS
- ✅ Linux
- ✅ Windows

## Support

If you find this tool helpful, consider supporting the development:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/atishpaul)

## Author

Made with ❤️ by [Atish Paul](https://flenco.in)

## License

MIT
