function sum (a, b) {
    const c = a + b;
    return c;
}

function calculate (a, b) {
   const total1 =  sum( 10, 10);
   const total2 = a + b;
   const total = total1 + total2;
   console.log('Total is ', total)
}

calculate(10, 20)
