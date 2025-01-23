import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
  baseURL: "https://integrate.api.nvidia.com/v1",
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "meta/llama-3.1-405b-instruct",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    });

    let generatedText = new String("");

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      process.stdout.write(content);
      generatedText += content;
    }

    return Response.json({
      data: {
        isRoleUser: false,
        message: generatedText,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
  }
}
