# Admin Upload System Setup

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Admin Authentication
VITE_ADMIN_EMAIL=hope@portfolio.com
VITE_ADMIN_PASSWORD=hope123

# Sanity Configuration
VITE_SANITY_PROJECT_ID=khc2znfk
VITE_SANITY_DATASET=production
VITE_SANITY_TOKEN=your_sanity_token_here
```

## Getting Your Sanity Token

1. Go to [sanity.io](https://sanity.io)
2. Navigate to your project settings
3. Go to "API" section
4. Create a new token with "Editor" permissions
5. Copy the token and replace `your_sanity_token_here` in your `.env` file

## Admin Access

- **URL**: `http://localhost:5174/admin`
- **Email**: `hope@portfolio.com`
- **Password**: `hope123`

## Features

- ✅ Secure login with environment variables
- ✅ File upload to Sanity CMS (images & videos)
- ✅ Progress tracking for uploads
- ✅ Asset management (view, copy URLs, delete)
- ✅ Responsive design matching portfolio theme
- ✅ Session management (24-hour expiry)
- ✅ Error handling and user feedback

## Security Notes

- Admin credentials are stored in environment variables
- Sessions expire after 24 hours
- All admin routes are protected
- Sanity token should have minimal required permissions

## Usage

1. Visit `/admin` to login
2. Select multiple files (images/videos)
3. Click "Upload to Sanity" to upload files
4. View uploaded assets and copy URLs
5. Delete assets if needed

The uploaded assets will automatically appear in your portfolio's dynamic content sections.

