#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

cd ..

rm -rf dist || true

styles=(eclipse neutrino shortbread)

for i in ${!styles[@]}; do
	style=${styles[$i]}

	echo " -> copy $style"

	mkdir -p dist/styles/$style/
	cp -X src/$style/*.* dist/styles/$style/
done
