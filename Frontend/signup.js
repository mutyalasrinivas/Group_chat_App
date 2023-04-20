
async function signup(e){
    try{
        e.preventDefault();
        const name=document.getElementById('name').value;
        const email =document.getElementById('email').value;
        const phone=document.getElementById('phone').value;
        const password=document.getElementById('password').value;
   
        const obj={
            name,
            email,
            phone,
            password
        }
           
        
           const res= await axios.post("http://localhost:2000/user/signup",obj);
   
           if(res.status===201){
               window.location.href="./login.html"
           }else{
               throw new Error("Unable to Signup")
           }
    }catch(err){
        console.log("signup client--->",err);
    }
    
} 