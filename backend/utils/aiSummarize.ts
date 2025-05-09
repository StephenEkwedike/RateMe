import axios from 'axios';

export async function aiSummarize(lines: string[]): Promise<string> {
  const prompt = `
  Summarize the following customer comments:

  ${lines.map(l => `- ${l}`).join('\n')}
  `;

  const res = await axios.post('https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
  return res.data.choices[0].message.content.trim();
}
