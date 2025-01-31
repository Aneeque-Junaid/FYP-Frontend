export const fetchSignVideos = async (sentence: string) => {
  try {
    const response = await fetch(
      `https://sign-language-backend-afshal1-afshal1s-projects.vercel.app/api/sign/get-videos`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sentence }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch sign videos.");
    }

    const data = await response.json();
    return data.data;
  } catch (err: unknown) {
    throw new Error(
      err instanceof Error ? err.message : "Something went wrong."
    );
  }
};

export const promptToAI = (word: string, language: string) => {
  const prompt = `
        Provide a brief description of how to sign the word or letter '${word}' in ${language}. 
        Keep the response within two to three lines and include tips for accuracy.
      `;

  return fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_AI_API_KEY}`,
    },
    body: JSON.stringify({
      messages: [
        {
          role: "system",
          content:
            "You are a Sign Language Assistant providing brief and clear signing instructions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-70b-8192",
      temperature: 0.7,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    }),
  }).then((response) => response.json());
};
