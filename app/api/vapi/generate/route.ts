import { generateText } from "ai";
import {google} from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET(){
    return Response.json({success: true, data: "THANK YOU!"}, {status: 200});
}

export async function POST(request: Request){
    const {type, role, level, techstack, amount, userid} = await request.json();

    try {
        const {text: questions} = await generateText({
            model: google("gemini-2.0-flash-001"),
            prompt: `prepare questions for a job interview. 
            The job role is ${role}.
            The job experinece level is ${level}.
            The tech stack used in the job is: ${techstack}.
            The focus between behavioural and technical questions should lean towards: ${type}.
            The amount of questions required is: ${amount}.
            please return only the questions without any additional text.
            The questions are going to be read by a voice assistant so do not use "/" or "*" or any special characters thet might break the voice assistant.and 
            return the questions formatted like this:
        ["questions 1", "questions 2", "questions 3"]
        
        Thank you!`

            
        });

        const interview = {
            role, type, level, 
            techstack: techstack.split(","),
            userId: userid,
            finalized: true,
            coverImage: getRandomInterviewCover(),
            createdAt: new Date().toISOString(),
        }

        await db.collection("interviews").add(interview)

        return Response.json({success: true, data: JSON.parse(questions)}, {status: 200});
    } catch (error) {
        console.error(error);
    }
}