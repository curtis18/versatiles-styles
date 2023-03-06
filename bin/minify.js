
import { argv } from 'node:process';
import { readFileSync, writeFileSync } from 'node:fs';

// use https://www.npmjs.com/package/colord

argv.slice(2).forEach(filename => {
	console.log(`minify ${filename}`);
	let data = JSON.parse(readFileSync(filename, 'utf8'));

	// fix glyphs path
	// fix sprite path
	// fix font name
	// create stylemaker-wrapper

	writeFileSync(filename, JSON.stringify(data), 'utf8');
});
