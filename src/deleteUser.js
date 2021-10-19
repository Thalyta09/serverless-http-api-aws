"use strict";

const AWS = require("aws-sdk");

const deleteUser = async (event) => {

    const { id } = event.pathParameters;
    const dynamo = new AWS.DynamoDB.DocumentClient();

    await dynamo.delete({
        TableName: "users",
        Key: {id}
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(
            {msg: 'User Deleted!'}
        ),
    };
};

module.exports = {
    handler:deleteUser
}