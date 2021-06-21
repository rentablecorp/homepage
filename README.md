# Rentable

## 1. How to run

### 1.1. Repository cloning

```console
git clone https://gitlab.com/perfectorium.dev1/rentable.git
```

### 1.2. Frontend installing

#### 1.2.1. Install Node.js

You should install the node.js (LTS) to your environment if it is not installed: [https://nodejs.org/](https://nodejs.org/)

#### 1.2.2. Install or update dependencies for frontend

We use some modules, so we have to install them via console:

```console
npm i
```

*Be sure in console you are in the root folder of the project.*

If something was installed wrong or something goes wrong then remove `node_modules` folder and reinstall dependencies:

```console
rm -r node_modules
npm i
```

*Warnings are okay.*

### 1.3. Compiling and working on frontend

#### 1.3.1. Compile (build)

If you want to compile source files, then type:

```console
npm run build
```

If you get an error, try to reinstall node modules using `npm i`. Maybe some teammate has added new required module to the `packages.json` file.

#### 1.3.2. Live compiling (watch)

If you want to work on frontend and see changes immediately on changing source files, then type:

```console
npm run watch
```

To exit from *watch mode* press `Ctrl + C`.


*Warnings are okay.*
