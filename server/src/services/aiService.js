export async function generateReply(message) {
  return `You said: ${message}`
}

console.log("GROQ:", import.meta.env.VITE_GROQ_API_KEY);