const loadData = () => {
        const inputFild = document.getElementById("input-fild");
        const inputValue = inputFild.value.toLowerCase();
        // clear input Fild 
        inputFild.value = '';
        // error handaling
        if (inputValue === '') {
            document.getElementById("empty-fild").style.display = 'block';
        } else {
            const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
            fetch(url)
                .then(res => res.json())
                .then(data => displayPhone(data.data.slice(0, 20)))
                // empty fild error hide 
            document.getElementById("empty-fild").style.display = 'none';
        }
    }
    // all phone data 
const displayPhone = (numbers) => {
        const allPhone = document.getElementById("all-phone");
        // clear previous display all data
        allPhone.textContent = '';
        document.getElementById("single-phone").textContent = '';
        // error handaling
        if (numbers.length === 0) {
            document.getElementById("error").style.display = 'block';
        } else {
            // display all phone data 
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
                    <button onclick="loadSingleData('${number.slug}')" type="button" class="btn btn-success px-4">Details</button>
                    </div>
                </div>
            `;
                allPhone.appendChild(div);
            });
            // error proparte hide 
            document.getElementById("error").style.display = 'none';
        }
    }
    // get single data 
const loadSingleData = (number) => {
        const url = `https://openapi.programming-hero.com/api/phone/${number}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySingleData(data.data))
    }
    // display single data 
const displaySingleData = (number) => {
        const singlePhone = document.getElementById("single-phone");
        // all details display 
        singlePhone.innerHTML = `
        <div class="card">
            <img src="${number.image}" class="w-50 mx-auto mt-2" alt="">
            <div class="card-body ms-5">
                <h3><span class='fw-bold'>Name : </span>${number.name}</h3>
                <h4><span class='fw-bold'>Brand : </span>${number.brand}</h4>
                <h6><span class='fw-bold'>Release Date : </span>${number.releaseDate||'release date not found'}</h6>
                <p><span class='fw-bold'>Storage : </span>${number.mainFeatures.storage}</p>
                <p><span class='fw-bold'>Display Size : </span>${number.mainFeatures.displaySize}</p>
                <p><span class='fw-bold'>Chip Set : </span>${number.mainFeatures.chipSet}</p>
                <p><span class='fw-bold'>Memory : </span>${number.mainFeatures.memory}</p>
                <p><span class='fw-bold'>Sensors : </span>${number.mainFeatures.sensors}</p>

                <p>${number.others? `<span class='fw-bold'>Bluetooth : </span>${number.others.Bluetooth},<span class='fw-bold'> GPS : </span> ${number.others.GPS}, <span class='fw-bold'> NFC : </span>${number.others.NFC}, <span class='fw-bold'> Radio : </span> ${number.others.Radio},<span class='fw-bold'> USB : </span> ${number.others.USB}, <span class='fw-bold'> WLAN : </span>${number.others.WLAN}` : 'Not found'}</p>
            
            </div>
        </div>`;
}