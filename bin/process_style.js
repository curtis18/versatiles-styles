#!/usr/bin/env node

import { argv } from 'node:process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));



if (argv.length !== 3) {
	console.error('ERROR - need one argument: the name of the style');
	process.exit();
}

let filename = argv[2];
if (!filename.endsWith('/style.json')) {
	console.error('ERROR - filename must end with "/style.json"');
	process.exit();
}

let path = dirname(filename);
let style = JSON.parse(readFileSync(filename, 'utf8'));

await validateStyle(style, path);
saveMinified(style, resolve(path, 'style.min.json'));
saveWrapped(style, resolve(path, 'style.js'));



// -------------------------------------------------------------------------------------



async function validateStyle(style, path) {
	let knownFontNames = readFileSync(resolve(__dirname, '../src/known_fonts.txt'), 'utf8');
	knownFontNames = knownFontNames.split('\n').map(f => f.replace(/[^a-z_]+/g, '')).filter(f => f.length > 2);
	knownFontNames = new Set(knownFontNames);

	checkMeta();
	fixPaths();
	fixFontNames();
	checkSprites();

	async function checkMeta() {
		if (style.metadata.license !== 'https://creativecommons.org/publicdomain/zero/1.0/') throw Error();
	}

	function fixPaths() {
		// don't reference glyphs
		delete style.glyphs;

		// don't reference tile source
		Object.values(style.sources).forEach(source => {
			delete source.tiles;
		})

		if (style.sprites) style.sprites = './sprite';
	}

	function checkSprites() {
		let knownSprites = new Set();
		if (style.sprites) {
			let sprites = JSON.parse(readFileSync(resolve(path, style.sprites + '.json'), 'utf8'));
			Object.keys(sprites).forEach(name => knownSprites.add(name));
		}

		let attributes = 'background-pattern,fill-extrusion-pattern,fill-pattern,icon-image,line-pattern'.split(',');
		style.layers.forEach(layer => {
			if (!layer.paint) return;
			attributes.forEach(attribute => {
				if (!layer.paint[attribute]) return;
				throw Error('implement "resolvedImage" checking');
			})
		})
	}

	function fixFontNames() {
		style.layers.forEach(layer => {
			if (!layer.layout) return;
			if (!layer.layout['text-font']) return;

			let list = layer.layout['text-font'];
			if (!Array.isArray(list)) throw Error('must be an array');
			for (let i = 0; i < list.length; i++) {
				if (typeof list[i] !== 'string') throw Error('must be an array of strings');

				list[i] = list[i].toLowerCase().replace(/\s+/g, '_');

				if (!knownFontNames.has(list[i])) {
					throw Error(`unknown font name "${list[i]}"`)
				}
			}
		})
	}
}

function saveMinified(style, filename) {
	writeFileSync(filename, JSON.stringify(style), 'utf8');
}

function saveWrapped() {
	// use https://www.npmjs.com/package/colord
}
