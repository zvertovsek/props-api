import uuid from 'uuid';
import * as DB from './libs/dynamodb';
import { failure, success } from './libs/response';

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: 'ziga',
            propertyId: uuid.v1(),
            content: data.content,
        }
    };

    try {
        await DB.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
};
