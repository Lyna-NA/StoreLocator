const storeForm = document.getElementById('store-form');
const storeId = document.getElementById('store-id');
const storeAddress = document.getElementById('store-address');

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

storeForm.addEventListener('submit', addStore);
