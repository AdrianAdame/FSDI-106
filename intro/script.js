function sayHello(name, lastName){
    console.log(`hello ${name} ${lastName}!`)

    var color = "blue"
}

function sum(num1, num2){
    const res = num1 + num2

    return res

    console.log("WILL NEVER BE CALLED")
}

function saveSomething(data){
    if(!data.userName){
        alert("user Name is required")
        return;
    }
}

function printNumbers(){
    for(let i = 0; i < 20; i++){
        if(i != 7 && i != 13)
            console.log(`${i + 1}`)
    }
}

function basicCalculations(){
    let numbers = [12,4,123,4567,234,56,12,87,124,865,233,788,43,91,544,782,653,845];

    let sum = 0

    let greater500 = 0;

    for(let i = 0; i < numbers.length; i++){
        let num = numbers[i]

        console.log(num)

        sum += num

        if(num > 500){
            greater500 += 1;
        }
    }

    console.log(sum)
    console.log("Greater than 500: " + greater500);
}

function init(){
    console.log("Hello unit 106")

    const x = "Adrian"

    sayHello(x, "Adame")

    const result = sum(21, 21)
    console.log(result)

    printNumbers()

    basicCalculations()
}

window.onload = init;