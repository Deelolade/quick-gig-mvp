// ARCJET CONFIG
import arcjet, { shield, detectBot, tokenBucket} from "@arcjet/node";
const aj = arcjet({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"], // Track requests by IP
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE", 
            allow: [
                "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
                "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
            ],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval
            interval: 10, // Refill every 10 seconds
            capacity: 10, // Bucket capacity of 10 tokens
        }),
    ],
});

// ARCJET MIDDLEWARE 
export const arcjetMiddleware = async(req, res, next)=>{
    try {
        const decision = await aj.protect(req, {requested: 1});

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()){
                return res.status(429).json({error: "Rate limit Exceeded"})
            }
            if(decision.reason.isBot()){
                return res.status(403).json({error: "Bot detected"});
            }
            return res.status(403).json({error: "Access denied"})
        }
    } catch (err) {
        console.log(`arcjet error : ${err}`)
        next(err)
    }
}