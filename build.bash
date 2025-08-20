#!/bin/bash

extra_dir="./extra"

rm -rf $extra_dir
mkdir $extra_dir

echo "**************** Build UI ****************"
cd ./ui
npm install
npm run build
cd ../
cp -rf ./ui/dist $extra_dir

echo
echo
echo "**************** Build backend ****************"
cd ./backend
cargo build --release
cd ../
cp -rf ./backend/target/release/backend.exe $extra_dir


echo
echo
echo "**************** Build electron ****************"
# npm install
npm run package
