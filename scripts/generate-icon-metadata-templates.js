// Generates and names .yml templates based upon the svgs in components/Icon/raw

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const YAML = require('yaml');

const iconBasePath = path.resolve(__dirname, '../src/components/Icon/raw');

const allSvgExports = glob
  .sync('*.svg', { cwd: iconBasePath })
  .map((filename) => {
    return filenameToExportName(filename);
  }, {});

const allExistingYamlFiles = glob
  .sync('*.yml', { cwd: iconBasePath })
  .map((filename) => {
    return filenameToExportName(filename);
  }, {});

const allMissingYamlFiles = allSvgExports.filter((filename) => {
  return !allExistingYamlFiles.includes(filename);
});

allMissingYamlFiles.forEach((name) => {
  const filename = `${name}.yml`;
  fs.writeFile(
    `${iconBasePath}/${filename}`,
    String(fillMetadataTemplate(name)),
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

function fillMetadataTemplate(name) {
  const metadata = YAML.parseDocument(
    fs.readFileSync(`${iconBasePath}/TEMPLATES/IconName.yml`, 'utf8')
  );
  const date = getCurrentDateString();
  metadata.set('name', name);
  metadata.set('set', 'app');
  metadata.set('date_added', date);
  metadata.set('date_modified', date);
  return metadata;
}

/**
 * Gets current date in YYYY-MM-DD format, timezone adjusted
 */
function getCurrentDateString() {
  let date = new Date();
  date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  return date.toISOString().split('T')[0];
}

/**
 * Capitalizes the first letter and any letter following a hyphen or underscore
 * and removes hyphens and underscores
 *
 * E.g. tourpoint-activate_major_monotone becomes TourpointActivateMajorMonotone.
 */
function filenameToExportName(filename) {
  return path
    .basename(filename, path.extname(filename))
    .replace(/(?:^|[-_])([a-z])/g, (match, letter) => letter.toUpperCase());
}
