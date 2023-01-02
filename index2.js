function myIpAdress() {
    const myIp = "http://api.ipify.org/?format=json";
    const myIpAdd = fetch(myIp)
    myIpAdd
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            document.getElementById("landingIP").innerText = `MY Public IP ADDRESS : ${data.ip}`;
            var ip = data.ip;
            info(ip);
        })
}
myIpAdress();


async function info(ip) {
    const latData = 17.4139;
    const longitudedata = 78.5053;
    const apiurl = `https://ipinfo.io/${ip}?token=6450138a3caad5`
    try {
        const response = await fetch(apiurl);
        const pinCode = 600099;
        // postalData(pinCode);
        if (response.status !== 200)
            throw new Error("Can't ablt to fetch the data")
        const fetchdata = await response.json();
        console.log(fetchdata);

        // This is for Split the Latitude and Longitude
        var loc_Data = `Long: ${fetchdata.loc}`
        var lat_Data = [];
        lat_Data = loc_Data.split(",");
        for (let str of lat_Data) {
            console.log(str);
            document.getElementById("latData").innerHTML = ` Lat: ${lat_Data[1]}`
            document.getElementById("longData").innerHTML = ` ${lat_Data[0]}`
            // dispalyMap(lat_Data[0], lat_Data[1]);
        }
        document.getElementById("cityData").innerHTML = `City: ${fetchdata.city}`
        document.getElementById("regionData").innerHTML = `Region: ${fetchdata.region}`
        document.getElementById("OrganisationData").innerHTML = `Organisation: ${fetchdata.org}`
        document.getElementById("HostnameData").innerHTML = `Hostname: ${fetchdata.org}`
        document.getElementById("timezonedata").innerHTML = `Time zone: ${fetchdata.timezone}`
        // date and Time
        let india_date_time = new Date().toLocaleString("en-INDIA", { timeZone: `${fetchdata.timezone}` });
        console.log(india_date_time);
        document.getElementById("date").innerHTML = `Date And Time: ${india_date_time}`;

        var pin_Code = document.getElementById("pincodeData")
        pin_Code.innerHTML = `Pincode: ${fetchdata.postal}`
        postalData(pinCode);
        dispalyMap(latData, longitudedata);
    }
    catch (err) {
        console.log(err.message);
    }
}

function dispalyMap(latData, longData) {
    const dis = document.getElementById("targetFrame");
    dis.src = `https://maps.google.com/maps?q=${latData}  ${longData}&z=15&output=embed`
    dis.style.width = "950px"
    dis.style.height = "550px"
}

async function postalData(pin) {
    // const pinCode = 600099;
    const postalApiUrl = `https://api.postalpincode.in/pincode/${pin}`;
    try {
        const response = await fetch(postalApiUrl);
        if (response.status !== 200)
            throw new Error("Can't ablt to fetch the Postal data")
        const data = await response.json();
        console.log(data);

        // Postal 1
        document.getElementById("pincodeMess").innerHTML = `Message: ${data[0].Message}`
        document.getElementById("postal-name-1").innerHTML = `Name: ${data[0].PostOffice[0].Name}`
        document.getElementById("postal-branch-type-1").innerHTML = `Branch Type: ${data[0].PostOffice[0].BranchType}`
        document.getElementById("postal-delivery-1").innerHTML = `Delivery Status: ${data[0].PostOffice[0].DeliveryStatus}`
        document.getElementById("postal-district-1").innerHTML = `District: ${data[0].PostOffice[0].District}`
        document.getElementById("postal-division-1").innerHTML = `Division: ${data[0].PostOffice[0].Division}`

        // Postal 2
        document.getElementById("postal-name-2").innerHTML = `Name: ${data[0].PostOffice[1].Name}`
        document.getElementById("postal-branch-type-2").innerHTML = `Branch Type: ${data[0].PostOffice[1].BranchType}`
        document.getElementById("postal-delivery-2").innerHTML = `Delivery Status: ${data[0].PostOffice[1].DeliveryStatus}`
        document.getElementById("postal-district-2").innerHTML = `District: ${data[0].PostOffice[1].District}`
        document.getElementById("postal-division-2").innerHTML = `Division: ${data[0].PostOffice[1].Division}`
    }
    catch (err) {
        console.log(err.message);
    }
}



