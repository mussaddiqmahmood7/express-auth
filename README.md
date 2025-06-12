# Express TypeScript Authentication System

A robust authentication system built with Express.js and TypeScript that solves the common duplicate email problem during user registration using a two-table approach.

## 🚀 The Problem This Solves

Traditional authentication systems often face issues when users:
- Start signup but never verify their email
- Try to sign up again with the same email
- Drop off during multi-step registration flows
- Multiple attempts with the same email address

This leads to frustrating "duplicate email" errors and poor user experience.

## ✅ Our Solution: Two-Table Architecture

Instead of cramming everything into one Users table, we split it into two:

### 📂 PreRegisterUsers Table (Staging)
- Stores all signup attempts (verified or not)
- Email is **NOT unique** - multiple attempts allowed
- Includes verification tokens and timestamps
- Acts as a "waiting room" for incomplete signups

### 📂 Users Table (Production)
- Only verified, complete user accounts
- Email **IS unique** - clean and reliable
- Fast queries, no clutter from unverified accounts

## 🏗️ Project Structure

\`\`\`
src/
├── config/
│   └── config.ts                 # Environment configuration
├── controller/auth/
│   ├── forgot.controller.ts      # Password reset initiation
│   ├── login.controller.ts       # User authentication
│   ├── logout.controller.ts      # Session termination
│   ├── refresh-token.controller.ts # Token refresh
│   ├── register.controller.ts    # User registration
│   ├── update-password.controller.ts # Password reset completion
│   └── verify-email.controller.ts # Email verification
├── db/
│   └── connect-db.ts            # Database connection
├── lib/
│   ├── apiResponse.ts           # Standardized API responses
│   ├── asyncHandler.ts          # Async error handling
│   ├── cookieOptions.ts         # Cookie configuration
│   ├── errorResponse.ts         # Error handling
│   └── validateData.ts          # Input validation
├── middleware/
│   └── verify-access-token.middleware.ts # JWT verification
├── models/
│   └── user.model.ts            # User & PreRegisterUser schemas
├── routes/auth/
│   └── register.route.ts        # Authentication routes
└── index.ts                     # Application entry point
\`\`\`

## 🔄 Authentication Flow

### Registration Flow
1. User submits registration form
2. Data stored in `PreRegisterUsers` table
3. Verification email sent with JWT token
4. User clicks verification link
5. System verifies token and moves data to `Users` table
6. Cleanup: Remove all `PreRegisterUsers` entries for that email

### Login Flow
1. User submits credentials
2. System checks `Users` table (verified accounts only)
3. Password validation using bcrypt
4. JWT tokens generated (access + refresh)
5. Tokens stored in secure HTTP-only cookies

### Password Reset Flow
1. User requests password reset
2. System generates secure reset token
3. Reset email sent (token not exposed in response)
4. User submits new password with token
5. Password updated and user automatically logged in

## 🛡️ Security Features

- **Async bcrypt hashing** with salt rounds of 12
- **Strong password validation** (uppercase, lowercase, numbers, special chars)
- **JWT tokens** with proper expiration
- **HTTP-only cookies** for token storage
- **Rate limiting** ready (recommended for production)
- **Input sanitization** and validation
- **Password field exclusion** from queries by default
- **Secure token generation** for all auth flows

## 📊 Database Schema

### Users Collection
\`\`\`typescript
{
  _id: ObjectId,
  firstName: string,
  lastName: string,
  email: string (unique, indexed),
  phone?: string,
  password: string (hashed, excluded by default),
  refreshToken?: string (excluded by default),
  forgotToken?: string (excluded by default),
  isEmailVerified: boolean,
  lastLogin?: Date,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

### PreRegisterUsers Collection
\`\`\`typescript
{
  _id: ObjectId,
  firstName: string,
  lastName: string,
  email: string (not unique),
  phone?: string,
  password: string (hashed),
  verifyToken: string,
  expiresAt: Date (TTL index - auto cleanup),
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🚀 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | No |
| POST | `/auth/verify-email` | Email verification | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/forgot-password` | Request password reset | No |
| POST | `/auth/reset-password` | Reset password | No |
| POST | `/auth/refresh-token` | Refresh access token | No |
| POST | `/auth/logout` | User logout | Yes |

## 🔧 Installation & Setup

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd express-ts-auth
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Environment Setup**
Create a `.env` file:
\`\`\`env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/auth-db
ACCESS_TOKEN_SECRET=your-access-token-secret
REFRESH_TOKEN_SECRET=your-refresh-token-secret
VERIFY_TOKEN_SECRET=your-verify-token-secret
FORGOT_TOKEN_SECRET=your-forgot-token-secret
NODE_ENV=development
\`\`\`

4. **Start the server**
\`\`\`bash
# Development
npm run dev

# Production
npm run build
npm start
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
\`\`\`

## 📈 Benefits of This Architecture

✅ **Clean Users table** - Only verified accounts, fast queries
✅ **No duplicate email errors** - PreRegisterUsers allows multiple attempts
✅ **Automatic cleanup** - TTL indexes remove expired registrations
✅ **Better user experience** - Users can retry without errors
✅ **Multi-step flow support** - Perfect for complex registration processes
✅ **Improved security** - Separation of concerns between staging and production data

## 🔮 Future Enhancements

- [ ] Email service integration (SendGrid, AWS SES)
- [ ] SMS verification for phone numbers
- [ ] Social login (Google, Facebook, GitHub)
- [ ] Two-factor authentication (2FA)
- [ ] Account lockout after failed attempts
- [ ] Password history tracking
- [ ] Admin dashboard for user management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by the need to solve duplicate email registration issues
- Built with modern security best practices
- Designed for scalability and maintainability

---

**Made with ❤️ by Mussaddiq Mahmood**
