
import { argv } from 'node:process';
import { readFileSync, writeFileSync } from 'node:fs';

argv.slice(2).forEach(filename => {
	console.log(`minify ${filename}`);
	let data = JSON.parse(readFileSync(filename,'utf8'));
	writeFileSync(filename,JSON.stringify(data),'utf8');
});
