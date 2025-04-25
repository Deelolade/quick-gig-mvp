import mongoose from "mongoose"

const proposalSchema = new mongoose.Schema(
    {
        proposalText: { type: String, required: true },
        budget: { type: Number, required: true },
        duration: { type: String, required: true },
        gigId: { type: mongoose.Schema.Types.ObjectId, ref: "Gigs", required: true },
        freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        createdAt: { type: Date, default: Date.now }
    }
)
const Proposal = mongoose.model("Proposal", proposalSchema);
export default Proposal