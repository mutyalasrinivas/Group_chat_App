

const chatForm = document.getElementById('chat-form');
const sendMessageInput = document.getElementById('sendmsg');
const listofusers = document.getElementById('listofusers');
const chatMessages = document.getElementById('messages');

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }


  chatForm.addEventListener('submit',async(event)=>{
     
        event.preventDefault();
        const token = localStorage.getItem('token');
        const tkn = parseJwt(token);
        let message = {text:sendMessageInput.value};
        let obj = { name : tkn.name, text: sendMessageInput.value}
    
        const date = new Date().getTime(); // current time
        localStorage.setItem(date, JSON.stringify(obj)); // storing chat msg with time
    
        //remove old msg if more then 10
        let oldestKey = localStorage.key(0);
        if(localStorage.length > 11){
          for(let i=0;i<localStorage.length;i++){
            if(localStorage.key(i)<oldestKey){
              oldestKey = localStorage.key(i);
            }
          } //get key of lodest msg
          localStorage.removeItem(oldestKey);//removing oldest msg 
        }
    
        const response = await axios.post("http://localhost:2000/users/chat",message,{headers: {Authorization :token}});
        console.log(response);
        sendMessageInput.value = '';
      });
    
    async function getmessages(){
 
        let newKey = localStorage.key(0);
        for(let i=1;i<localStorage.length;i++){
          if(localStorage.key(i)<newKey){
            newKey = localStorage.key(i);
          }
        }
       const response = await axios.get(`http://localhost:4000/users/chat?currenttime=${newKey}`);
       let chatHistory = response.data.message;
       chatMessages.innerHTML = '';
        chatHistory.forEach((chat) => {
          const chatMessageElement = document.createElement('div');
          chatMessageElement.textContent = `${chat.name}: ${chat.message}`;
          chatMessages.appendChild(chatMessageElement);
        });
      }
    
      
  