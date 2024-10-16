const buyTicketsBtn = document.getElementById('buy-tickets-btn');
const selectedSeats = document.getElementById('selected-seats');
const perSeatFare = 550;
let totalPriceInt = 0;
let grandTotalInt = 0;
let couponDiscount = 0;
let seatCount = 0;
let isCouponApplied = false;

buyTicketsBtn.addEventListener('click' , ()=>{
    window.scrollTo({
        top : 2000,
        behavior : 'smooth'
    })
})

const seatPlan = document.getElementById('seat-plan');

let seatVar = 'K';






for(let i=65 ; i<=74 ; i++){
    seatVar = String.fromCharCode(i);
    let newSeatRow = document.createElement('div');
    newSeatRow.innerHTML = `<div id="row" class="flex items-center justify-between mb-7">
                            <p id="row-name" class="me-5 text-[20px]">`+seatVar+`</p>
                            <button id="`+seatVar+`1" class="btn w-[110px] h-[56px] bg-gray-100 text-gray-500 text-[20px] rounded-xl ">`+seatVar+`1</button>
                            <button id="`+seatVar+`2" class="btn w-[110px] h-[56px] bg-gray-100 text-gray-500 text-[20px] rounded-xl me-6">`+seatVar+`2</button>
                            <button id="`+seatVar+`3" class="btn w-[110px] h-[56px] bg-gray-100 text-gray-500 text-[20px] rounded-xl ">`+seatVar+`3</button>
                            <button id="`+seatVar+`4" class="btn w-[110px] h-[56px] bg-gray-100 text-gray-500 text-[20px] rounded-xl ">`+seatVar+`4</button>

                        </div>`

    seatPlan.appendChild(newSeatRow);

}

for(let i=65 ; i<=74 ; i++){
    seatVar = String.fromCharCode(i);

    for(let j=1 ; j<=4 ; j++){

        
        document.getElementById(seatVar+j).addEventListener('click' , function(){

            if(seatCount==4){
                document.getElementById('max-seat-warning').classList.remove('invisible');
                document.getElementById('max-seat-warning').classList.add('flex');
            }
        
            
            if(this.classList.contains('bg-gray-100') && seatCount < 4){
                this.classList.remove('bg-gray-100', 'text-gray-500');
                this.classList.add('bg-[#1dd100]', 'text-white', 'hover:bg-green-400');
                seatCount++;
                totalPriceInt+=550;
                addSelectedSeat(this);
            }else if(this.classList.contains('bg-[#1dd100]')){
                this.classList.remove('bg-[#1dd100]', 'text-white', 'hover:bg-green-400');
                this.classList.add('bg-gray-100', 'text-gray-500');
                seatCount--;
                totalPriceInt-=550;
                removeSelectedSeat(this);
            }

            if(seatCount<4){
                
                document.getElementById('max-seat-warning').classList.remove('flex');
                document.getElementById('max-seat-warning').classList.add('invisible');
            }

            document.getElementById('number-of-seats').innerText = seatCount;

            updateTotalPrice();
            updateGrandTotal();
            showNext();
            
        });
    }
    

}

let seatPay;

function addSelectedSeat(element){

    seatPay = document.createElement('div');
    seatPay.innerHTML = `<div id="selected`+element.id+`" class="flex justify-between mt-5 ">
                            <p >`+element.id+`</p>
                            <p id="seat-class" class="ms-[10px]">Economy</p>
                            <p id="seat-price">550</p>
                        </div>`

    selectedSeats.appendChild(seatPay);

}

function removeSelectedSeat(element){

    let seatToBeRemoved = document.getElementById('selected'+element.id);
    seatToBeRemoved.remove();
    
}

function updateTotalPrice(){
    document.getElementById('total-price').innerText = totalPriceInt;
}

function updateGrandTotal(){
    if(seatCount>0){
        grandTotalInt = totalPriceInt - couponDiscount;
        document.getElementById('grand-total').innerText = grandTotalInt;

    }else{
    
        document.getElementById('grand-total').innerText = '0';
    }
}

document.getElementById('coupon-submit-btn').addEventListener('click' ,function (){


        if(seatCount > 0){
            let couponText = document.getElementById('coupon-input').value;
            if(couponText.toLowerCase() === 'new15'){
                couponDiscount = totalPriceInt*15/100;
            }else if(couponText.toLowerCase() === 'couple20'){
                couponDiscount = totalPriceInt*20/100;
            }
            isCouponApplied = true;
            updateGrandTotal();

            if(document.getElementById('coupon-submit-btn-prev').classList.contains('hidden')){
                document.getElementById('coupon-submit-btn-prev').classList.remove('hidden');
            }
            if(!document.getElementById('coupon-submit-btn').classList.contains('hidden')){
                
                document.getElementById('coupon-submit-btn').classList.add('hidden');
            }
        }
   
})

document.getElementById('coupon-input').addEventListener('keyup' , function(){
    let couponText = document.getElementById('coupon-input').value;
    if(couponText.toLowerCase() === 'new15' && !isCouponApplied){
        document.getElementById('coupon-submit-btn-prev').classList.add('hidden');
        document.getElementById('coupon-submit-btn').classList.remove('hidden');
    }else if(couponText.toLowerCase() === 'couple20' && !isCouponApplied){
        document.getElementById('coupon-submit-btn-prev').classList.add('hidden');
        document.getElementById('coupon-submit-btn').classList.remove('hidden');
    }else{
        if(document.getElementById('coupon-submit-btn-prev').classList.contains('hidden')){
            document.getElementById('coupon-submit-btn-prev').classList.remove('hidden');
        }
        if(!document.getElementById('coupon-submit-btn').classList.contains('hidden')){
            
            document.getElementById('coupon-submit-btn').classList.add('hidden');
        }
    }

    console.log(couponText)
})

const username = document.getElementById('name');
const phone = document.getElementById('phone');
const next = document.getElementById('next-btn');
const nextPrev = document.getElementById('next-btn-prev');

username.addEventListener('keyup', showNext);
phone.addEventListener('keyup', showNext);

function showNext(){
    if(username.value != '' && phone.value !='' && seatCount > 0){
        if(!nextPrev.classList.contains('hidden')){
            nextPrev.classList.add('hidden');
        }
        if(next.classList.contains('hidden')){
            next.classList.remove('hidden');
        }

    }else{

        if(!next.classList.contains('hidden')){
            next.classList.add('hidden');
        }
        if(nextPrev.classList.contains('hidden')){
            nextPrev.classList.remove('hidden');
        }
    }
}


