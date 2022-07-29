const Footer = (props) => {
  return (
    <div
      className={`${"border-t-2 text-white border-white text-center md:flex justify-center mt-12 py-2 space-x-2"} ${props.className}`}
      //   style={backgroundColor: rgba(0, 0, 0, 0.2)}
    >
      <p> © 2021 Copyright: Friendly Weather </p>
      <p>Powered by </p>
      <a href="https://openweathermap.org/">Open Weather API</a>
    </div>
  );
};
export default Footer;
