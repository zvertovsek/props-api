import * as DB from './libs/dynamodb';
import { failure, success } from './libs/response';

export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: 'ziga',
            propertyId: event.pathParameters.id,
        },
        // 'UpdateExpression' defines the attributes to be updated
        // 'ExpressionAttributeValues' defines the value in the update expression
        // UpdateExpression: "SET content = :content, attachment = :attachment",
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content": data.content || null,
        },
        // 'ReturnValues' specifies if and how to return the item's attributes,
        // where ALL_NEW returns all attributes of the item after the update; you
        // can inspect 'result' below to see how it works with different settings
        ReturnValues: "ALL_NEW"
    };

    try {
        const result = await DB.call("update", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
};