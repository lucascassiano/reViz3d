# reViz

[![Build Status](https://travis-ci.org/lucascassiano/reViz3d.svg?branch=master)](https://travis-ci.org/lucascassiano/reViz3d)
[![GitHub license](https://img.shields.io/github/license/lucascassiano/reViz3d.svg)](https://github.com/lucascassiano/reViz3d/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/fastexpress.svg)](https://www.npmjs.com/package/fastexpress)

---


3d Visualization toolkit for react based apps.
For Downloads and user guide, go to:
https://lucascassiano.github.io/reViz3d/

# Releases
/releases/*.zip

# Running app in Development mode
This requires electron, electron-rebuild and yarn.
If yarn, electron and electron-rebuild are not yet installed in your dev-environment, install it using terminal:

```
npm install -g electron electron-rebuild yarn

```

or (if admin permission is needed):
```
sudo npm install -g electron electron-rebuild yarn 
```

then, to run the app:
```
cd app

npm install && npm run dev
```

# Building from source
Because it's based on electron, this project can be packed as windows, linux and OSX apps.

## Multi-platforms
this builds for windows, mac and linux.
```
npm run build-mac
```

## Windows
```
npm run build-win
```

## Mac(OSX)
```
npm run build-mac
```

## Linux
```
npm run build-linux
```

# Contributing

## Road map
### ReViz3D R1
Release 1 was merely a proof of concept. Was it possible to integrate all those tools into one simple application?
- IoT Integration

### ReViz3D R2 -- maybe will be renamed
- FTIII Integration
