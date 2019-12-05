import * as DB from './libs/dynamodb';
import { failure, success } from './libs/response';

export async function main(event, context) {
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            propertyId: event.pathParameters.id,
        },
    };

    try {
        await DB.call("delete", params);
        return success({ status: true });
    } catch (e) {
        return failure({ status: false });
    }
};
