import React,{useState} from 'react'


const Proposal = () => {
  const [formData, setFormData] = useState({
    proposalText: "",
    budget: "",
    duration: ""
  });

  const handleChange =(e)=>{

  }
  return (
    <div>
      <textarea
        name="proposalText"
        value={formData.proposalText}
        onChange={handleChange}
        placeholder="Write your proposal..."
        className="w-full border p-3 rounded"
      />

      <input
        name="budget"
        type="number"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Proposed Budget"
        className="w-full border p-2 rounded"
      />

      <input
        name="duration"
        type="text"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Expected Duration"
        className="w-full border p-2 rounded"
      />

    </div>
  )
}

export default Proposal
