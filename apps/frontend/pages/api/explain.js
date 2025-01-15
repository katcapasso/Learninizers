export const config = {
    runtime: 'edge',
  };
  
  export default async function handler(req) {
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
  
    const { text } = await req.json();
  
    try {
      const response = await fetch(`https://api.openai.com/v1/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: `Explain this: ${text}` }],
        }),
      });
  
      const data = await response.json();
      return new Response(JSON.stringify({ explanation: data.choices[0].message.content }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response('Error processing request', { status: 500 });
    }
  }
  