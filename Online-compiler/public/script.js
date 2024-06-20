const socket = io();
let p=document.getElementById('output')
let Usertext=document.getElementById('Usertext')
let language=document.getElementById('language');
let errorMsg= document.getElementById('errorMsg');

function code_template()
{
   
switch(language.value)
{
    case 'c':
        Usertext.value=`#include<stdio.h>
int main()
{
printf("Hello word");
return 0;
}
            `;
            break;
            case 'cpp':
                Usertext.value=`#include<iostream>
using namespace std;
int main()
{
    cout<<"hello word"<<endl;
    return 0;
}
                    `;
                    break;
 
                
                case 'python':
                    Usertext.value=`print("Hello word")`;
                break;
               
               default:
                   
                   break;  
                }
}

let time=2500;
function get_Output()
{
    const dataObject = {
        lang: language.value,
        code: Usertext.value
      }
    socket.emit('fetch-code',JSON.stringify(dataObject))
  
}


setTimeout(()=>{
    socket.on('final-result',(arg)=>{
        p.innerHTML="$ "+arg;
    })
},time)

setTimeout(()=>{
socket.on('error-message',(errmsg)=>{
        errorMsg.innerHTML=errmsg;
})
},2500)