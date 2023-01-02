function myIpAdress(){
    const myIp = "https://api.ipify.org/?format=json";
    const myIpAdd = fetch(myIp)
    myIpAdd
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data);
document.getElementById("myIP").innerText = `MY Public IP ADDRESS : ${data.ip}`;
})
}
myIpAdress();

