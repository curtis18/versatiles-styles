#!/usr/bin/env bash
cd "$(dirname "$0")"
set -e

cd ../dist/

echo " -> tar"
cd styles
find . -type f -not -name ".*" -print0 | tar -cf ../styles.tar --null --files-from -
cd ..

echo " -> gzip"
gzip -9kfv styles.tar
