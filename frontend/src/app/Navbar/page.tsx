import React from "react";
import "./page.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const router  = useRouter();
  return (
    <header className="navbar">
      <div className="navbar__brand" onClick={()=>router.push("/product")}>AGIO</div>
      <nav className="navbar__links">
        <Link href="/reward" className="navbar__link">
          Rewards
        </Link>
        <Link href="/reward_catalog" className="navbar__link">
          Reward Catalog
        </Link>
        <Link href="/redeem_reward" className="navbar__link">
          Redeem Rewards
        </Link>
        <Link href="/user/signin" className="navbar__link">
          Logout
        </Link>
      </nav>
      <div className="navbar__icons">
        <a href="/cart" className="navbar__icon" onClick={()=>router.push("/reward_catalog")}>
          <FaShoppingCart />
        </a>
      </div>
    </header>
  );
};

export default Navbar;
