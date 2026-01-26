# Smart Service Place

Smart Service Place is a modern web application designed to connect users with service providers. It offers a seamless platform for booking services, managing appointments, and processing payments.

## Features

-   **User Authentication**: Secure login and registration using NextAuth (Credentials, Google, Apple).
-   **Service Booking**: Users can browse and book various services.
-   **Provider Dashboard**: Service providers can manage their bookings, verify services, and track earnings.
-   **User Dashboard**: specific dashboard for users to manage their bookings and profile.
-   **Payments**: Integrated with Razorpay for secure and easy payments.
-   **Real-time Notifications**: Socket.io integration for instant updates on bookings and status changes.
-   **Reviews & Ratings**: System for users to rate and review services.

## Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
-   **Frontend**: React 19, Tailwind CSS
-   **Backend**: Next.js API Routes
-   **Database**: MongoDB (with Mongoose)
-   **Authentication**: NextAuth.js
-   **Payments**: Razorpay
-   **Real-time Communication**: Socket.io
-   **Icons**: Lucide React, React Icons
-   **Calendar**: FullCalendar

## Getting Started

### Prerequisites

Ensure you have the following installed:

-   Node.js (v18 or later)
-   MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/abhaymauryadev/smartserviceplace.git
    cd smartserviceplace
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**

    Copy the `.env.example` file to `.env` and fill in the values:
    
    ```bash
    cp .env.example .env
    ```

    Open the `.env` file and add your credentials:

    ```env
    # Database
    MONGODB_URI=your_mongodb_connection_string

    # NextAuth
    NEXTAUTH_SECRET=your_nextauth_secret
    NEXTAUTH_URL=http://localhost:3000

    # OAuth Providers (Optional)
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    APPLE_ID=your_apple_id
    APPLE_SECRET=your_apple_secret

    # Razorpay (Payments)
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret

    # Cloudinary (Image Uploads)
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: App Router pages and API routes.
-   `components/`: Reusable React components.
-   `lib/`: Utility functions (DB connection, Auth, Cloudinary).
-   `models/`: Mongoose schemas (User, Service, Booking, etc.).
-   `public/`: Static assets.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements.
