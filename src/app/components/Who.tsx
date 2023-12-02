import { Button } from "@nextui-org/react";
export default function Who() {
  return (
    <div className="mb-20 mt-20">
      <div className="align-center m-5 text-center">
        <div>
          <h2 className="text-4xl block mt-10 my-text">Who Are We?</h2>
        </div>

        <div className="text-xl">
         
          <p className="block m-auto w-1/2 pt-10">
            We are the first online platform for African minded people, where
            you can buy and sell exclusive original works made by creative
            Africans across the world.
          </p>

          <p className="block m-auto w-1/2 pt-10">
            Combined with our arts events showcase, branding for artistes, local
            businesses and art advisory. We are on a mission of showcasing
            Africa through art to the world.
          </p>
          <div className="w-1/2"></div>
        </div>

        <Button className='w-48 mt-20 bg-black' color="danger">
       Get Started
      </Button>  

      </div>
    </div>
  );
}
