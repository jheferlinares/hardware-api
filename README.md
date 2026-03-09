# Hardware Inventory API

## Overview

REST API for managing hardware inventory using serverless architecture. Built with Node.js, Express, and AWS services (Lambda, API Gateway, DynamoDB). The API provides full CRUD operations for tracking hardware items across multiple locations.

## Functionality

- **Create** hardware items with details (ID, name, quantity, location)
- **Read** all inventory items or retrieve specific items by ID
- **Update** item quantities and locations in real-time
- **Delete** items from inventory
- **Cloud Storage** using AWS DynamoDB for scalability and reliability
- **Serverless Architecture** with AWS Lambda for cost-effective operation

## Technologies Used

### Backend
- **Node.js** (v18.x) - JavaScript runtime
- **Express.js** - Web application framework
- **AWS Lambda** - Serverless compute service
- **AWS API Gateway** - API management and routing
- **AWS DynamoDB** - NoSQL database
- **AWS SDK** - AWS service integration

### Development Tools
- **Serverless Framework** - Deployment automation
- **dotenv** - Environment variable management
- **Postman** - API testing

## Architecture

```
Client (Postman/Browser)
        ↓
API Gateway (Public URL)
        ↓
Lambda Function (Node.js + Express)
        ↓
DynamoDB (NoSQL Database)
```

## Live Demo

**Production API:** https://vk6496iyqd.execute-api.us-east-1.amazonaws.com/prod

### Available Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hardware` | Get all hardware items |
| GET | `/hardware/:id` | Get specific item by ID |
| POST | `/hardware` | Create new hardware item |
| PUT | `/hardware/:id` | Update existing item |
| DELETE | `/hardware/:id` | Delete item |

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- AWS Account with appropriate permissions
- AWS CLI configured (optional)
- Serverless Framework installed globally

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/jheferlinares/hardware-api
   cd hardware-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=your-access-key-id
   AWS_SECRET_ACCESS_KEY=your-secret-access-key
   TABLE_NAME=HardwareInventory
   ```

4. **Create DynamoDB table**
   ```bash
   node setup-dynamodb.js
   ```

5. **Run locally**
   ```bash
   node server.js
   ```
   
   API will be available at `http://localhost:3000`

### Deployment to AWS

1. **Install Serverless Framework**
   ```bash
   npm install -g serverless
   ```

2. **Configure AWS credentials**
   ```bash
   # Set environment variables
   $env:AWS_ACCESS_KEY_ID="your-access-key"
   $env:AWS_SECRET_ACCESS_KEY="your-secret-key"
   $env:AWS_REGION="us-east-1"
   ```

3. **Deploy to AWS Lambda**
   ```bash
   serverless deploy
   ```

4. **Get your API URL**
   
   After deployment, Serverless will output your API Gateway URL.

## Usage Examples

### Create Hardware Item

**Request:**
```bash
POST https://vk6496iyqd.execute-api.us-east-1.amazonaws.com/prod/hardware
Content-Type: application/json

{
  "id": "001",
  "name": "Laptop Dell XPS 15",
  "quantity": 5,
  "location": "Office A"
}
```

**Response:**
```json
{
  "message": "Item created",
  "id": "001"
}
```

### Get All Items

**Request:**
```bash
GET https://vk6496iyqd.execute-api.us-east-1.amazonaws.com/prod/hardware
```

**Response:**
```json
[
  {
    "id": "001",
    "name": "Laptop Dell XPS 15",
    "quantity": 5,
    "location": "Office A"
  }
]
```

### Update Item

**Request:**
```bash
PUT https://vk6496iyqd.execute-api.us-east-1.amazonaws.com/prod/hardware/001
Content-Type: application/json

{
  "quantity": 3,
  "location": "Office B"
}
```

**Response:**
```json
{
  "message": "Item updated"
}
```

### Delete Item

**Request:**
```bash
DELETE https://vk6496iyqd.execute-api.us-east-1.amazonaws.com/prod/hardware/001
```

**Response:**
```json
{
  "message": "Item deleted"
}
```

## Project Structure

```
hardware-inventory-api/
├── server.js              # Express application and API routes
├── handler.js             # Lambda handler wrapper
├── serverless.yml         # Serverless Framework configuration
├── setup-dynamodb.js      # DynamoDB table creation script
├── package.json           # Node.js dependencies
├── .env                   # Environment variables (not in repo)
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Demo Video

[Link to Demo Video - 4-5 minutes walkthrough]

*Video includes:*
- Live demonstration of all CRUD operations
- Code walkthrough and architecture explanation
- AWS Console showing Lambda, API Gateway, and DynamoDB
- Discussion of serverless benefits and lessons learned

## Development Process

### Challenges Faced

1. **IAM Permissions**: Initially encountered permission errors when Lambda tried to access DynamoDB. Resolved by configuring proper IAM roles in `serverless.yml`.

2. **Cold Starts**: First request to Lambda takes 1-3 seconds. This is normal for serverless architecture and acceptable for this use case.

3. **Environment Variables**: Lambda doesn't support `AWS_REGION` as a custom environment variable. Used default values and Lambda's built-in region detection.

4. **CORS Configuration**: Had to enable CORS in API Gateway to allow requests from different origins.

### Lessons Learned

- **Serverless Architecture**: Learned how to design and deploy serverless applications using AWS Lambda and API Gateway
- **NoSQL Databases**: Gained experience with DynamoDB's key-value structure and scan/query operations
- **Infrastructure as Code**: Used Serverless Framework to define infrastructure declaratively
- **AWS Services Integration**: Understood how different AWS services work together (Lambda, API Gateway, DynamoDB, IAM, CloudWatch)
- **Cost Optimization**: Serverless architecture provides significant cost savings compared to traditional servers

## Future Enhancements

- [ ] Add user authentication with AWS Cognito
- [ ] Implement pagination for large datasets
- [ ] Add search and filter capabilities
- [ ] Create a web frontend using React
- [ ] Add automated tests (unit and integration)
- [ ] Implement CI/CD pipeline with GitHub Actions
- [ ] Add API documentation with Swagger/OpenAPI
- [ ] Implement caching with Amazon ElastiCache
- [ ] Add monitoring and alerting with CloudWatch
- [ ] Support for bulk operations

## Cost Estimation

### AWS Free Tier (First 12 months)
- **Lambda**: 1 million requests/month free
- **API Gateway**: 1 million requests/month free (first year)
- **DynamoDB**: 25 GB storage, 200 million requests/month free

### Estimated Monthly Cost (After Free Tier)
- Lambda: $0-2/month (for typical usage)
- API Gateway: $3-5/month
- DynamoDB: $0-2/month
- **Total**: ~$5-10/month for moderate traffic

## Security Considerations

- Environment variables stored securely (not in repository)
- IAM roles with least privilege principle
- API Gateway with throttling enabled
- DynamoDB with encryption at rest
- HTTPS enforced for all API calls

## Contributing

This is an academic project. For suggestions or improvements, please open an issue.

## License

This project is for educational purposes as part of university coursework.

## Contact

**Your Name**  
Email: linaresjhefer@gmail.com
GitHub: [jheferlinares](https://github.com/jheferlinares)

## Acknowledgments

- AWS Documentation for Lambda and DynamoDB
- Serverless Framework documentation
- University course materials and instructors

---

**Project completed as part of [Applied Programming] - [BYU - Idaho]**  
**Date:** March 2026
