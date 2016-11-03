import {observable, autorun, computed} from 'mobx';

interface www {
    a:string;
}


class OrderLine {
    @observable price: number = 300;
    @observable amount: number = 2;

    constructor(price: number) {
        this.price = price;
    }

    @computed get total() {
        return this.price * this.amount;
    }

    getTotal() {
        return this.price * this.amount;
    }
}

let line = new OrderLine(301);
let w =observable<www>({a:"111"});


autorun(function () {
    console.log("w", w.a);
});

// autorun(function () {
//     console.log("line", line.price, line.amount, line.total);
// });
//
// autorun(function () {
//     console.log("getTotal", line.getTotal());
// });

export async function test_mobx() {
    try {

    }
    catch (e) {
        console.error(e)
    }
}

(window as any).test_mobx = test_mobx;
(window as any).line = line;
(window as any).w = w;