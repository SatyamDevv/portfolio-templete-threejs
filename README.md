# 3D Portfolio Website with Next.js

A modern personal portfolio website built with Next.js and Three.js, featuring interactive 3D elements, motion animations, and responsive design.

![Portfolio Preview](https://portfolio-templete-threejs.vercel.app/)

## Features

- **Interactive 3D Environment**: Immersive 3D scene created with Three.js and React Three Fiber
- **Smooth Animations**: Using Framer Motion for fluid UI transitions
- **Responsive Design**: Fully responsive layout that works on all devices
- **Section-Based Navigation**: Smooth scrolling with dynamic section highlighting
- **Modern UI**: Glass morphism effects and animated components
- **Dark Theme**: Eye-friendly dark mode design

## Project Structure

```
portfolio-textures/
├── public/            # Static assets and 3D models
├── src/
│   ├── app/           # Next.js app router files
│   ├── components/    # Reusable React components
│   │   ├── Scene.js   # 3D environment setup
│   │   └── ...        # Other UI components
│   └── data/          # Portfolio content data
└── ...
```

## Getting Started

### Prerequisites

- Node.js 18.x or later

### Installation

1. Clone the repository:

```bash
git clone https://github.com/satyamdevv/portfolio-textures.git
cd portfolio-textures
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio.

## Technologies Used

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **3D Rendering**: [Three.js](https://threejs.org/) and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Font**: [Geist](https://vercel.com/font) from Vercel

## Performance Optimization

- Dynamic loading of 3D elements to improve initial load time
- Asset compression and optimization
- Code splitting with Next.js

## Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project to [Vercel](https://vercel.com/import)
3. Vercel will automatically deploy your application

For other platforms, refer to the deployment guides:
- [Netlify deployment guide](https://docs.netlify.com/integrations/frameworks/next-js/)
- [AWS Amplify deployment guide](https://docs.amplify.aws/guides/hosting/nextjs/q/platform/js/)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- 3D models and textures from [source]
- Inspiration from [source]
