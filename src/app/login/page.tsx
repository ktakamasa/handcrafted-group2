"use client";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  async function getData(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    console.log(form_values.username);
    console.log(form_values.password);

    const result = await fetch("/api/users");

    if (!result.ok) {
      throw new Error("Failed to fetch data");
    }

    const users = await result.json();
    users.map((user) => {
      if (
        form_values.username == user.username &&
        form_values.password == user.password
      ) {
        console.log("user found with correct password");
        router.push(`/profile/${user.username}`);
      }
    });

    //console.log(data[0].username);
  }

  return (
    <div className="mx-auto max-w-4xl m-4">
      <form
        onSubmit={getData}
        className="max-w-md mx-auto bg-gray-100 p-6 rounded-md"
      >
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

/** 

export default function Login() {
    async function getData(e) {
       
        e.preventDefault();
        var formData = new FormData(e.target);
        const form_values = Object.fromEntries(formData);
        console.log('form values', form_values.username)

        const res= await fetch("http://localhost:3000/api/users");
        
        if (!res.ok){
          throw new Error("Failed to fetch data");
          
        }
        
        const data=await res.json();
        console.log(data[0].username);
        
        
      }

  return (
      <div className="mx-auto max-w-4xl mt-4">
        <form onSubmit={getData}>
      <input type="text" name="username" />
      <button type="submit">Submit</button>
    </form>
     
      </div>
      
  )
}
**/
