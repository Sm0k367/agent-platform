export const createEpicTechLogo = () => {
  return {
    name: "Epic Tech AI Agent™️",
    tagline: "Full production AI media generation platform",
    version: "M1 Scaffold Complete",
  };
};

export type MediaType = "text" | "image" | "audio" | "video";
export type GenerationStatus = "pending" | "generating" | "complete" | "error";
