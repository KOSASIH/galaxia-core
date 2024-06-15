#!/bin/bash

# Set environment variables
export GALAXIA_CORE_VERSION="1.0.0-alpha"
export BUILD_DIR="build"
export DIST_DIR="dist"

# Clean previous builds
rm -rf $BUILD_DIR
rm -rf $DIST_DIR

# Install dependencies
npm install
pip install -r requirements.txt

# Build Galaxia Core
npm run build

# Create distribution package
mkdir -p $DIST_DIR
cp -r $BUILD_DIR/* $DIST_DIR/

# Create a checksum file for integrity verification
sha256sum $DIST_DIR/* > $DIST_DIR/checksum.txt

# Print build information
echo "Galaxia Core $GALAXIA_CORE_VERSION built successfully!"
echo "Distribution package available at $DIST_DIR"
