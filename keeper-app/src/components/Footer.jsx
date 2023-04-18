import React from "react";

function Footer() {
  const CURRENTYEAR = new Date().getFullYear();
  return <footer><p> Copyright © {CURRENTYEAR}</p></footer>;
}

export default Footer;