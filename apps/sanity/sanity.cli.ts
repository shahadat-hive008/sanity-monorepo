import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'tozb2q8k',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    enabled: true,
    path: '../../packages/sanity-queries/src/**/*.{ts,tsx,js,jsx}',
    schema: './schemas/schema.json',
    generates: '../../packages/sanity-types/src/sanity.types.ts',
    overloadClientMethods: true,
  },
})
