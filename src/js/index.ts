import axios, {
    AxiosResponse, 
    AxiosError} from "../../node_modules/axios/index";


interface ICustomer {
    id:number
    firstName:string
    lastName:string
    year:number
}

let uri:string = "https://restcustomerservice20181029112537.azurewebsites.net/api/customer";

//let uri:string = "https://localhost:44336/api/customer";

let divContent:HTMLDivElement = <HTMLDivElement> document.getElementById("content");
let divContentOne:HTMLDivElement = <HTMLDivElement> document.getElementById("contentOne");
    let getAllCustomers:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllCustomers");
    getAllCustomers.addEventListener('click',showAllCustomers);

    let customerAdd:HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
    customerAdd.addEventListener('click', addCustomer);

    let getOneCustomer:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneCustomer");
    getOneCustomer.addEventListener('click', getOneCust);

    function showAllCustomers():void {
        
        axios.get<ICustomer[]>(uri)
        .then(function (response:AxiosResponse<ICustomer[]>):void{
            let result:string = "<ol>";
            response.data.forEach((customer:ICustomer)=>{
                if(customer)
                {
                    result += "<li>" + "Id: " + customer.id + " Fornavn: " + customer.firstName + " Efternavn: " + customer.lastName + " År: " + customer.year.toString()
                }
                else
                {
                    result += "<li><b> NULL element </b></li>"
                }
                
            });
            result += "</ol>";
            divContent.innerHTML = result;
        }
        )
        .catch(function (error:AxiosError):void{
                divContent.innerHTML = error.stack;
        })
    }

    function getOneCust():void {
        let oneCustomer:HTMLInputElement = <HTMLInputElement> document.getElementById("getOneCust");
        let newUri = uri + "/" + oneCustomer.value;

        axios.get<ICustomer>(newUri)
        .then(function (response:AxiosResponse<ICustomer>):void{
            let customer:ICustomer = <ICustomer>response.data;
            let result:string = "<ol>"
            if(customer)
            {
                result += "<li>" + "Id: " + customer.id + " Fornavn: " + customer.firstName + " Efternavn: " + customer.lastName + " År: " + customer.year.toString()
            }
            else
            {
                result += "<li><b> NULL element </b></li>"
            };
            result += "</ol>";

            divContentOne.innerHTML = result;

        })
        .catch(function (error:AxiosError):void{
            //Error viser stack
                divContentOne.innerHTML = error.stack;
            
        })
    }

    function addCustomer():void {
        
        let inputFirstName:HTMLInputElement =<HTMLInputElement> document.getElementById("addFirstName");
        let inputLastName:HTMLInputElement =<HTMLInputElement> document.getElementById("addLastName");
        let inputYear:HTMLInputElement = <HTMLInputElement> document.getElementById("addYear");

        let custFirstName:string = inputFirstName.value;
        let custLastName:string = inputLastName.value;
        let custYear:number = +inputYear.value;
        let custId:number;

        axios.post<ICustomer>(uri,{id:custId++, firstName:custFirstName, lastName:custLastName, year:custYear})
        .then((response:AxiosResponse) => {console.log("response " + response.status + " " + response.statusText)})
        .catch((error:AxiosError) => {console.log(error);})
        
        showAllCustomers();
    }