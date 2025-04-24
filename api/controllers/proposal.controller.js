import Proposal from "../models/proposal.model.js";

export const sendProposal = async(req, res, next)=>{
    try {
        const {proposalText, budget, duration, gigId, freelancerId}=  req.body;

    const existing = Proposal.findOne({gigId, freelancerId});
    if(existing){
        res.status(404).json({
            success: false,
            message: "Proposal already Submitted.!!"
        })
    }
    const newProposal = new Proposal ({proposalText, budget, duration, gigId, freelancerId})
    const savedProposal = await newProposal.save();
    res.status(201).json(savedProposal);
    } catch (error) {
        return next(error)
    }
}
export const getProposals = async(req, res, next)=>{
    try {
        const proposals = await Proposal.find({ gigId: req.params.jobId }).populate("freelancerId", "username profileImage");
        res.status(200).json(proposals);
      } catch (err) {
        res.status(500).json({ message: "Failed to fetch proposals." });
      }
}
