export const calculatePoolProportion = ({items_array}) => {
    const pre_processed_array = items_array.sort((a,b)=> a.price - b.price);
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
        total_price += proportion* pre_processed_array[i].price;
    }
    let initial_value = 1.5 * total_price;
    return {proportion_array, initial_value};
}