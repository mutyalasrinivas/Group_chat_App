

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
        localStorage.setItem(date, JSON.stringify(obj)); // storing chat msg with Time
    
        //remove old msg if > 10
        let oldestKey = localStorage.key(0);
        if(localStorage.length > 10){
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


      function showNewUserOnScreen(chat){
        const chatMessageElement = document.createElement('div');
        chatMessageElement.textContent = `${chat.name}: ${chat.text}`;
        chatMessages.appendChild(chatMessageElement);
      }


      window.addEventListener('load', async () => {
        await getusers();
        let Details, details;
        Object.keys(localStorage).forEach((key) => {
          if (key !== 'token' && key !== 'groupId') {
            Details = localStorage.getItem(key);
            details = JSON.parse(Details);
            console.log('details', details);
            showNewUserOnScreen(details);
          }
        });
        
        await getmessages();
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
    
      
      document.addEventListener("DOMContentLoaded", async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:2000/users/chat", {
            headers: { Authorization: token },
          });
      
          if (response.status == 201) {
            // Clear the chat box
            document.getElementById("messages").innerHTML = "";
      
            // Display the messages from localStorage
            const messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.forEach((msg) => showOnChatBox(msg.name, msg.message));
      
            // Display the messages from the server
            for (let i = 0; i < response.data.message.length; i++) {
              showOnChatBox(
                response.data.message[i].username,
                response.data.message[i].message
              );
            }
          }
        } catch (err) {
          console.log(err);
        }
       

      setInterval(async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`http://localhost:2000/users/chat?currenttime=${newKey}`, {
              headers: { Authorization: token },
            });
            if (response.status == 201) {
                // Display the new messages
                for (let i = 0; i < response.data.message.length; i++) {
                  showOnChatBox(
                    response.data.message[i].name,
                    response.data.message[i].message
                  );
                }
            }
        } catch (err) {
            console.log(err);
        }
    
      }, 1000);
    });

    async function showOnChatBox(name, message) {
        const parentnode = document.getElementById("messages")
        const childnode = `<p>${name}:${message}</p>`
        parentnode.innerHTML += childnode;
      
        try {
            const messages = JSON.parse(localStorage.getItem("messages")) || [];
            messages.push({ name, message });
            await localStorage.setItem("messages", JSON.stringify(messages));
        } catch (error) {
            console.log(error);
        }
      }