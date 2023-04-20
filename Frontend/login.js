


async function login(e){
   e.preventDefault();
   const email =document.getElementById('email').value;
   const password =document.getElementById('password').value;

   const obj={
    email,
    password
   }

    const res=await axios.post('http://localhost:2000/user/login',obj)
    if(res.status===202){
        window.alert("succesfully logged in")
    }else{
        window.alert("Unable to login");
    }
}