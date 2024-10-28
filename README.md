# ui-crm-react

UI CRM Version 3

## Setting up the Project

If you haven't yet, create a GitHub Token for accessing the package repository.

-  Go to your GitHub account settings
-  navigate to "Developer Settings" > "Personal Access tokens" > "Tokens (classic)"
-  Click "Generate new token" > "Generate new token (classic)"
-  Give it permissions for `repo` and `read:packages` along with `write:packages`

1. Add `npm` registry credentials

-  run the following command and replace `<USERNAME>` with your GitHub username. When it asks you for your password, use the access token you made in the previous step.

```bash
npm login --scope=@<USERNAME> --registry=https://npm.pkg.github.com
```

2. Install packages

`pnpm install`

_We're using `pnpm` for this project, so make sure you have that added_

3. Run the development server locally

```
pnpm run dev
```

## TODO

-  When we have environment variables needed, we'll modify the steps above

## Deployment (WIP)

1. Install the SST CLI

`curl -fsSL https://ion.sst.dev/install | bash`

2. Configure your AWS

a. Install the AWS CLI

_depending on your OS distribution, you can get it from homebrew or other package managers_

b. Configure your AWS profile

If you use multiple aws accounts, make sure you set the `AWS_PROFILE` environment variable to the savvy one.

_Get the access key from @soham or @farhan, for the region, use **eu-west-1**_

`aws configure --profile savvy`

3. Deploy via SST

`sst deploy --stage savvy`

This will deploy to our staging stage, which is linked to the URL `staging.itsallsavvy.com`

4. Adding more stages.

If you want to add more stages, you can just replace `savvy` with the stage of your choice. Do keep in mind this will give you a new URL for the deployment, so you'll need to update the `.env` file for the auth callback url, as well as update auth0 to whitelist your urls.
