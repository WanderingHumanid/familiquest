import { ethers } from "ethers";
import ApprovalContract from "../contracts/ApprovalContract.json";
// Import the ABI from your build artifacts
// import ApprovalContractABI from "../artifacts/contracts/ApprovalContract.sol/ApprovalContract.json";

// Replace with your deployed contract address after deployment
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getApprovalContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask not found");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  return new ethers.Contract(CONTRACT_ADDRESS, ApprovalContract.abi, signer);
};

export const approveQuest = async (questId) => {
  const contract = await getApprovalContract();
  const tx = await contract.approveQuest(questId);
  return tx.wait();
};

export const isQuestApproved = async (questId) => {
  try {
    const contract = await getApprovalContract();
    return await contract.isApproved(questId);
  } catch (err) {
    // Optionally log the error for debugging
    console.warn("isQuestApproved error:", err);
    // Return a default value or handle as you wish
    return false;
  }
};