import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt é obrigatório" },
        { status: 400 }
      );
    }

    // Chamar API da OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "Você é um coach de saúde e bem-estar empático e motivador do AtiveMind. Crie diagnósticos personalizados que inspirem e motivem as pessoas a cuidarem da saúde.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao chamar API da OpenAI");
    }

    const data = await response.json();
    const diagnostico = data.choices[0].message.content;

    return NextResponse.json({ diagnostico });
  } catch (error) {
    console.error("Erro ao gerar diagnóstico:", error);
    return NextResponse.json(
      { error: "Erro ao gerar diagnóstico" },
      { status: 500 }
    );
  }
}
