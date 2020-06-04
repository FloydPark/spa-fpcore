export class APIResponse<T>{

    data:T;
    query: {
        previous:string;
        next:string;
        last:string;
    }
}