## generate and package styles

```bash
git clone git@github.com:versatiles-org/versatiles-styles.git
cd versatiles-styles
npm install
npm run generate
npm run release
```

Generates a `dist/styles.tar.gz` with all files.

You can use the release file e.g. like this:
```bash
mkdir styles
curl -L "https://github.com/versatiles-org/versatiles-styles/releases/latest/download/styles.tar.gz" | gzip -d | tar -xf - -C ./styles/
```
