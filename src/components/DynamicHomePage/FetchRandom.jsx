// import { useState, useEffect } from 'react';
// import { get, ref } from 'firebase/database';
// import { database } from 'components/LoginSignUp/firebaseConfig';

// const useFetchRandomFoods = (user) => {
//   const [randomFoods, setRandomFoods] = useState([]);
//   const [dataLoaded, setDataLoaded] = useState(false);
//   const [cartFoods, setCartFoods] = useState([]);
//   const [orderFoods, setOrderFoods] = useState([]);

//   const fetchDishes = async () => {
//     const dishesRef = ref(database, 'Dishes');
//     const snapshot = await get(dishesRef);
//     return snapshot.val();
//   };

//   const fetchCartAndOrderHistory = async (user) => {
//     const cartRef = ref(database, `carts/${user.uid}`);
//     const orderRef = ref(database, `transactions/${user.uid}`);
//     const [cartSnapshot, orderSnapshot] = await Promise.all([get(cartRef), get(orderRef)]);
//     return [cartSnapshot.val(), orderSnapshot.val()];
//   };

//   const processCartAndOrderHistory = (cartData, orderData) => {
//     const cartDescriptions = Object.values(cartData).map((item) => item.foodDescription);
//     const orderDescriptions = Object.values(orderData).map((item) => item.foodDescription);
//     const allDescriptions = [...new Set([...cartDescriptions, ...orderDescriptions])];
//     const keywords = allDescriptions.reduce((acc, desc) => {
//       if (desc) {
//         const words = desc.split(' ');
//         words.forEach((word) => {
//           if (!acc.includes(word.toLowerCase())) {
//             acc.push(word.toLowerCase());
//           }
//         });
//       }
//       return acc;
//     }, []);
//     return keywords;
//   };

//   const selectRandomFoods = (allFoods, keywords) => {
//     const matchingFoods = allFoods.filter((food) => keywords.some((keyword) => food.description.toLowerCase().includes(keyword)));
//     const randomSelectedFoods = [];
//     while (randomSelectedFoods.length < 8 && matchingFoods.length > randomSelectedFoods.length) {
//       const randomIndex = Math.floor(Math.random() * matchingFoods.length);
//       if (!randomSelectedFoods.includes(matchingFoods[randomIndex])) {
//         randomSelectedFoods.push(matchingFoods[randomIndex]);
//       }
//     }
//     if (randomSelectedFoods.length < 8) {
//       const remainingFoods = allFoods.filter((food) => !randomSelectedFoods.includes(food));
//       while (randomSelectedFoods.length < 8) {
//         const randomIndex = Math.floor(Math.random() * remainingFoods.length);
//         if (!randomSelectedFoods.includes(remainingFoods[randomIndex])) {
//           randomSelectedFoods.push(remainingFoods[randomIndex]);
//         }
//       }
//     }
//     return randomSelectedFoods;
//   };

//   useEffect(() => {
//     let isMounted = true;

//     const fetchRandomFoods = async () => {
//       try {
//         const allDishes = await fetchDishes();
//         const allFoods = Object.keys(allDishes).reduce((acc, category) => [...acc, ...allDishes[category].items], []);

//         if (user) {
//           const [cartData, orderData] = await fetchCartAndOrderHistory(user);
//           const keywords = processCartAndOrderHistory(cartData, orderData);
//           const randomSelectedFoods = selectRandomFoods(allFoods, keywords);
//           if (isMounted) {
//             setRandomFoods(randomSelectedFoods);
//             setDataLoaded(true);
//           }
//         } else {
//           const randomSelectedFoods = selectRandomFoods(allFoods, []);
//           if (isMounted) {
//             setRandomFoods(randomSelectedFoods);
//             setDataLoaded(true);
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchRandomFoods();

//     return () => {
//       isMounted = false;
//     };
//   }, [user]);

//   return { randomFoods, dataLoaded, cartFoods, orderFoods };
// };

// export default useFetchRandomFoods;

import { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import { database } from 'components/LoginSignUp/firebaseConfig';

const useFetchRandomFoods = (user) => {
  const [randomFoods, setRandomFoods] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const fetchDishes = async () => {
    const dishesRef = ref(database, 'Dishes');
    const snapshot = await get(dishesRef);
    return snapshot.val();
  };

  const fetchCartAndOrderHistory = async (user) => {
    const cartRef = ref(database, `carts/${user.uid}`);
    const orderRef = ref(database, `transactions/${user.uid}`);
    const [cartSnapshot, orderSnapshot] = await Promise.all([get(cartRef), get(orderRef)]);
    return [cartSnapshot.val(), orderSnapshot.val()];
  };

  const processCartAndOrderHistory = (cartData, orderData) => {
    const cartDescriptions = cartData ? Object.values(cartData).map((item) => item.foodDescription) : [];
    const orderDescriptions = orderData ? Object.values(orderData).map((item) => item.foodDescription) : [];
    const allDescriptions = [...new Set([...cartDescriptions, ...orderDescriptions])];
    const keywords = allDescriptions.reduce((acc, desc) => {
      if (desc) {
        const words = desc.split(' ');
        words.forEach((word) => {
          if (!acc.includes(word.toLowerCase())) {
            acc.push(word.toLowerCase());
          }
        });
      }
      return acc;
    }, []);
    return keywords;
  };

  const selectRandomFoods = (allFoods, keywords) => {
    const matchingFoods = allFoods.filter((food) => keywords.some((keyword) => food.description.toLowerCase().includes(keyword)));
    const randomSelectedFoods = [];
    while (randomSelectedFoods.length < 8 && matchingFoods.length > randomSelectedFoods.length) {
      const randomIndex = Math.floor(Math.random() * matchingFoods.length);
      if (!randomSelectedFoods.includes(matchingFoods[randomIndex])) {
        randomSelectedFoods.push(matchingFoods[randomIndex]);
      }
    }
    if (randomSelectedFoods.length < 8) {
      const remainingFoods = allFoods.filter((food) => !randomSelectedFoods.includes(food));
      while (randomSelectedFoods.length < 8) {
        const randomIndex = Math.floor(Math.random() * remainingFoods.length);
        if (!randomSelectedFoods.includes(remainingFoods[randomIndex])) {
          randomSelectedFoods.push(remainingFoods[randomIndex]);
        }
      }
    }
    return randomSelectedFoods;
  };

  useEffect(() => {
    let isMounted = true;

    const fetchRandomFoods = async () => {
      try {
        const allDishes = await fetchDishes();
        const allFoods = Object.keys(allDishes).reduce((acc, category) => [...acc, ...allDishes[category].items], []);

        if (user) {
          const [cartData, orderData] = await fetchCartAndOrderHistory(user);
          const keywords = processCartAndOrderHistory(cartData, orderData);
          const randomSelectedFoods = selectRandomFoods(allFoods, keywords);
          if (isMounted) {
            setRandomFoods(randomSelectedFoods);
            setDataLoaded(true);
          }
        } else {
          const randomSelectedFoods = selectRandomFoods(allFoods, []);
          if (isMounted) {
            setRandomFoods(randomSelectedFoods);
            setDataLoaded(true);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRandomFoods();

    return () => {
      isMounted = false;
    };
  }, [user]);

  return { randomFoods, dataLoaded };
};

export default useFetchRandomFoods;
