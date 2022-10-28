// Generates an index.ts file based upon the svgs in components/Icon/raw

const fs = require('fs');
const path = require('path');

const glob = require('glob');
const jsYaml = require('js-yaml');

const iconBasePath = path.resolve(__dirname, '../src/components/Icon/raw');

const IconSets = {};

const preamble = `// DO NOT MANUALLY EDIT THIS FILE
// This file was automatically generated
// Run 'yarn run generate-icons' from the root of the monorepo to generate a new version`;

const allSvgExports = glob
  .sync('*.yml', { cwd: iconBasePath })
  .reduce((memo, filename) => {
    const { packageName, exportStrings } = exportsForMetadata(filename);

    if (!memo[packageName]) {
      memo[packageName] = [];
    }

    memo[packageName].push(...exportStrings);

    return memo;
  }, {});

const allSetImports = glob
  .sync('*.yml', { cwd: iconBasePath })
  .reduce((memo, filename) => {
    const { packageName, setsImportStrings } = exportsForMetadata(filename);

    if (!memo[packageName]) {
      memo[packageName] = [];
    }

    memo[packageName].push(setsImportStrings);

    return memo;
  }, {});

Object.entries(allSvgExports).forEach(([packageName, exportStrings]) => {
  const allSvgExportsString = exportStrings.join('\n\n');
  const allSetImportsString = allSetImports[packageName].join('\n');
  let exportSetsStrings = [];
  Object.entries(IconSets[packageName]).forEach(([set, icons]) => {
    exportSetsStrings.push(
      `export const ${
        set[0].toUpperCase() + set.slice(1)
      }IconSet = [\n  ${icons.join(',\n  ')}\n]`
    );
  });
  fs.writeFileSync(
    setsFilePath(packageName),
    `${preamble}\n\n${allSetImportsString}\n\n${exportSetsStrings.join('\n')}`
  );
  fs.writeFileSync(
    indexFilePath(packageName),
    `${preamble}\n\nexport * from './sets';\n\n${allSvgExportsString}\n\n`
  );
});

function indexFilePath() {
  return path.resolve(__dirname, `../src/components/Icon/icons/index.ts`);
}

function setsFilePath() {
  return path.resolve(__dirname, `../src/components/Icon/icons/sets.ts`);
}

function exportsForMetadata(filename) {
  const metadata = jsYaml.load(
    fs.readFileSync(`${iconBasePath}/${filename}`, 'utf8')
  );

  const packageName = 'convex-icons';

  let setsImportStrings = [];

  const exportStrings = findAllPresentStyles(filename).reduce(
    (memo, [exportName, exportFile, styleSuffix]) => {
      if (!IconSets[packageName]) {
        IconSets[packageName] = {};
      }
      if (!IconSets[packageName][metadata.set]) {
        IconSets[packageName][metadata.set] = [];
      }
      if (IconSets[packageName][metadata.set].indexOf(exportName) === -1) {
        IconSets[packageName][metadata.set].push(exportName);
      }
      setsImportStrings.push(setsImportString(exportName, exportFile));
      return memo.concat(
        [mainExportString(exportName, exportFile, metadata.deprecated)],
        (metadata.deprecated_aliases || [])
          .map((deprecatedAlias) => `${deprecatedAlias}${styleSuffix}`)
          .map((deprecatedBaseName) =>
            aliasExportString(exportName, exportFile, deprecatedBaseName)
          )
      );
    },
    []
  );

  return { packageName, exportStrings, setsImportStrings };
}

function findAllPresentStyles(filename) {
  const filenamePrefix = path.basename(filename, path.extname(filename));

  return glob
    .sync(`${filenamePrefix}.svg`, { cwd: iconBasePath })
    .map((svgFilename) => {
      const styleSuffix = svgFilename
        .slice(filenamePrefix.length)
        .replace(/\.svg$/, '');

      return [filenameToExportName(svgFilename), svgFilename, styleSuffix];
    });
}

function mainExportString(exportName, exportFile, isDeprecated) {
  return exportString(exportName, exportFile, isDeprecated ? '' : undefined);
}

function aliasExportString(exportName, exportFile, deprecatedBaseName) {
  return exportString(
    filenameToExportName(deprecatedBaseName),
    exportFile,
    exportName
  );
}

/**
 * Capitalizes the first letter and any letter following a hyphen or underscore
 * and removes hyphens and underscores
 *
 * E.g. tourpoint-activate_major_monotone becomes TourpointActivateMajorMonotone.
 */
function filenameToExportName(filename) {
  const stripped = path
    .basename(filename, path.extname(filename))
    .replace(/\s/, '_');
  const exportName = stripped.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  );
  return exportName[0].toUpperCase() + exportName.slice(1).replace('_', '');
}

/**
 *
 * @param {*} exportedName
 * @param {*} filename
 * @param {undefined|string} replaceWith
 *   If undefined then the current export is not deprecated.
 *   If an empty string then the current export is deprecated with no replacement.
 *   If a non-empty string then the current export is deprecated with a replacement.
 */
function exportString(exportedName, filename, replaceWith) {
  const replaceWithSuffix = replaceWith ? ` Use ${replaceWith} instead.` : '';
  const deprecatedNotice =
    replaceWith === undefined
      ? ''
      : `/** @deprecated ${exportedName} will be removed in the next major version.${replaceWithSuffix} */\n`;

  return `${deprecatedNotice}export {
  default as ${exportedName},
} from '../raw/${filename}';`;
}

function setsImportString(exportedName, filename) {
  return `import {
  default as ${exportedName},
} from '../raw/${filename}';`;
}
