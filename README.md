# Project: Image Processing API

The API will take care of resizing and displaying saved images for you. Images are stored in the images folder. When processed based on file name and measurements, they are stored in the thumb folder.

## To install and start the project:

- **Install**: npm install
- **Execute**: npm run start
- **Eslint**: npm run lint
- **Prettier**: npm run prettier
- **Run tests**: npm run test

## Endpoints:

| Methods  | Requests                                                              | Query Params |
| -------- | --------------------------------------------------------------------- | ------------ |
| GET      | http://localhost:3000/api/                                            |              |
| GET      | http://localhost:3000/api/images?filename=fjord&width=200&height=200  | **filename**: \[string\] \[Ex: encenadaport \| fjord \| icelandwaterfall \| palmtunnel \| santamonica \] <br>**width**: \[number\] \[Ex: 200\]<br>**height**: \[number\] \[Ex: 200\] |
