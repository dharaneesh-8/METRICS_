# Event Attendees Dashboard

A web dashboard to view and manage event attendees from Supabase.

## Setup Instructions

### 1. Configure Supabase Credentials

You have two options:

#### Option A: Using .env file (Recommended)

1. Create a `.env` file in the project root:
```env
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

2. Generate `config.js` from `.env`:
```bash
node generate-config.js
```

#### Option B: Direct Configuration

1. Edit `config.js` directly and replace the placeholder values:
```javascript
const SUPABASE_CONFIG = {
    url: 'https://your-project.supabase.co',
    anonKey: 'your-anon-key-here'
};
```

### 2. Get Your Supabase Credentials

1. Go to your [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings** > **API**
4. Copy:
   - **Project URL** → Use as `SUPABASE_URL`
   - **anon/public key** → Use as `SUPABASE_ANON_KEY`

### 3. Database Table Structure

Ensure your Supabase `contacts` table has the following columns:
- `id` (primary key)
- `name` (text)
- `phone_nu` or `phone_number` (text)
- `sentiment` (text) - with values:
  - `voicemail`
  - `attending the party`
  - `Not attending the party`
  - `busy`
  - `Outgoing calls are not working for this contact.`
- `gender` (optional)
- `last_called` (timestamp, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### 4. Open the Dashboard

Simply open `logs.html` in your web browser or serve it using a local web server.

## Sentiment Status Mapping

The dashboard automatically maps sentiment values to status categories:

| Sentiment Value | Status Category | Display Color |
|----------------|----------------|---------------|
| `attending the party` | Attending | Green |
| `Not attending the party` | Not Attending | Red |
| `busy` | Busy | Default |
| `voicemail` | Voicemail | Default |
| `Outgoing calls are not working for this contact.` | Call Failed | Orange |

## Features

- **Real-time Statistics**: View total attendees, attending count, and status breakdowns
- **Filtering**: Filter attendees by status (All, Attending)
- **Status Indicators**: Color-coded status display
- **Responsive Design**: Works on desktop and mobile devices

## Security Note

⚠️ **Important**: The `config.js` file contains your Supabase credentials. For production use:
- Never commit `config.js` or `.env` to version control
- Add them to `.gitignore`
- Consider using environment variables on your server and serving config through an API endpoint

