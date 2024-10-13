# Travel Tips & Destination Guides

## Project Description

The **Travel Tips & Destination Guides** platform is a community-driven web application designed for travel enthusiasts to share their personal travel experiences, exchange valuable tips, and interact with fellow travelers. This platform provides users with the ability to create and manage their profiles, share engaging travel content, and access premium features through a secure payment gateway.

### Key Features:

- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **User Profile Management**: Personalize user profiles with photos and details, and follow other users.
- **Post Creation & Sharing**: Users can write travel guides and tips using a rich text editor, attach images, and categorize posts.
- **Social Interaction**: Upvote and downvote posts, leave comments, and engage with other users.
- **Payment Integration**: Access premium content via Aamarpay or Stripe, including a verification feature for profiles.
- **Responsive Design**: The application is optimized for various devices, ensuring a smooth user experience.

## Installation Guidelines

Follow these steps to set up the project locally:

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (v16 or higher).
- **MongoDB**: Set up a MongoDB instance (either local or cloud).
- **Payment Gateway**: Create an account with Aamarpay or Stripe for payment processing.

### Step 1: Clone the Repository

```bash
git clone https://github.com/Sumiyaakhi/Tour-Guide-Client
cd travel-tips-destination-guides
```

# Install server dependencies

cd server
npm install

# Install client dependencies

cd ../client
npm install

#Add these on ypur .env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
AAMARPAY_API_KEY=your_aamarpay_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
