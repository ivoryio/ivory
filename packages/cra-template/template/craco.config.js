const { whenDev } = require('@craco/craco')
const CracoAlias = require('craco-alias')
const WatchIgnorePlugin = require('webpack').WatchIgnorePlugin
const exec = require('child_process').exec

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.alias.json',
      },
    },
  ],
  webpack: {
    plugins: whenDev(registerI18nPlugins),
  },
}

function registerI18nPlugins() {
  class RunI18nBeforeCompilePlugin {
    apply(compiler) {
      compiler.hooks.watchRun.tap('watchRun-i18n', ({ watchFileSystem }) => {
        const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher
        if (this.shouldUpdateKeys(watcher)) exec('yarn i18n')
      })
    }
    shouldUpdateKeys(watcher) {
      if (!watcher || !watcher.mtimes) return false
      return Object.keys(watcher.mtimes).some(f => f.endsWith('locales/en.json'))
    }
  }

  return [new WatchIgnorePlugin([/i18nKeys.ts/]), new RunI18nBeforeCompilePlugin()]
}
