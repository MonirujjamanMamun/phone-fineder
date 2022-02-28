const loadData = () => {
    const inputFild = document.getElementById("input-fild");
    const inputValue = inputFild.value.toLowerCase();
    inputFild.value = '';

    if (inputValue === '') {
        document.getElementById("empty-fild").style.display = 'block';
    } else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayPhone(data.data.slice(0, 20)))
        document.getElementById("empty-fild").style.display = 'none';
    }
}

const displayPhone = (numbers) => {
    const allPhone = document.getElementById("all-phone");
    allPhone.textContent = '';
    document.getElementById("single-phone").textContent = '';

    if (numbers.length === 0) {
        document.getElementById("error").style.display = 'block';
    } else {
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

        document.getElementById("error").style.display = 'none';
    }
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
        singlePhone.innerHTML = `
        <div class="card">
            <img src="${number.image}" class="w-50 mx-auto mt-2" alt="">
            <div class="card-body ms-5">
                <h3><span class='fw-bold'>Name : </span>${number.name}</h3>
                <h4><span class='fw-bold'>Brand : </span>${number.brand}</h4>
                <h6><span class='fw-bold'>Release Date : </span>${number.releaseDate||'release date not found'}</h6>
                <p><span class='fw-bold'>Storage : </span>${number.mainFeatures.storage}</p>
                <p><span class='fw-bold'>DisplaySize : </span>${number.mainFeatures.displaySize}</p>
                <p><span class='fw-bold'>Chip Set : </span>${number.mainFeatures.chipSet}</p>
                <p><span class='fw-bold'>Memory : </span>${number.mainFeatures.memory}</p>
                <p><span class='fw-bold'>Sensors : </span>${number.mainFeatures.sensors}</p>

                <p>${number.others? `<span class='fw-bold'>Bluetooth : </span>${number.others.Bluetooth}, ${number.others.GPS},${number.others.NFC}, ${number.others.Radio}, ${number.others.USB},${number.others.WLAN}` : 'Not found'}</p>
            
            </div>
        </div>`;
}