const fetchFunction = async inputValue => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
  const allData = await fetch(url);
  const responsive = await allData.json();
  // console.log(responsive);
  showPhonesData(responsive.data);
};

const showPhonesData = responsiveData => {
  const phoneContainer = document.getElementById('phones-container');

  phoneContainer.innerHTML = '';

  responsiveData.forEach(phone => {
    // console.log(phone);
    const div = document.createElement('div');
    div.innerHTML = `
  <div class="card  bg-base-100 shadow-xl">
  <figure><img src="${phone.image}" alt="Shoes" /></figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <div class="card-action ">
      <button class="btn btn-primary w-full font-bold text-xl" onclick="clickShowDetails('${phone.slug} ')">Show Details</button>
    </div>
  </div>
</div>
  `;

    phoneContainer.appendChild(div);
  });
  loadingSpinner(false);
};

// search phone with input something
const searchPhones = () => {
  const inputId = document.getElementById('inputId');
  const inputValue = inputId.value;
  // console.log(inputValue);
  fetchFunction(inputValue);
  loadingSpinner(true);
};

// loading spinner

const loadingSpinner = spinner => {
  const loadingSpinnerId = document.getElementById('loading-spinner');
  if (spinner) {
    loadingSpinnerId.classList.remove('hidden');
  } else {
    loadingSpinnerId.classList.add('hidden');
  }
};

// show details

const clickShowDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showPhoneDetails(data.data);
};

const showPhoneDetails = data => {
  console.log(data);
  my_modal_3.showModal();

  const modalBox = document.getElementById('modalBox');
  modalBox.innerHTML = '';

  const div = document.createElement('div');

  div.innerHTML = `
        <div class ="bg-[#0D6EFD0D] py-4 rounded-lg">
           <img src="${data.image}" class=" d-block mx-auto"> </img>
        </div>
         
         <h3 class="font-bold text-lg">${data.name}</h3>
         <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
         <p> storage: ${data.mainFeatures?.storage} </p>
         <p> Chipset: ${data.mainFeatures?.chipSet} </p>
         <p> Display size: ${data.mainFeatures?.displaySize} </p>
         <p> Memory: ${data.mainFeatures?.memory} </p>
         <p> Slug: ${data.slug} </p>
         <p> Release data: ${data.releaseDate} </p>
         <p> Brand: ${data.brand} </p>
         <p> GPS: ${
           data.others?.GPS ? data.others.GPS : 'No GPS Available'
         } </p>
  `;
  modalBox.appendChild(div);
};
