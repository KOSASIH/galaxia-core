#!/bin/bash

# Set environment variables
export GALAXIA_CORE_VERSION="1.0.0-alpha"
export DEPLOY_DIR="deploy"
export CLOUD_PROVIDER="aws" # or "gcp", "azure", etc.

# Create a deployment package
mkdir -p $DEPLOY_DIR
cp -r dist/* $DEPLOY_DIR/

# Configure cloud provider
if [ $CLOUD_PROVIDER == "aws" ]; then
  # AWS deployment
  aws s3 cp $DEPLOY_DIR/ s3://galaxia-core-deployments/$GALAXIA_CORE_VERSION/ --recursive
  aws cloudformation deploy --template-file deploy/aws/cloudformation.yaml --stack-name galaxia-core-$GALAXIA_CORE_VERSION
elif [ $CLOUD_PROVIDER == "gcp" ]; then
  # GCP deployment
  gsutil cp -r $DEPLOY_DIR/ gs://galaxia-core-deployments/$GALAXIA_CORE_VERSION/
  gcloud deployment-manager deployments create galaxia-core-$GALAXIA_CORE_VERSION --config deploy/gcp/deployment.yaml
fi

# Print deployment information
echo "Galaxia Core $GALAXIA_CORE_VERSION deployed successfully to $CLOUD_PROVIDER!"
