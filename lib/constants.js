const config = {
  DEFAULT_FLOW_TYPED_DIR: 'flow-typed',
  DEFAULT_PACKAGE_DEP_LIBDEFS_FILENAME: 'package-dep-libdefs.js',
  DEFAULT_FLOW_TYPED_NPM_DIR: 'npm',
  // These are bundled with Flow, so we do not generate stubs for them
  DEFAULT_FLOW_TYPEDEFS = ['react', 'react-dom', 'react-dom/server'],
  FLOW_MARKER: '@flow',
  NOFLOW_MARKER: '@noflow',
  LIBDEF_REGEX: /^(.+)_v\w+\.\w+\.\w+\.js$/,
};

module.exports = config;
