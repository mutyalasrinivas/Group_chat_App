


async function login(e){
   e.preventDefault();
   const email =document.getElementById('email').value;
   const password =document.getElementById('password').value;

   const obj={
    email,
    password
   }

    const res=await axios.post('http://localhost:2000/user/login',obj)
    if(res.status===201){
        window.alert("succesfully logged in")
        window.location.href="./chatapp.html"
    }
    else if(res.status===401){
        window.alert("Password Is Incorrect");
    }else{
        window.alert("Something went wront");
    }
}