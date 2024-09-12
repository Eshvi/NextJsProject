"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./page.css"; // Custom CSS file
import { useRouter } from "next/navigation";

// Define the props type
interface RedeemPointsProps {
  username: string;
}

const RedeemPoints: React.FC<RedeemPointsProps> = () => {
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);
  const username = "eshvisahu";
  const router = useRouter();
  // Event handler with type annotation for the event
  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointsToRedeem(Number(e.target.value));
  };

  return (
    <>
      <div className="redeem-points-container d-flex align-items-center justify-content-center">
        <div className="card redeem-points-card shadow-lg">
          <div className="card-body">
            <h4 className="card-title text-center">Redeem Your Rewards</h4>
            <div className="form-group mt-4">
              <label htmlFor="pointsToRedeem">Rewards to Redeem</label>
              <input
                type="number"
                className="form-control form-control-lg"
                id="pointsToRedeem"
                value={pointsToRedeem}
                onChange={handlePointsChange}
                placeholder="Enter points"
              />
            </div>
            <button className="btn btn-danger btn-block mt-4" onClick={()=>router.push("/reward_catalog")}>
              Redeem Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedeemPoints;