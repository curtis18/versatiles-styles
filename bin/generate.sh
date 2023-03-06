#!/bin/bash
cd "$(dirname "$0")"
set -e

cd ..

rm -rf dist || true

function copy {
	echo " -> copy $1"
	mkdir -p dist/styles/$1/
	cp -X src/$1/*.* dist/styles/$1/
	node bin/minify.js dist/styles/$1/style.json
}

copy eclipse
copy neutrino
copy shortbread
