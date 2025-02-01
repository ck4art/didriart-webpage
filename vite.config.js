import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: 'components/ui/splashcursor.tsx', // Path to your SplashCursor component file
            name: 'SplashCursor',   // Name of the output library
            fileName: 'bundle',     // Name of the output file (e.g., bundle.js)
            formats: ['es', 'umd'], // Output formats: ES modules and UMD
        },
        rollupOptions: {
            external: ['react', 'react-dom'], // Mark these as external to reduce bundle size
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
