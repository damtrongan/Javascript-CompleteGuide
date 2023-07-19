function createTaxCalculator(tax){
   function calculateTax(amount){
      return amount * tax;
   }

   return calculateTax;
}

const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100));
console.log(calculateIncomeTaxAmount(200));

// closue and function
let userName = 'max'
function greetUser () {
   let name  = uesrName    ///Không có tác dụng
   console.log('hi' + userName);
}

userName = 'An';
greetUser()