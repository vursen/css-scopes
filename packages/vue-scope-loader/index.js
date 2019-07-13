const path = require('path');
const pify = require('pify');
const loaderUtils = require('loader-utils');

// TODO improve scope selectors regexp
// const SCOPE_SELECTORS_REGEXP = /\[scope(?:=(?:'|")(.+)(?:'|"))?\]/g

// const DEFAULT_OPTIONS = {
//   defaultScopePath: './[name].js'
}

// module.exports = async function cssScopeLoader(source) {
//   const options = {
//     ...DEFAULT_OPTIONS,
//     ...loaderUtils.getOptions(this)
//   };

//   const callback = this.async();
//   const resolve = pify(this.resolve);

//   const defaultScopePath = loaderUtils.interpolateName(this, options.defaultScopePath, {
//     context: this.rootContext || this.context
//   });

//   let foundedScopes = {};
//   for (const [scopeSelector, scopePath] of source.matchAll(SCOPE_SELECTORS_REGEXP)) {
//     foundedScopes[scopeSelector] = scopePath || defaultScopePath;
//   }

//   let resolvedScopes = {};
//   for (const [scopeSelector, scopePath] of Object.entries(foundedScopes)) {
//     const resolvedScopePath = await resolve(this.context, scopePath);

//     resolvedScopes[scopeSelector] = path.relative(this.rootContext, resolvedScopePath);
//   }

//   const output = source.replace(SCOPE_SELECTORS_REGEXP, (scopeSelector) => {
//     return getScopeAttrFromPath(resolvedScopes[scopeSelector]);
//   })

//   callback(null, output);
// }

// function getScopeAttrFromPath(path) {
//   return `[__${path.replace(/\/|\./g, '-')}]`;
// }
