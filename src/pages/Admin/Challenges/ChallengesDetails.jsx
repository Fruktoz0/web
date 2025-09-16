import React from "react"; 
import HTTP_URL from "@/config/serverConfig";
import { Button } from "@/components/ui/button";

function ChallengesDetails({ challenge, onBack }) {
  if (!challenge) {
    return <p>Betöltés...</p>;
  }

  return (
    <div>
      <Button onClick={onBack} className="mb-4">Vissza</Button>
      <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
      {challenge.image && (
        <img
          src={`${HTTP_URL}${challenge.image}`}
          alt="Kihívás kép"
          className="w-64 h-64 object-cover mb-4 rounded"
        />
      )}
      <p><strong>Leírás:</strong> {challenge.description}</p>
      <p><strong>Pont költsége:</strong> {challenge.costPoints}</p>
      <p><strong>Pont jutalma:</strong> {challenge.rewardPoints}</p>
      <p><strong>Kezdete:</strong> {new Date(challenge.startDate).toLocaleDateString()}</p>
      <p><strong>Vége:</strong> {new Date(challenge.endDate).toLocaleDateString()}</p>
    </div>
  );
}

export default ChallengesDetails;
