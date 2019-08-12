const path = require('path');
const loaderUtils = require('loader-utils');

// TODO improve scope selectors regexp
const SCOPE_SELECTORS_REGEXP = /\[scope(?:=(?:'|")(.+)(?:'|"))?\]/g

const DEFAULT_OPTIONS = {
  extensions: ['.html'],
  defaultScopePath(sourceName, _sourcePath) {
    return `./${sourceName}`
  },
  scopeSelector(scopePath) {
    return `[s-${scopePath.replace(/\/|\./g, '-')}]`;
  }
}

module.exports = async function cssScopeLoader(source) {
  const options = {
    ...DEFAULT_OPTIONS,
    ...loaderUtils.getOptions(this)
  };

  const callback = this.async();
  const resolve = this.getResolve({
    extensions: options.extensions
  });

  const defaultScopePath = options.defaultScopePath(
    path.basename(this.resourcePath, path.extname(this.resourcePath)),
    this.resourcePath
  );

  let foundedScopes = {};
  for (const [scopeSelector, scopePath] of source.matchAll(SCOPE_SELECTORS_REGEXP)) {
    foundedScopes[scopeSelector] = scopePath || defaultScopePath;
  }

  let resolvedScopes = {};
  for (const [scopeSelector, scopePath] of Object.entries(foundedScopes)) {
    const resolvedScopePath = await resolve(this.context, scopePath);

    resolvedScopes[scopeSelector] = path.relative(this.rootContext, resolvedScopePath);
  }

  const output = source.replace(SCOPE_SELECTORS_REGEXP, (scopeSelector) => {
    return options.scopeSelector(resolvedScopes[scopeSelector]);
  })

  callback(null, output);
}
