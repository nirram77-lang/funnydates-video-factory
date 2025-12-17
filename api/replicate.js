// ═══════════════════════════════════════════════════════════════════════════
// FunnyDates Video Factory - Replicate API Proxy
// Handles video generation requests to Replicate.com
// ═══════════════════════════════════════════════════════════════════════════

export default async function handler(req, res) {
    // CORS headers - allow requests from anywhere
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    const { action, predictionId } = req.query;
    const REPLICATE_API = 'https://api.replicate.com/v1/predictions';
    
    // Get token from Authorization header
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Token ', '') || req.query.token;
    
    // TEST endpoint - no token required
    if (action === 'test') {
        return res.status(200).json({ 
            status: 'ok', 
            message: '🎬 FunnyDates Video Factory Backend is running!',
            timestamp: new Date().toISOString()
        });
    }
    
    // All other endpoints require token
    if (!token) {
        return res.status(400).json({ error: 'Missing API token' });
    }
    
    try {
        // ═══════════════════════════════════════════════════════════════════
        // CREATE - Start a new video generation
        // ═══════════════════════════════════════════════════════════════════
        if (req.method === 'POST' && action === 'create') {
            console.log('🎬 Creating new prediction...');
            
            const response = await fetch(REPLICATE_API, {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            });
            
            const data = await response.json();
            
            if (data.id) {
                console.log('✅ Prediction created:', data.id);
            } else {
                console.log('❌ Error:', data);
            }
            
            return res.status(response.status).json(data);
        }
        
        // ═══════════════════════════════════════════════════════════════════
        // STATUS - Check prediction status
        // ═══════════════════════════════════════════════════════════════════
        if (req.method === 'GET' && action === 'status' && predictionId) {
            const response = await fetch(`${REPLICATE_API}/${predictionId}`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            });
            
            const data = await response.json();
            return res.status(response.status).json(data);
        }
        
        // ═══════════════════════════════════════════════════════════════════
        // Invalid request
        // ═══════════════════════════════════════════════════════════════════
        return res.status(400).json({ 
            error: 'Invalid action',
            validActions: ['test', 'create', 'status'],
            usage: {
                test: 'GET /api/replicate?action=test',
                create: 'POST /api/replicate?action=create',
                status: 'GET /api/replicate?action=status&predictionId=xxx'
            }
        });
        
    } catch (error) {
        console.error('❌ Replicate API error:', error);
        return res.status(500).json({ error: error.message });
    }
}
