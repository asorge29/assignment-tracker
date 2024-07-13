// pages/api/getItems.js
import { DocumentClient } from '../../lib/dynamodb';

export const runtime = 'edge';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const params = {
        TableName: 'assignmentTrackerAssignments',
      };
      const data = await DocumentClient.scan(params).promise();
      res.status(200).json(data.Items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch items' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
