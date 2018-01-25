# reViz
3d Visualization toolkit for react based apps.

# running app
if electron (and electron-rebuild) is not yet installed in your dev environment, install it using terminal:

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

npm install && npm run electron-dev
```

# Building Native applications
Because it's based on electron, this project can be packed as windows, linux and OSX apps.
always run a 'preship' before building

```
npm run preship
```
## Multi-platforms
```
npm run electron-pack
```

## Windows
```
npm run electron-win
```

## Mac(OSX)
```
npm run electron-mac
```

## Linux
```
npm run electron-linux
```

