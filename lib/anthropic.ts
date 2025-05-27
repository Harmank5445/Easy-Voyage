import { Anthropic, HUMAN_PROMPT, AI_PROMPT } from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error('Missing Anthropic API key');
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export { anthropic, HUMAN_PROMPT, AI_PROMPT };
