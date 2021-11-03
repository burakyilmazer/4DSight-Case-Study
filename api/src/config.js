import path, { sep } from 'path';
import swaggerEnv from './swaggerEnv';
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const APP_ROOT = path.join(__dirname, '../..');
const SEP = path.sep;
module.exports = {
  APP_ROOT,
  SEP,
  encyrptText: 'b1DVHL1,mZ%>6:]#l<HJ6~l(GhN?dHMx>/',
  secretKey: '?qtV^oH/1{>5dI?CVVay!gksa:7',

  mongo_connections: {
    development: {
      host: 'mongodb://localhost/4DSight',
      name: 'Case-Study',
      port: '27017'
    },
    docker: {
      host: 'mongodb://localhost/4DSight-Docker',
      name: 'Case-Study',
      port: '27017'
    }
  },

  mail: {
    host: 'smtp.yandex.com.tr',
    secure: true,
    port: 465,
    auth: {
      user: 'xxx',
      pass: 'xxx'
    }
  },

  swaggerOptions: {
    swaggerDefinition: {
      info: {
        description: '4D Sight Case Study',
        title: '4D Sight Case Study Services',
        version: '1.0.0',
      },
      host: swaggerEnv[env]['host'],
      consumes: ['application/json', 'multipart/form-data'],
      basePath: '',
      produces: [
        'application/json',
        'application/xml',
        'multipart/form-data'
      ],
      schemes: swaggerEnv[env]['address'] ,
      security: [
        {
          JWT: [],
          companyid: [],
          language: []
        }
      ],
      securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: '',
        },
      },
    },
    
    basedir: __dirname, // app absolute path
    files: [
      '../../private/controllers/**/*.js',
      '../../public/controllers/**/*.js',
    ],
  },

};