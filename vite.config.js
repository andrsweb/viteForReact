import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginBrowserSync from 'vite-plugin-browser-sync'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import htmlMinifier from 'vite-plugin-html-minifier'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		open: 'index.html',
	},

	plugins: [
		react(),

		VitePluginBrowserSync({
			bs: {
				ui: {
					port: 8080
				},

				notify: true,
			}
		}),

		ViteImageOptimizer({}),

		htmlMinifier({
			minify: true,
		}),
	],

	build: {
		rollupOptions: {
			output: {
				chunkFileNames: 'assets/js/[name]-[hash].js',
				entryFileNames: 'assets/js/[name]-[hash].js',

				assetFileNames: ({ name }) => {
					if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
						return 'assets/img/[name]-[hash][extname]';
					}

					if (/\.css$/.test(name ?? '')) {
						return 'assets/css/[name]-[hash][extname]';
					}

					if (/\.(woff(2)?|ttf|eot|svg)$/) {
						return 'assets/fonts/[name].[ext]'
					}

					return 'assets/[name]-[hash][extname]';
				},
			},
		}
	},
})
