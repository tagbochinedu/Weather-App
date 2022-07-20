import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const locate = async () => {
      try {
        const fetchLocation = await fetch(
          "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyD_rbHJo6ug-X95KgkJZtPHI_5mlC9AgH0"
        );
        const response = await fetchLocation.json();
        console.log(response);
      } catch (error) {
        alert(error.message);
        console.log(error)
      }
    };

    locate();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <p></p>
    </>
  );
}
