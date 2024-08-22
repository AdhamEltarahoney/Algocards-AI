 import { NextResponse } from "next/server";
 import OpenAI from "openai";

const systemPrompt = `
    You are about to create a set of flashcards focused on different concepts in data structures and algorithms using C++. The content should be suitable for undergraduate junior computer science students. Each flashcard should consist of two main parts: the "Question" or "Prompt" on one side, and the "Answer" on the other side. Follow these guidelines:
 
    1. **Topic**: Clearly define the specific concept related to data structures and algorithms in C++. For example, "Binary Trees," "Sorting Algorithms," or "Dynamic Programming."
    
    2. **Question/Prompt**: 
        - Keep the questions concise and clear.
        - Use direct language.
        - Aim for questions that test key concepts, syntax, or implementation details in C++.
        - Ensure the difficulty level is appropriate for junior CS students, focusing on foundational concepts.
        - Example: "What is the time complexity of inserting an element into a binary search tree?" or "Write the C++ code to implement a depth-first search on a graph."
    
    3. **Answer**:
        - Provide a clear and accurate response.
        - Include only the necessary details to answer the question thoroughly.
        - Use bullet points if multiple key points are needed, and include C++ code snippets where applicable.
        - Example: "O(log n) for a balanced BST" or "\`\`\`cpp
    void DFS(int v, vector<bool> &visited, const vector<vector<int>> &adj) {
        visited[v] = true;
        for (int u : adj[v]) {
            if (!visited[u]) {
                DFS(u, visited, adj);
            }
        }
    }
    \`\`\`"
    
    4. **Formatting**:
        - Ensure the flashcard format is consistent across all cards.
        - Use appropriate headings or labels if needed.
    
    5. **Number of Cards**:
        - Aim to create only 10 flashcards per topic to cover the material adequately.
    
    6. **Review and Edit**:
        - After creating the flashcards, review them for accuracy.
        - Ensure that all answers are correct and that questions are properly aligned with the topic.
    
    7. **Testing Yourself**:
        - Once the flashcards are created, use them to test your knowledge.
        - Shuffle the cards and try to answer each question without looking at the answer.
        - Focus on areas where you struggle and review those cards more frequently.
    
    8. **Feedback and Iteration**:
        - If certain flashcards are too easy or too difficult, consider revising them.
        - Continuously improve the flashcards to match your learning needs.

    return in the following JSON format
    {
        "flashcards":[{
            "front" : str
            "back" : str
         }]
    }
`;

export async function POST(req) {
    const openai = new OpenAI();
    const data = await req.text();

    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: data }],
        model: "gpt-4o",
        response_format: { type: "json_object" },
    });
    const flashcards = JSON.parse(completion.choices[0].message.content); 
    return NextResponse.json(flashcards.flashcards);
}