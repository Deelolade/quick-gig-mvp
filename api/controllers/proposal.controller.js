import Gigs from "../models/gig.model.js";
import Proposal from "../models/proposal.model.js";

export const sendProposal = async (req, res, next) => {
    try {
        const { proposalText, budget, duration, gigId, freelancerId } = req.body;
        if( !proposalText || !budget || !duration || !gigId || !freelancerId || proposalText ==="" || budget ==="" || duration==="" || gigId ==="" || freelancerId === ""){
            return res.status(400).json({ message: "All fields are required." })
        }

        const existing = await Proposal.findOne({ gigId, freelancerId });
        if (existing) {
            res.status(400).json({
                success: false,
                message: "Proposal already Submitted.!!"
            })
            return;
        }
        const newProposal = new Proposal({ proposalText, budget, duration, gigId, freelancerId })
        const savedProposal = await newProposal.save();
        res.status(201).json(savedProposal);
    } catch (error) {
        return next(error)
    }
}
export const getProposalsByFreelancer = async (req, res, next) => {
    try {
        const proposals = await Proposal.find({ freelancerId: req.params.userId })
            .populate('gigId')
            .sort({ createdAt: -1 });
        res.status(200).json(proposals);
    } catch (error) {
        next(error);
    }
};

export const getClientProposals = async(req, res, next)=>{
    try {
        const gigs = await Gigs.find({client: req.params.userId})
        
        const gigIds = gigs.map(gig => gig._id)

        const proposals = await Proposal.find({gigId: {$in : gigIds} })
        .populate("freelancerId")
        .sort({createdAt : -1})
        res.status(200).json(proposals)
    } catch (err) {
        next(err)
    }
}

export const getProposals = async (req, res, next) => {
    try {
        const proposals = await Proposal.find({ gigId: req.params.jobId }).populate("freelancerId", "username profileImage");
        res.status(200).json(proposals);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch proposals." });
    }
}
