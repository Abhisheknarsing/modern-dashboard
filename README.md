# Modern Dashboard

A modern, responsive dashboard application built with Next.js 15, TypeScript, and Tailwind CSS. Features secure authentication, interactive charts, and a professional UI design.

![Dashboard Preview](https://via.placeholder.com/800x400/1f2937/ffffff?text=Modern+Dashboard+Preview)

## ✨ Features

- 🔐 **Secure Authentication** - User registration and login with session management
- 📊 **Interactive Dashboard** - KPI cards, charts, and financial metrics
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- ⚡ **Performance Optimized** - Fast loading with Next.js optimizations
- 🧪 **Well Tested** - Comprehensive test suite with Vitest and Playwright

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd modern-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   DATABASE_URL="file:./dev.db"
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 How to Use the App

### 1. Getting Started

When you first visit the application, you'll see the landing page with options to get started.

### 2. User Registration

1. Click **"Get Started"** or navigate to `/register`
2. Fill out the registration form:
   - **Name**: Your full name
   - **Email**: Valid email address
   - **Password**: Must be at least 8 characters with uppercase, lowercase, and numbers
   - **Confirm Password**: Must match your password
3. Click **"Create Account"**
4. You'll be automatically logged in and redirected to the dashboard

### 3. User Login

1. Navigate to `/login` or click **"Sign In"**
2. Enter your email and password
3. Click **"Sign In"**
4. You'll be redirected to the dashboard

### 4. Dashboard Overview

The dashboard contains several key sections:

#### **KPI Cards**
- **Total Users**: Shows user count with percentage change
- **Monthly Expenses**: Displays expense metrics
- **Company Value**: Shows company valuation
- **Total Employees**: Employee count metrics

Each KPI card shows:
- Current value (formatted with K/M suffixes)
- Percentage change from last period
- Color-coded indicators (green = positive, red = negative, gray = neutral)
- Trend icons (up/down arrows)

#### **Charts Section**
- **Traffic Sources Chart**: Interactive bar chart showing data sources
- **Performance Metrics**: Circular progress indicators for various metrics
- **Financial Overview**: Cards showing revenue, profit, expenses, and growth

#### **Navigation**
- **Sidebar**: Navigate between Dashboard, Analytics, and Settings
- **Mobile Menu**: Collapsible sidebar for mobile devices
- **User Menu**: Access logout and user settings

### 5. Dashboard Features

#### **Data Refresh**
- Click the **"Refresh"** button in the top-right to update all metrics
- Loading states show while data is being fetched
- Last updated timestamp is displayed

#### **Interactive Charts**
- **Hover Effects**: Hover over chart elements to see detailed tooltips
- **Responsive Design**: Charts adapt to different screen sizes
- **Real-time Updates**: Data refreshes automatically

#### **Error Handling**
- Error messages appear if data fails to load
- **"Dismiss"** button to clear error notifications
- Graceful fallbacks for missing data

### 6. Responsive Design

The dashboard works seamlessly across all devices:

- **Desktop** (1920px+): Full sidebar and multi-column layout
- **Laptop** (1366px+): Optimized spacing and sizing
- **Tablet** (768px+): Adapted layout with collapsible sidebar
- **Mobile** (375px+): Single column layout with hamburger menu

### 7. Settings & Analytics

- **Analytics Page**: Detailed metrics and advanced charts
- **Settings Page**: User preferences and account management
- **Logout**: Secure session termination

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking

# Testing
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:e2e     # Run end-to-end tests
npm run test:all     # Run all tests

# Analysis
npm run analyze      # Analyze bundle size
```

### Project Structure

```
modern-dashboard/
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── (auth)/         # Authentication pages
│   │   ├── (dashboard)/    # Dashboard pages
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── auth/          # Authentication components
│   │   ├── charts/        # Chart components
│   │   ├── dashboard/     # Dashboard components
│   │   └── ui/            # UI components (shadcn/ui)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
└── docs/                  # Documentation
```

## 🧪 Testing

The application includes comprehensive testing:

### Unit Tests
```bash
npm run test
```
Tests individual components and utilities.

### End-to-End Tests
```bash
npm run test:e2e
```
Tests complete user workflows across browsers.

### Test Coverage
```bash
npm run test:coverage
```
Generates detailed coverage reports.

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Test the production build**
   ```bash
   npm start
   ```

### Deployment Options

- **Vercel** (Recommended): Connect your GitHub repo for automatic deployments
- **Docker**: Use the provided Dockerfile for containerized deployment
- **Traditional Hosting**: Deploy to any Node.js hosting provider

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXTAUTH_URL` | Application URL | Yes |
| `NEXTAUTH_SECRET` | Authentication secret | Yes |
| `DATABASE_URL` | Database connection string | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

### Customization

- **Theme**: Modify `tailwind.config.ts` for custom colors and styling
- **Components**: Extend or customize components in `src/components/`
- **Data**: Update mock data in `src/data/` or connect to your API
- **Charts**: Customize chart configurations in `src/components/charts/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting guide](./DEPLOYMENT.md#troubleshooting)
2. Review the [production checklist](./PRODUCTION_CHECKLIST.md)
3. Open an issue on GitHub

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Recharts](https://recharts.org/) - Chart library
- [NextAuth.js](https://next-auth.js.org/) - Authentication library

---

**Built with ❤️ using modern web technologies**