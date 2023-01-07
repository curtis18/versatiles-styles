## generate and package styles

```bash
git clone git@github.com:opencloudtiles/opencloudtiles-styles.git
cd opencloudtiles-styles
npm install
npm run generate
npm run release
```

Generates a `dist/styles.tar.gz` with all files.

You can use the release file e.g. like this:
```bash
mkdir styles
curl -L "https://github.com/OpenCloudTiles/opencloudtiles-styles/releases/latest/download/styles.tar.gz" | gzip -d | tar -xf - -C ./styles/
```
