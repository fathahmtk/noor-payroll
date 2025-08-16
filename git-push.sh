# Git Setup Commands

# Step 1: Set up git identity
git config --global user.email "noordigital@example.com"
git config --global user.name "Noor Digital"

# Step 2: Check if git is initialized
if [ ! -d ".git" ]; then
    echo "Initializing git repository..."
    git init
fi

# Step 3: Add all files to staging
git add .

# Step 4: Commit changes
git commit -m "Initial commit - Noor Payroll Application with Edge Config

- Complete Qatar WPS payroll system
- Multi-role dashboards (Owner, HR, Accountant, Employee)
- SIF file generation for bank submissions
- Vercel Edge Config integration
- Database schema with Prisma
- Authentication system with NextAuth
- Real-time features with Socket.IO"

# Step 5: Add remote and push
git remote add origin https://github.com/yourusername/noor-payroll.git
git push -u origin main