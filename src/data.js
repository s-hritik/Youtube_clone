export const API_Key = import.meta.env.VITE_API_KEY;

export const Valueconv = (value) => {
    if(value>=1000000){
        return Math.floor(value/1000000) + 'M';}
    else if(value>=1000){
        return Math.floor(value/1000) + 'K';}
    else{
        return value;
    }    
}
