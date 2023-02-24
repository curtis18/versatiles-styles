#!/bin/bash
cd "$(dirname "$0")"
set -e

cd ..

rm -rf dist || true
mkdir dist

echo " -> copy styles"
mkdir dist/styles
cp -R src/* dist/styles/
