// const percentage = (number,outOf)=>{
//     return Math.round((number/outOf) *100,2).toString()+"%"

//     // return number *(outOf*0.01)
// }

// console.log(percentage(30,25))


// const calcArea =(circumference)=>{
//     return 3.14*(circumference/(2*3.14))*circumference/(2*3.14)
// }


// console.log(calcArea(5*2*3.14))


// function leapYear(year){
//     return(year%4 ==0) && ((year % 400 == 0)||(year % 100 == 0))

// }

// console.log(leapYear(2002))


const calc = ()=>{
    let arr= [1,2,3,2,4,3,1,2,3,2,4,5,6,9,8,7,5,4,3]
    let res={}
    for(var i of new Set(arr)){
        let count = 0;
        for(var j of arr){
            if (j == i){
                count += 1
            }
        }
        res[i] = count
    }
    console.log(res)
}
calc()

