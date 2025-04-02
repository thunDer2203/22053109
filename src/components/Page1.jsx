import React, { useRef, useState, useEffect } from "react";





const Page1 = () => {


  const [userArray, setuserArray] = useState({});


  let getUsers = async () => {
    const req = await fetch("http://20.244.56.144/evaluation-service/users");
    let users = await req.json();
    setuserArray(users);
    console.log(userArray)
  };

  return (
    <div className='flex bg-slate-800 text-green-100'>
      <span onClick={getUsers}>Click me</span>
    </div>
  )
}

export default Page1
