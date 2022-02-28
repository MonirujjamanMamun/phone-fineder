const loadData = () => {
    const inputFild = document.getElementById("input-fild");
    const inputValue = inputFild.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data))

}

const displayPhone = (numbers) => {
    const allPhone = document.getElementById("all-phone");
    numbers.forEach(number => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
            <img src="${number.image}" class="card-img-top" alt="">
            <div class="card-body text-center">
                <h3 class="card-title">${number.phone_name}</h3>
                <h5>${number.brand}</h5>
            </div>
            <div class='text-center my-2'>
            <button onclick="loadSingleData('${number.slug}')" type="button" class="btn btn-success ">Details</button>
            </div>
        </div>
        `;
        allPhone.appendChild(div);
    });
}

const loadSingleData = (number) => {
    const url = `https://openapi.programming-hero.com/api/phone/${number}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaySingleData(data.data))
}


const displaySingleData = (number) => {
        // console.log(number)
        const singlePhone = document.getElementById("single-phone");
        const div = document.createElement('div');
        div.classList.add("card")
        div.innerHTML = `
        <img src="${number.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h1 class="card-title">Name : ${number.name}</h1>
            <h2 class="card-title">Brand : ${number.brand}</h2>
            <h3 class="card-title">Release Date : ${number.releaseDate||'release date not found'}</h3>
            <p class="card-text">Storage : ${number.mainFeatures.storage}</p>
            <p class="card-text">DisplaySize : ${number.mainFeatures.displaySize}</p>
            <p class="card-text">Chip Set : ${number.mainFeatures.chipSet}</p>
            <p class="card-text">Memory : ${number.mainFeatures.memory}</p>
            <p class="card-text">Sensors : ${number.mainFeatures.sensors}</p>

    
            <p class="card-text">${number.others? `Bluetooth : ${number.others.Bluetooth}, ${number.others.GPS},${number.others.NFC}, ${number.others.Radio}, ${number.others.USB},${number.others.WLAN}` : 'Not found'}</p>
           
        </div>
    `;
    singlePhone.appendChild(div);
}