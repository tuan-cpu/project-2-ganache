export const calculateUserLevel = (amountETH) =>{
    const base_exp = 10000;
    let current_exp = amountETH * 1000000;
    if(current_exp < base_exp) return 0;
    const base_multiplier = 1.5;
    const scaling_factor = 1.05;
    let level = 1;
    let multiplier = base_multiplier;
    let next_exp = base_exp
    while(current_exp >= next_exp){
        current_exp -= next_exp;
        next_exp = Math.floor(next_exp*multiplier);
        multiplier = multiplier*scaling_factor;
        level += 1;
    }
    return { level, next_exp, current_exp };
}