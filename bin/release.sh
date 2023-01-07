#!/bin/bash
cd "$(dirname "$0")"

cd ../dist/

echo " -> tar"
find styles -type f -not -name ".*" -print0 | tar -cf styles.tar --null --files-from -

echo " -> gzip"
gzip -9kfv styles.tar

echo " -> release"
release_version="v$(jq -r '.version' ../package.json)"
gh release create $release_version --generate-notes styles.tar.gz
