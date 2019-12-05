import * as DB from './libs/dynamodb';
import { failure, success } from './libs/response';

export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            propertyId: event.pathParameters.id,
        }
    };

    try {
        const result = await DB.call("get", params);
        if (result.Item) {
            return success(result.Item);
        } else {
            return failure({ status: false, error: "Item not found" });
        }
    } catch (e) {
        return failure({ status: false });
    }
};