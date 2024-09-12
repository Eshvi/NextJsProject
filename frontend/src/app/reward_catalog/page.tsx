"use client"; // This line ensures that the component runs as a Client Component

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.css'; // Custom CSS file
import Swal from 'sweetalert2';
import Navbar from '../Navbar/page';

// Define the type for a reward
interface Reward {
  id: number;
  name: string;
  points: number;
  imageUrl: string;
}

// Define the rewards array with the Reward type
const initialRewards: Reward[] = [
  { id: 1, name: '10% Off Coupon', points: 1, imageUrl: './Images/p1.png' },
  { id: 2, name: 'Free Shipping', points: 2, imageUrl: './Images/p2.png' },
  { id: 3, name: 'Free Product Sample', points: 3, imageUrl: './Images/p9.png' },
  { id: 4, name: 'Free Lipstick', points: 4, imageUrl: './Images/p11.png' },
  { id: 5, name: '12% off On Airpods', points: 5, imageUrl: './Images/p4.png' },
  { id: 6, name: 'BOGO On Tees', points: 6, imageUrl: './Images/p13.png' },
];

const RewardsCatalog: React.FC = () => {
  // Move rewards to state so we can update it
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);

  // Handle redeem functionality
  const handleRedeem = (rewardId: number, rewardName: string): void => {
    Swal.fire({
      title: 'Reward Redeemed',
      text: `You have successfully redeemed the ${rewardName}`,
      icon: 'success',
      confirmButtonText: 'OK'
    }).then(() => {
      // After confirmation, remove the redeemed reward
      setRewards(rewards.filter(reward => reward.id !== rewardId));
    });
  };

  return (
    <>
      <Navbar/>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Rewards Catalog</h2>
        <div className="row">
          {rewards.map((reward) => (
            <div className="col-lg-4 col-md-6 mb-4" key={reward.id}>
              <div className="card reward-card shadow-sm fade-out">
                <img 
                  src={reward.imageUrl} 
                  height="200px" 
                  width="200px" 
                  className="card-img-top" 
                  alt={reward.name} 
                />
                <div className="card-body">
                  <h5 className="card-title">{reward.name}</h5>
                  <p className="card-text">Requires {reward.points} points</p>
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleRedeem(reward.id, reward.name)}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            </div>
          ))}
          {rewards.length === 0 && (
            <div className="col-12">
              <p className="text-center">No rewards left to redeem.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RewardsCatalog;
