let log = (...args) => console.log("Test Macro | ", ...args);

let wait = async (ms) => new Promise((resolve)=> setTimeout(resolve, ms));

let randColor = () => `#${(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')}`;

let error = (...args) => {ui.notifications.error(`${this.name} Macro | `, ...args); return new Error(`${this.name} ${args.join(` `)}`); }

let random = (int) =>  Math.floor(Math.random() * int);

let colorSet = (n,l,h) => n <= l ? `color:green` : n >= h ? `color:red` : ``;

let randomArrayElement = (arr) => arr[Math.floor(Math.random()* arr.length)]; 

let weightedArray = (arr, w, e) => { let reArr = []; arr.forEach(ele => { for(let i=0; i< ele[w]; i++) reArr.push(ele[e]); }); return reArr; };

let capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
