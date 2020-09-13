/*
This program is written in NodeJS
Use - "node index" inorder to run this program
*/

//Constant bills defined by John
const bills = [124,48,268]

//Function to find the amount of tip
let findBillAmount = (bill)=> {
    if(bill < 50) return 0.2 * bill
    if(bill <= 200) return 0.15 * bill
    if(bill > 200) return 0.1 * bill
}

//Simulating main function
const main = ()=> {
    let total = []

    //Call to get values for each tip
    let tips = bills.map(value=> findBillAmount(value))

    //Adding bill + tip
    for(let i=0; i<bills.length; i++) total.push(bills[i] + tips[i])

    //returning both values
    return {tips,total}
}

console.log(main())