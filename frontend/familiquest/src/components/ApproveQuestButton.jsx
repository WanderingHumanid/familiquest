import React, { useState } from "react";
import { approveQuest, isQuestApproved } from "../services/approvalContract";
import "./ApproveQuestButton.css";

function ApproveQuestButton({ questId }) {
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    try {
      await approveQuest(questId);
      setApproved(true);
      alert("Quest approved on-chain!");
    } catch (err) {
      alert("Approval failed: " + err.message);
    }
    setLoading(false);
  };

  // Optionally check approval status on mount
  React.useEffect(() => {
    async function checkApproval() {
      const result = await isQuestApproved(questId);
      setApproved(result);
    }
    checkApproval();
  }, [questId]);

  return (
    <button onClick={handleApprove} disabled={approved || loading}>
      {approved ? "Quest Approved" : loading ? "Approving..." : "Approve Quest"}
    </button>
  );
}

export default ApproveQuestButton;