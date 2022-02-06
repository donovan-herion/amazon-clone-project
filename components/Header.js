import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "../components/StateProvider";
import Link from "next/link";
import Image from "next/image";
import { auth } from "../helpers/firebase";
import amazonLogo from "../public/amazon_PNG11.png";

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthentication = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link href="/">
        <div className="header__logo-container">
          <Image className="header__logo" src="/amazon_PNG11.png" layout="fill" objectFit="contain" />
        </div>
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>
      <div className="header__nav">
        <Link href={"/login"}>
          <div onClick={handleAuthentication} className="header__option">
            <span className="header__optionLineOne">Hello</span>
            <span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
          </div>
        </Link>
        <Link
          href={{
            pathname: "/orders",
          }}
        >
          <div className="header__option">
            <span className="header__optionLineOne">Your</span>
            <span className="header__optionLineTwo">Orders</span>
          </div>
        </Link>
        <Link href="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">{basket.length}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
