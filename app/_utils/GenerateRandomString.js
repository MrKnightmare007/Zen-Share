export const generateRandomString=()=>{
    const characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    let result='';
    for(let i=0;i<10;i++){
        result+=characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
}