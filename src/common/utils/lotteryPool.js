export const calculatePoolProportion = ({items_array}) => {
    const pre_processed_array = items_array.sort((a,b)=> a.data.price - b.data.price);
    //calculate the pre_proportion
    let divider_sum = 0;
    for(let i = 0; i< pre_processed_array.length; i++){
        let divider = 2**Math.log(2**i);
        divider_sum += 1/divider;
    }
    const initial_proportion = 1/divider_sum;
    //calculate initial value
    let total_price = 0;
    let proportion_array = [];
    for(let i = 0; i< pre_processed_array.length; i++){
        let divider = 2**Math.log(2**i);
        let proportion = initial_proportion/divider;
        proportion_array.push(parseFloat(proportion));
        total_price += proportion* pre_processed_array[i].data.price;
    }
    let initial_value = 1.5 * total_price;
    let result_array = pre_processed_array.map((item,index)=>{
        return {item: item, proportion: proportion_array[index]}
    })
    return {result_array, initial_value};
}