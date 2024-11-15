# 🐕 DogRater

A modern web application for rating dogs with real-time chat functionality. Built with Next.js, MongoDB, and WebSocket.

## ✨ Features

- 🐾 Swipe-based dog rating system
- 💬 Real-time global chat
- 📊 Live leaderboard
- 🌍 Filter dogs by country
- 🎉 Interactive animations
- 🎵 Sound feedback on interactions

## 🛠️ Prerequisites

- Node.js 18 or higher
- MongoDB installed locally or a MongoDB Atlas account
- pnpm package manager (`npm install -g pnpm`)

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/gupta-soham/DogRater.git
cd DogRater
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Update the `.env.local` with your configuration:

```env
NEXT_PUBLIC_WS_URL=ws://localhost:3001
MONGODB_URI=mongodb://localhost:27017/dog_ratings
FRONTEND_URL=http://localhost:3000
```

4. Start the development server:

```bash
pnpm dev
```

This will start:

- 🌐 Next.js development server on port 3000
- 🔌 WebSocket server on port 3001

## 📜 Available Scripts

- `pnpm dev` - Starts both the Next.js development server and WebSocket server
- `pnpm wss` - Runs only the WebSocket server on port 3001
- `pnpm prod` - Builds and starts the application in production mode

## 🏗️ Testing Production Build

To test the production build locally:

```bash
pnpm prod
```

This will create an optimized production build and start both the Next.js server and WebSocket server concurrently.

## 🤝 Contributing

We love your input! We want to make contributing to DogRater as easy and transparent as possible, whether it's:

- 🐛 Reporting a bug
- 💡 Submitting a fix
- 🚀 Proposing new features
- 💻 Becoming a maintainer

Contributions are welcome! Please feel free to submit a Pull Request.

### To contribute follow these steps:

1. Fork the repository

2. Clone the fork to your local machine:

```bash
git clone https://github.com/<your username>/cms.git
cd DogRater
```

3. Create a new branch

```bash
git checkout -b feat/fooBar
```

4. Make your changes and commit them

```bash
git commit -am 'Add some fooBar'
```

5. Push to the branch

```bash
git push origin feature/fooBar
```

6. Go to [the repository](https://github.com/gupts-soham/DogRater/pulls) and make a Pull Request.

> For major changes, please open an issue first to discuss what you would like to change.

Read our [contribution guidelines](CONTRIBUTING.md) for more details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Any contributions you make will be under the MIT Software License

In short, when you submit code changes, your submissions are understood to be under the same [MIT License](http://choosealicense.com/licenses/mit/) that covers the project. Feel free to contact the maintainers if that's a concern.

---

Made with ❤️ by [Soham Gupta](https://github.com/gupta-soham)
