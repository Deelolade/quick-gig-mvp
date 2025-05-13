import {Router} from "express"
import {getClientProposals, getClientProposalCount, getProposalsByFreelancer, sendProposal, getFreelancerProposalsCount}  from "../controllers/proposal.controller.js"
import { authenticateUser } from "../utils/authMiddleware.js"


const proposalRouter = Router()

proposalRouter.post("/proposals/:userId",authenticateUser, sendProposal) //create proposals 
proposalRouter.get("/proposals/:userId", getProposalsByFreelancer); //proposals submited by freelancer
proposalRouter.get("/freelancer/proposals/:userId", authenticateUser, getFreelancerProposalsCount);//count proposals on freelancer dashboard
proposalRouter.get("/client/proposals/:userId",authenticateUser,  getClientProposalCount); //count proposals on client dashboard
proposalRouter.get("/proposals/client/:userId", getClientProposals); //client get proposals submited on the job he posted 

export default proposalRouter;