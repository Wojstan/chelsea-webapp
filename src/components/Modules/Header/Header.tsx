import { UsergroupAddOutlined, HomeOutlined } from "@ant-design/icons";
import headerImg from "../../../images/headerStadium.png";
import logo from "../../../images/logo.svg";
import styles from "./Header.module.css";
import Navlist from "./Navlist/Navlist";

const links = [
  {
    icon: <UsergroupAddOutlined />,
    link: "https://www.facebook.com/groups/chelsea24news/",
    describe: "The best chelsea group",
  },
  {
    icon: <HomeOutlined />,
    link: "https://www.chelseafc.com/en/",
    describe: "Official website",
  },
];

const Header = () => (
  <>
    <aside className={styles.top}>
      <div className="container">Home</div>
    </aside>
    <header className={styles.header}>
      <div className="container">
        <div className={styles.flex}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>
          <article>
            <h1>Chelsea Webapp</h1>
            <p>Save the results, rate the players</p>
            {links.map((link, i) => (
              <a
                key={i}
                className={styles.link}
                href={link.link}
                target="_blank"
                rel="noreferrer"
              >
                {link.icon} {link.describe}
              </a>
            ))}
          </article>
        </div>
        <Navlist />
      </div>

      <img className={styles.stadium} src={headerImg} alt="" />
    </header>
  </>
);

export default Header;
