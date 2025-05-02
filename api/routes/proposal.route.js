import {Router} from "express"
import {getClientProposals, getProposalsByFreelancer, sendProposal}  from "../controllers/proposal.controller.js"
import { authenticateUser } from "../utils/authMiddleware.js"


const proposalRouter = Router()

proposalRouter.post("/proposals/:userId",authenticateUser, sendProposal)
proposalRouter.get("/proposals/:userId", getProposalsByFreelancer);
proposalRouter.get("/proposals/client/:userId", getClientProposals);

export default proposalRouter;