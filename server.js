require('dotenv').config();
const express = require('express');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');

const app = express();
app.use(express.json());

// Lambda already has AWS_REGION automatically
const client = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'us-east-1' 
});
const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || 'HardwareInventory';

// CREATE
app.post('/hardware', async (req, res) => {
  try {
    const { id, name, quantity, location } = req.body;
    if (!id || !name) return res.status(400).json({ error: 'id and name required' });
    
    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: { id, name, quantity: quantity || 0, location: location || 'Unknown' }
    }));
    res.status(201).json({ message: 'Item created', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ (single)
app.get('/hardware/:id', async (req, res) => {
  try {
    const result = await docClient.send(new GetCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id }
    }));
    if (!result.Item) return res.status(404).json({ error: 'Not found' });
    res.json(result.Item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ (all)
app.get('/hardware', async (req, res) => {
  try {
    const result = await docClient.send(new ScanCommand({ TableName: TABLE_NAME }));
    res.json(result.Items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE
app.put('/hardware/:id', async (req, res) => {
  try {
    const { name, quantity, location } = req.body;
    const updates = [];
    const values = {};
    const names = {};
    
    if (name) { updates.push('#n = :name'); values[':name'] = name; names['#n'] = 'name'; }
    if (quantity !== undefined) { updates.push('quantity = :qty'); values[':qty'] = quantity; }
    if (location) { updates.push('location = :loc'); values[':loc'] = location; }
    
    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
    
    await docClient.send(new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id },
      UpdateExpression: `SET ${updates.join(', ')}`,
      ExpressionAttributeValues: values,
      ...(Object.keys(names).length > 0 && { ExpressionAttributeNames: names })
    }));
    res.json({ message: 'Item updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE
app.delete('/hardware/:id', async (req, res) => {
  try {
    await docClient.send(new DeleteCommand({
      TableName: TABLE_NAME,
      Key: { id: req.params.id }
    }));
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// For local development
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}

// For Lambda
module.exports = app;
