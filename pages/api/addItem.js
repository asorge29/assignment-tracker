// pages/api/addItem.js
import { DocumentClient } from '../../lib/dynamodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name } = req.body;
    const params = {
      TableName: 'assignmentTrackerAssignments',
      Item: {
        id,
        name,
      },
    };

    try {
      await DocumentClient.put(params).promise();
      res.status(200).json({ message: 'Item added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add item' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
