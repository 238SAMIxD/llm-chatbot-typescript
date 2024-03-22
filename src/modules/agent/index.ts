import { HumanMessage } from 'langchain/schema';

import { Neo4jGraph } from '@langchain/community/graphs/neo4j_graph';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';

import { initGraph } from '../graph';
import initAgent from './agent';

// tag::function[]
export async function call(input: string, sessionId: string): Promise<string> {
  // tag::model[]
  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    // Note: only provide a baseURL when using the GraphAcademy Proxy
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  // end::model[]
  // tag::embeddings[]
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  // end::embeddings[]
  // tag::graph[]
  // Get Graph Singleton
  const graph = await initGraph();
  // end::graph[]

  // tag::call[]
  const agent = await initAgent(llm, embeddings, graph);
  const res = await agent.invoke({ input }, { configurable: { sessionId } });

  return res;
  // end::call[]
}
// end::function[]
