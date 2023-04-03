const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeAddress = document.getElementById('store-address');
const selectList = document.getElementById("results-select");

storeAddress.addEventListener('input', function (event) {
  const query = event.target.value;
  const endpoint = 'https://www.mapquestapi.com/search/v3/prediction';
  const apiKey = xxxx;
  const location = '34.3088,31.3547';  

  const url = `${endpoint}?key=${apiKey}&q=${query}&collection=address&location=${location}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
    
      if (Array.isArray(results)) {
        selectList.innerHTML = "";
        for (const result of results) {
          const option = document.createElement('option');
          option.text = result.displayString;
          option.value = result.id;
          selectList.add(option);
        }
      }
    })
    .catch(error => console.error(error));
});

selectList.addEventListener("change", () => {
  const selectedOptions = Array.from(selectList.selectedOptions);
  console.log(selectedOptions)
  const values = selectedOptions.map(option => option.label);
  storeAddress.value = values.join(", ");
});

// Send POST to API to add store
async function addStore(e) {
  e.preventDefault();

  if (storeId.value === '' || storeAddress.value === '') {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please fill in fields!'
    });
    return;
  }  

  const sendBody = {
    storeId: storeId.value,
    address: storeAddress.value
  };

  try {
    const res = await fetch('/api/v1/stores', {
      method: 'POST',         
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Store already exists!');
    }

    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'The store has been added.',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/index.html';
      }
    });    
    
  } catch (err) {
    Swal.fire({
      icon: 'error',
      text: err
    });
    return;
  }
}

storeForm.addEventListener('submit', addStore);;
