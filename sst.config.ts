/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
   app(input) {
      return {
         name: 'ui-crm-react',
         removal: input?.stage === 'production' ? 'retain' : 'remove',
         home: 'aws',
      }
   },
   async run() {
      new sst.aws.Nextjs('SavvyFrontendReact', {
         domain:
            process.env.SST_STAGE === 'PVT' ? 'pvt.itsallsavvy.com' : 'staging.itsallsavvy.com',
      })
   },
})
