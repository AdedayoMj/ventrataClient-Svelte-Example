
<script lang="ts">
import type { Booking } from 'src/types';
import LayoutGrid, {Cell as LayCell} from '@smui/layout-grid';
import Button, { Label } from '@smui/button';
import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';



export let booking: Booking;

export let toggleModal = () => {}
export let toggleSuccess=()=>{}


function confirmPage(){
    toggleModal()
    toggleSuccess()
}
const total=()=>{
    let each:any=[]
   booking.unitItems.forEach((c:any)=>{
          let total=  c.quantity * c.price
            each.push(total)
            
        }
    )

    return each.reduce((a:number,b:number)=>a+b, 0)

}
$:console.log(total());

</script>

<div>
 
        <div class="title">{booking.optionId}</div>
     
        <div>Full Name : {booking.contact.fullName? booking.contact.fullName : null}</div>
        <div>Email Address: {booking.contact.emailAddress? booking.contact.emailAddress: null}</div>
        <div>Phone Number : {booking.contact.phoneNumber? booking.contact.phoneNumber: null}</div>
  
        <DataTable table$aria-label="People list" style="max-width: 100%;">
            <Head>
              <Row>
                <Cell style="width: 30%;" >Gender</Cell>
                <Cell style="width: 28%;" numeric>Number of People</Cell>
                <Cell style="width: 35%;" numeric>Price Per Person</Cell>
                <Cell style="width: 35%;" numeric>Total</Cell>
              </Row>
            </Head>
            <Body>
               
             
             
        {#each booking.unitItems as unit }
        <Row>
            <Cell style="text-transform: capitalize;" >{unit.unitId}</Cell>
            <Cell >{unit.quantity}</Cell>
            <Cell >{unit.price}</Cell>
            <Cell >{unit.price * unit.quantity}</Cell>
          </Row>
       
        {/each}
    </Body>
    </DataTable>
    <LayoutGrid>
        <LayCell span={12} >
            <div class="total">Total: <span>{total()}</span></div>
          
        </LayCell>
        
    </LayoutGrid>
        <LayoutGrid>
            <LayCell span={6}>
                <Button on:click={toggleModal} variant="outlined" color="secondary" >
                   <Label >Cancel</Label>
                </Button>
              
            </LayCell>
            <LayCell span={6}>
                <Button on:click={confirmPage}  variant="unelevated">
                    <Label >Confirm</Label>
                </Button>
            </LayCell>
        </LayoutGrid>

</div>

<style>
div{
    color:black
}

.title{
    font-size: 25px;
    font-weight: 600;
    margin-bottom: 1rem;
}
.total{
    text-align:end;
    font-weight: 800;
    font-size: 20px;

}
.total span{
    font-weight: 400;
    font-size: 19px;
    margin-left: 1rem;
    margin-right: 3rem;
}
</style>