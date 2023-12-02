// import Image from "next/image"

// import footerImg from "../public/footer-img.jpg"
import Link from "next/link";
function Footer() {
  return (
    <footer className="text-white footers bg-black mt-3 pt-3">
      <div className="text-center">
        <h2 className="text-center text-2xl p-4">The HandCraft Digest</h2>
        <p className="text-sm">
          Get a roundup of new craftspeople, artists and local businesses that
          matter to you twice a month in your inbox. No spam. No promos. Just
          African Works.
        </p>

        <div className="">
          <form className="">
            <div className=" flex space-x-2 m-8 columns-2 place-content-center w-auto">
              <div>
                <label className="">
                  <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"></span>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 px-3 py-2
    border shadow-sm border-slate-300 w-64
   placeholder-slate-400 focus:outline-none
    focus:border-sky-500 focus:ring-sky-500 block
     rounded-full sm:text-sm focus:ring-1 bg-black"
                    placeholder="Name"
                  />
                </label>
              </div>

              <div>
                <label className="">
                  <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"></span>
                  <input
                    type="email"
                    name="email"
                    className="mt-1 px-3 py-2
    border shadow-sm border-slate-300 w-65
   placeholder-slate-400 focus:outline-none
    focus:border-sky-500 focus:ring-sky-500 block
     rounded-full sm:text-sm focus:ring-1 bg-black"
                    placeholder="Email"
                  />
                </label>
              </div>
            </div>
            <div className="">
              <div className="flex place-content-center ">
                <button
                  className="block rounded-full
    border bg-white text-black p-1 w-96"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <hr className="mt-20" />
      <div></div>

      <div>
        <h2 className="text-2xl p-3">Support@handcrafted.com</h2>
        {/* <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://Handcrafted.com/" class="hover:underline">Handcrafted™</a>. All Rights Reserved.
    </span>
    <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">About</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
        </li>
        <li>
            <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
        </li>
        <li>
            <a href="#" className="hover:underline">Contact</a>
        </li>
    </ul>
    </div> */}
      </div>
    </footer>
  );
}

export default Footer;
