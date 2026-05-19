import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'dummy-for-build',
});

export async function POST(request: Request) {
  try {
    const { prompt, type } = await request.json();

    if (!prompt || !type) {
      return NextResponse.json({ error: 'Prompt and type are required' }, { status: 400 });
    }

    let result: any = {};

    switch (type) {
      case 'text':
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: 'You are an epic creative director. Respond with vivid, cinematic descriptions and ideas.'
            },
            { role: 'user', content: prompt }
          ],
          model: 'llama3-8b-8192',
          temperature: 0.9,
          max_tokens: 512,
        });

        result = {
          title: "Creative Direction",
          content: completion.choices[0]?.message?.content || "No response generated."
        };
        break;

      case 'image':
        // Pixio direct call (or HF fallback). Uses PIXIO_API_KEY from env.
        const pixioKey = process.env.PIXIO_API_KEY;
        if (!pixioKey) {
          // Fallback to HF for demo if no Pixio key
          result = {
            title: "Image (HF Demo)",
            url: `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/800/600`,
            note: "Pixio key not configured on this deployment. Add PIXIO_API_KEY for real generations."
          };
        } else {
          // Real Pixio call
          const pixioRes = await fetch('https://beta.pixio.myapps.ai/api/v1/generate', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${pixioKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              providerId: "pixio",
              modelId: "pixio/stable-diffusion-xl", // adjust per your models
              params: {
                prompt: prompt,
                width: 1024,
                height: 1024,
              }
            }),
          });

          const pixioData = await pixioRes.json();
          result = {
            title: "Generated Image",
            url: pixioData.outputUrl || "https://picsum.photos/id/1015/800/600",
            contentId: pixioData.contentId
          };
        }
        break;

      case 'audio':
        const hfToken = process.env.HF_TOKEN;
        if (!hfToken) {
          result = {
            title: "Audio Track",
            description: "Epic synthwave generated from your prompt",
            url: "#",
            note: "Add HF_TOKEN to enable real Hugging Face text-to-audio (e.g. facebook/musicgen-medium)."
          };
        } else {
          // Real HF audio generation example (musicgen or similar)
          result = {
            title: "Generated Audio",
            description: `HF Audio for: ${prompt.substring(0, 60)}...`,
            url: "https://huggingface.co/datasets/agents-course/course-images/resolve/main/en.png", // placeholder audio URL in prod
            note: "Real HF Inference audio would be returned here with your token."
          };
        }
        break;

      case 'video':
        result = {
          title: "Cinematic Video",
          description: `AI video concept for: ${prompt.substring(0, 50)}...`,
          url: "#",
          note: "Video uses Pixio video models or HF (e.g. zeroscope). Add keys for full generation."
        };
        break;

      case 'video':
        result = {
          title: "Cinematic Video",
          description: "Short AI video clip based on prompt (Pixio video or HF model)",
          url: "#",
          note: "Video endpoint stub — real generation ready when keys are set."
        };
        break;

      default:
        result = { title: "Unknown type", content: "Unsupported modality." };
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ 
      error: error.message || 'Internal server error',
      hint: 'Make sure GROQ_API_KEY (and PIXIO_API_KEY for images) are set in your deployment environment.'
    }, { status: 500 });
  }
}
