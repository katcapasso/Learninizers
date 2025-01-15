export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req) {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
  
    const { fileType, file } = await req.json();
  
    try {
      const response = await fetch(`${process.env.BACKEND_API_URL}/api/extract/${fileType}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file }),
      });
  
      const data = await response.json();
      return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      return new Response('Error processing extraction', { status: 500 });
    }
  }
  