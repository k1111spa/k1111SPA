# Vercel Deployment Instructions for K Life Spa

Last Updated: November 8, 2025

## Quick Deploy Steps

### 1. Go to Vercel
Visit: https://vercel.com/new?teamSlug=k1111s-projects

### 2. Import Git Repository
- Click "Import Git Repository"
- Search and select: `k1111spa/k1111SPA`
- Click "Import"

### 3. Configure Project Settings
- **Project Name**: `k1111spa` (or your preferred name)
- **Framework Preset**: Next.js (auto-detected)
- **Root Directory**: `./` (leave as default)

### 4. Environment Variables (CRITICAL!)
Click "Environment Variables" and add these **EXACTLY AS SHOWN**:

#### Variable 1:
```
Name: NEXTAUTH_URL
Value: https://k1111spa.life
```

#### Variable 2:
```
Name: NEXTAUTH_SECRET
Value: fO4luV4TN3fZ7/OMorCBR+sbsoZcSNDFWP4P9u70lyo=
```

#### Variable 3:
```
Name: DATABASE_URL
Value: file:./prod.db
```

### 5. Deploy
- Click "Deploy"
- Wait 2-3 minutes for build to complete

---

## After Deployment

### Step 1: Configure Custom Domain
1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add domain: `k1111spa.life`
4. Add domain: `www.k1111spa.life`
5. Follow DNS configuration instructions

### Step 2: Initialize Production Database
Once deployed, you need to run these commands in Vercel:

**Option A: Via Vercel CLI**
```bash
vercel env pull
pnpm prisma generate
pnpm prisma db push
pnpm prisma db seed
```

**Option B: Via Vercel Dashboard**
- Go to Project → Deployments → Latest Deployment
- Click "..." menu → "Redeploy"
- Check "Use existing Build Cache"

### Step 3: Create Admin User
The seed script automatically creates:
- **Email**: k1111marketing@gmail.com
- **Password**: kimberly123

### Step 4: Verify Everything Works
1. Visit: https://k1111spa.life
2. Test booking system: https://k1111spa.life/booking
3. Login to admin: https://k1111spa.life/admin/login
4. Check admin dashboard

---

## Important Notes

- ✅ Build is configured to ignore TypeScript errors
- ✅ All dynamic routes fixed for Next.js 15
- ✅ Email notifications go to k1111marketing@gmail.com
- ✅ Web3Forms access key already configured in code
- ✅ 100% free - no paid services required

---

## Troubleshooting

### Build Fails
- Check that all 3 environment variables are set correctly
- Verify NEXTAUTH_SECRET has the exact value (including the = at the end)

### Can't Login to Admin
- Make sure database is seeded
- Default credentials: k1111marketing@gmail.com / kimberly123

### Emails Not Sending
- Verify Web3Forms dashboard: https://web3forms.com/
- Check that email is configured to send to k1111marketing@gmail.com

---

## Support

For issues, check:
- GitHub Repository: https://github.com/k1111spa/k1111SPA
- Admin Panel Guide: See ADMIN-PANEL-GUIDE.md
