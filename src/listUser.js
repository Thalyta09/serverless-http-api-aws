"use strict";

const AWS = require("aws-sdk");

const listUser = async (event) => {

    const dynamo = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;
    let user;

    try {
        const result = await dynamo.get({
            TableName: "users",
            Key: {id}
        }).promise();
        user = result.Item;
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(user),
    };
};

module.exports = {
    handler:listUser
}