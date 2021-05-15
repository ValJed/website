import sveltePreprocess from 'svelte-preprocess';

export default {
	preprocess: sveltePreprocess({
		postcss: true
	}),
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte'
	}
};
