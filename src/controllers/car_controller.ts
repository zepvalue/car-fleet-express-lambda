const { Request, Response } = require("express");
const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB();
const docClient = new AWS.DynamoDB.DocumentClient();

exports.get_cars = (req: typeof Request, res: typeof Response) => {
  const dbParams = { TableName: "CarFleet" };
  docClient.scan(dbParams, (err, data) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: "Error: Server error",
      });
    } else {
      res(200).send({
        success: true,
        message: "Loaded cars",
        cars: data,
      });
    }
  });
};

exports.get_car = (req: typeof Request, res: typeof Response) => {
  const id = req.params.id;
  console.log("request received, fetching car");
  let car = {};
  let dbParams: typeof AWS.DynamoDB.GetItemInput = {
    TableName: "CarFleet",
    Key: {
      id: {
        N: id,
      },
    },
  };
  dynamodb.getItem(dbParams, (err, data) => {
    if (err) {
      console.error("No car found", err);
      res.json(car);
    } else {
      car = data;
      console.log("car data => ", data);
      res.json(data);
    }
  });
};

exports.delete_car = (req: typeof Request, res: typeof Response) => {
  const carId = req.params.id;
  console.log("request received, deleting car...", carId);
  let dbParams: typeof AWS.DynamoDB.GetItemInput = {
    TableName: "CarFleet",
    Key: {
      id: {
        N: carId,
      },
    },
  };
  docClient.delete(dbParams, function (err, data) {
    console.log(" -> data", data);
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Delete Item succeeded:", JSON.stringify(data, null, 2));
    }
  });
};
