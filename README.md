# reViz
3d Visualization toolkit for react based apps.

# Releases
./app/dist

# running app in development mode
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

npm install && npm run dev
```

# Building Native applications
Because it's based on electron, this project can be packed as windows, linux and OSX apps.

## Multi-platforms
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

