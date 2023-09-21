import { OpenAIApi, Configuration } from "openai-edge";
import { getErrorMessage } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    const result = await response.json();
    return result.data[0].embedding as number[];
  } catch (error: unknown) {
    const errorMessage = getErrorMessage(error);
    console.log("DEBUG: Error calling openai embeddings api", errorMessage);
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: `${errorMessage}`,
    });
    throw error;
  }
}
