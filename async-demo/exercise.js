
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//       getTopMovies((movies) => {
//         console.log('Top movies: ', movies);
//         sendEmail(customer.email, movies, () => {
//           console.log('Email sent...')
//         });
//       });
//     }
//   });
  
  function getCustomer(id) {
      return new Promise((resolve,reject) =>{
    setTimeout(() => {
      resolve({ 
        id: 1, 
        name: 'Mosh Hamedani', 
        isGold: true, 
        email: 'email' 
      });
    }, 4000);  
  });
};
  
  function getTopMovies() {
    return new Promise((resolve,reject) =>{
    setTimeout(() => {
      resolve(['movie1', 'movie2']);
    }, 4000);
  });
}
  
  function sendEmail(email, movies) {
    return new Promise((resolve,reject) =>{
    setTimeout(() => {
     resolve();
    }, 4000);
  });
};

  async function displayInfo(){
      try{
          const customer = await getCustomer(1);
          console.log('CUstomer:', customer);
          if(customer.isGold){
              const movies = await getTopMovies();
              console.log('Top movies: ', movies);
              const sent = await sendEmail( customer.email, movies);
              console.log('Email sent...');
          }
      }
      catch(err){
        console.log('Error', err.message);
      }
  };

  displayInfo();