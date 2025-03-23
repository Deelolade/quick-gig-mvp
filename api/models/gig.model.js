import mongoose from "mongoose";

const GigSchema = new mongoose.Schema(
  {
    title: { 
        type: String,
        required: true
        },
    description: { 
        type: String,
        required: true 
    },
    price: { 
        type: Number,
        required: true 
    },
    category: { 
        type: String,
        required: true 
    },
    freelancer: { 
        type: mongoose.Schema.Types.ObjectId, ref: "User", 
        required: true 
    }, // References Freelancer
    deliveryTime: { 
        type: String,
        required: true 
        }, // E.g., "3 days"
    images: { 
        type: [String],
        default: [] 
        }, // Gig images
    createdAt: { 
        type: Date,
        default: Date.now 
    },
},
{ timestamps: true }
);

export default mongoose.model("Gig", GigSchema);
