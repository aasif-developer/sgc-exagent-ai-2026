import Navbar from "./Navbar";

/**
 * Header
 * Semantic wrapper for the site navigation.
 * Kept minimal so it can be reused across pages without
 * pulling in page-specific content like the Hero section.
 */
const Header = () => {
  return (
    <header>
      <Navbar />
    </header>
  );
};

export default Header;