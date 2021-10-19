"use strict";

const AWS = require("aws-sdk");

const listAllUsers = async (event) => {

    const dynamo = new AWS.DynamoDB.DocumentClient();
    let users;

    try {
        const results = await dynamo.scan({
            TableName: "users"
        }).promise();
        users = results.Items;
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(users),
    };
};

module.exports = {
    handler:listAllUsers
}