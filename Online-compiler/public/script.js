
function code_template()
{
    let language=document.getElementById('language').value ;
    let Usertext=document.getElementById('Usertext')
switch(language)
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
                    case 'java':
                        Usertext.value=`public class code {
public static void main(String[] args) {
   System.out.println("Hello, World!");
   }
} `;
                break;
                case 'python':
                    Usertext.value=`print("Hello word")`;
                break;
                case 'nodejs':
                 Usertext.value=`console.log("Hello word")`;
               break;
               default:
                   
                   break;  
                }
}

function get_Output()
{
    setTimeout(() => {
    let p=document.getElementById('output')
    fetch('http://localhost:80/getOutPUT')
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Output: Hello from server!
        // Use the data as needed in your client-side code
        // p.value=
        p.innerHTML=data.message;
    })
    .catch(error => console.error('Error:', error));
}, 1); 
}