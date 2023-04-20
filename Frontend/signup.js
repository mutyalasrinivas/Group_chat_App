
async function register(e){
    try{
        e.preventDefault();
        const name=document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone=document.getElementById("phone").value;
        const password=document.getElementById("password").value;
   
        
           name,
           email,
           phone,
           password
        
           const res= await axios.post("http://localhost:2000",{name,email,phone,password});
   
           if(res.status===201){
               window.location.href="./login.html"
           }else{
               throw new Error("Unable to Signup")
           }
    }catch(err){
        console.log("signup client--->",err);
    }
    
} 