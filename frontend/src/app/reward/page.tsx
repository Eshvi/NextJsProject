"use client"; // This directive ensures the component is a client component

import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./page.css";
import { useRouter } from "next/navigation";
// import Header from './Header';
// import { useNavigate } from 'react-router-dom';

// Define the props interface
interface RewardPointsProps {
  username: string;
}

export default function RewardPoints(){
  const [points, setPoints] = useState<number>(6); // Type the state as number
  const username = "eshvisahu";
  const router = useRouter();
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_REWARDS
    axios
      .get(`${url}/${username}`)
      .then((response) => setPoints(response.data.rewardPoints))
      .catch((error) => console.error("Error fetching points:", error));
  }, [username]);

  return (
    <>
      <div className="reward-points-container d-flex align-items-center justify-content-center">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
          }}
        >
          <div className="reward-points-card shadow-lg">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="card-title">Reward Points</h4>
              {/* Uncomment and use if needed
              <img 
                src="https://example.com/reward-icon.png" 
                alt="Reward Icon" 
                className="reward-icon" 
              /> 
              */}
            </div>
            <div className="card-body text-center">
              <p className="points-display">{points}</p>
              <p className="points-text">Available Points</p>
            </div>
            <div className="card-footer text-center">
              <button className="btn btn-primary" onClick={()=>router.push("/reward_catalog")}>Check Rewards</button>
            </div>
          </div>
          <img
            src="./Images/reward.png"
            style={{ height: "200px", width: "280px" }}
            alt="Reward Icon"
            className="reward-icon"
          />
        </div>
      </div>
    </>
  );
};

// export default RewardPoints;
