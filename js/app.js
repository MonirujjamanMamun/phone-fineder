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
            <button type="button" class="btn btn-success ">Details</button>
            </div>
        </div>
        `;
        allPhone.appendChild(div);
    });
}