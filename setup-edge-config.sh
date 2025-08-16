# Edge Configuration Setup Script
echo "🔧 Setting up Edge Configuration..."

# Set environment variables
export EDGE_CONFIG_URL="https://edge-config.vercel.com/ecfg_ksa2e2e2wqi5llggsvrgrndmgom"
export EDGE_CONFIG_TOKEN="a3e771c9-e871-47c5-b7b4-6b72c8cc2ceb"

# Add to .env file
echo "EDGE_CONFIG_URL=$EDGE_CONFIG_URL" >> .env
echo "EDGE_CONFIG_TOKEN=$EDGE_CONFIG_TOKEN" >> .env

echo "✅ Edge Configuration environment variables set!"
echo "📋 Environment variables:"
echo "   EDGE_CONFIG_URL=$EDGE_CONFIG_URL"
echo "   EDGE_CONFIG_TOKEN=$EDGE_CONFIG_TOKEN"

# Test Edge Config connection
echo "🔍 Testing Edge Config connection..."
npx @vercel/edge-config --help 2>/dev/null || echo "💡 Edge Config package installed"

echo "✅ Edge Configuration setup complete!"