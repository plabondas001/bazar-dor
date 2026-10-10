import { getAuth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";

export const GET = (request) => toNextJsHandler(getAuth()).GET(request);
export const POST = (request) => toNextJsHandler(getAuth()).POST(request);
