// Cloudflare Worker Proxy for AI APIs
// Solves CORS issues when calling Claude or OpenAI from browser

// Deploy this to Cloudflare Workers (free tier)
// 1. Go to workers.cloudflare.com
// 2. Create a new worker
// 3. Paste this code
// 4. Deploy and copy the URL
// 5. Use that URL in the AI_draw.html "Proxy URL" field

export default {
  async fetch(request) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-api-key, Authorization, anthropic-version'
        }
      });
    }

    try {
      const url = new URL(request.url);
      const apiProvider = url.searchParams.get('provider') || 'openai';
      
      // Get the request body
      const body = await request.text();
      
      // Get API key from headers
      const apiKey = request.headers.get('x-api-key') || 
                     request.headers.get('Authorization')?.replace('Bearer ', '');

      if (!apiKey) {
        return new Response(JSON.stringify({ error: 'API key required' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        });
      }

      let targetUrl, headers;
      
      if (apiProvider === 'claude') {
        // Claude/Anthropic API
        targetUrl = 'https://api.anthropic.com/v1/messages';
        headers = {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        };
      } else {
        // OpenAI API
        targetUrl = 'https://api.openai.com/v1/chat/completions';
        headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        };
      }

      // Forward the request to the AI API
      const response = await fetch(targetUrl, {
        method: 'POST',
        headers: headers,
        body: body
      });

      // Get the response
      const result = await response.text();
      
      // Return with CORS headers
      return new Response(result, {
        status: response.status,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, x-api-key, Authorization'
        }
      });

    } catch (error) {
      return new Response(JSON.stringify({ 
        error: error.message || 'Proxy error'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};
