"use strict";

const AWS = require("aws-sdk");

const updateUser = async (event) => {

    const { userStatus } = JSON.parse(event.body);
    const { id } = event.pathParameters;

    const dynamo = new AWS.DynamoDB.DocumentClient();

    await dynamo.update({
        TableName: "users",
        Key: {id},
        UpdateExpression: 'set userStatus = :userStatus',
        ExpressionAttributeValues: {
            ':userStatus': userStatus
        },
        ReturnValues: "ALL_NEW"
    }).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(
            {msg: 'User Updated!'}
        ),
    };
};

module.exports = {
    handler:updateUser
}