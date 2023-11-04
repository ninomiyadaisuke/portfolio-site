import react from '@astrojs/react';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	server: { port: 3000, host: true },
	integrations: [react()],
	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@styles/config";`
				}
			}
		},
		resolve: {
			alias: {
				'@components': '/src/components',
				'@layouts': '/src/layouts',
				'@styles': '/src/styles',
				'@assets': '/src/assets'
			}
		}
	}
});
