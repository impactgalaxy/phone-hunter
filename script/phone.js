const getDataFromServer = async (searchText = "apple", isShowAll) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const response = await fetch(url);
    const phoneData = await response.json();
    displayPhone(phoneData.data, isShowAll)
}

const displayPhone = (phone, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    const showBtn = document.getElementById("show-button");
    phoneContainer.innerText = "";
    console.log(phone.length);
    if (phone.length > 12 && !isShowAll) {
        showBtn.classList.remove("hidden");
    } else {
        showBtn.classList.add("hidden");
    }

    if (!isShowAll) phone = phone.slice(0, 12);


    phone.forEach(element => {
        const div = document.createElement("div");
        div.classList.add("card", "w-80", "p-4", "bg-base-100", "shadow-xl", "rounded-xl");
        const phoneDiv = `
                    <figure><img src="${element.image}"
                            alt="${element.brand}" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${element.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="showDetails('${element.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
                `;
        div.innerHTML = phoneDiv;
        phoneContainer.appendChild(div);


    });
    loadingSpinner(false);

}

const searchHandler = (isShowAll) => {

    loadingSpinner(true);
    const searchValue = document.getElementById("searchValue");

    getDataFromServer(searchValue.value || "apple", isShowAll);
}

const loadingSpinner = (isLoading) => {
    const loaderDiv = document.getElementById("loader-div");
    if (isLoading) {
        loaderDiv.classList.remove("hidden")
    } else {
        loaderDiv.classList.add("hidden");
    }

}
// showAll Element;
const showAll = () => {
    searchHandler(true);
}
const showDetails = async (id) => {
    //console.log(id);
    const showPhoneName = document.getElementById("showPhoneName");
    const pushModal = document.getElementById("pushModal");
    pushModal.innerText = "";

    const response = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await response.json();
    const phone = data.data;
    my_modal.showModal();
    const modalDiv = document.createElement("div");
    modalDiv.innerHTML = `
    <img src="${phone.image}" class="m-auto block">
    <h1><span>Model:</span>${phone.name}</h1>
    <p><span>Specification:</span>${phone.mainFeatures.storage}</p> 
    `;
    pushModal.appendChild(modalDiv);
}