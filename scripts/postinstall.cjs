const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const version = packageJson.version;

const downloadUrl = `https://github.com/HaoboGu/rmk/archive/refs/tags/rmk-v${version}.tar.gz`;
const tempFileName = `rmk-v${version}.tar.gz`;
const libDir = path.join(__dirname, '../lib');

if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

execSync(`curl -L "${downloadUrl}" -o "${tempFileName}"`, { stdio: 'inherit' });
execSync(`tar -xzf "${tempFileName}" -C "${libDir}" --strip-components=1`, { stdio: 'inherit' });

console.log(`Successfully downloaded and extracted rmk-v${version}.tar.gz to ${libDir}`);

if (fs.existsSync(tempFileName)) {
  fs.unlinkSync(tempFileName);
}