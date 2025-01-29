export const fetchSignVideos = async (sentence: String) => {
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
  } catch (err: any) {
    throw new Error(err.message || "Something went wrong.");
  }
};
