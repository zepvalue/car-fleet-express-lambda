import { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "car-fleet-express-lambda",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: ">=1.72.0",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    hello: {
      handler: "handler.hello",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
          },
        },
      ],
    },

    test: {
      handler: "handler.test",
      events: [
        {
          http: {
            method: "get",
            path: "cars",
          },
        },
        {
          http: {
            method: "get",
            path: "car/{id}",
          },
        },
        {
          http: {
            method: "post",
            path: "cars",
          },
        },
        {
          http: {
            method: "delete",
            path: "car/{id}",
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
