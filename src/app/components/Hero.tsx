import { useEffect, useState } from "react";
import Image from "next/image"; // Import Image from next/image
import styles from "./Mystyles";
import { Button } from "@nextui-org/react";

const Hero = () => {
  const [imageUrl, setImageUrl] = useState("");

  const fetchRandomItem = async () => {
    try {
      const response = await fetch("/api/items"); // Update the endpoint as needed

      if (response.ok) {
        const items = await response.json();

        const randomItem = items[Math.floor(Math.random() * items.length)];
        if (randomItem) {
          setImageUrl(randomItem.imgUrl);
        }
      } else {
        console.error(
          "Error fetching items from the API:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching items from the API:", error);
    }
  };

  useEffect(() => {
    fetchRandomItem();
  }, []);

  return (
    <section
      id="home"
      className={`flex md:flex-row flex-col bg-gradient-to-tr from-blue-900 to-black p-3`}
    >
      <div
        className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 m-2`}
      >
        <div
          className={`flex flex-row items-center py-[6px] px-4 bg-gradient-to-tr from-gray-700 to-indigo-900 rounded-[10px] mb-2`}
        >
          <Image
            src={"https://i.imgur.com/5BZrGDw.png"}
            alt="discount"
            width={32}
            height={32}
          />
          <p className={`${styles.paragraph} ml-2`}>
            <span className="text-white">20%</span> Discount For{" "}
            <span className="text-white">1 Month</span> Account
          </p>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            The Next <br className="sm:block hidden" />{" "}
            <span className={`${styles.textGradient}`}>Generation</span>{" "}
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0"></div>
        </div>

        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] w-full">
          Art Commerce.
        </h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5 text-white`}>
          We are focused on making sure you receive the best handcrafted
          product. Our art is in the art of selling Art.
        </p>
        <Button className="w-48 m-2 bg-black" color="danger">
          Get Started
        </Button>
      </div>

      <div
        className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}
      >
        <Image
          src={imageUrl}
          alt="billing"
          width={400}
          height={400}
          layout="responsive"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
    </section>
  );
};

export default Hero;
