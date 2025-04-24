import {Router} from "express"
import {getProposals, sendProposal}  from "../controllers/proposal.controller.js"
import { authenticateUser } from "../utils/authMiddleware.js"


const proposalRouter = Router()

proposalRouter.post("/proposals",authenticateUser, sendProposal)
proposalRouter.get("/job/:jobId", getProposals);

export default proposalRouter;