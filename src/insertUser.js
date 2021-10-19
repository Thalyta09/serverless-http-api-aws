"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const insertUser = async (event) => {

    const { user } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();

    const dynamo = new AWS.DynamoDB.DocumentClient();

    const newUser = {
        id,
        user,
        createdAt,
        userStatus: false
    };

    await dynamo.put({
        TableName: "users",
        Item: newUser
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(newUser),
    };
};

module.exports = {
    handler:insertUser
}