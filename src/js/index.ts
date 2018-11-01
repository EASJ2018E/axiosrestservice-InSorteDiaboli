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
showAllCustomers();
//let divContent:HTMLDivElement = <HTMLDivElement> document.getElementById("content");
//let divContentOne:HTMLDivElement = <HTMLDivElement> document.getElementById("contentOne");
let tableContentCustomers:HTMLTableElement = <HTMLTableElement> document.getElementById("tableContentCustomers");
    let getAllCustomers:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllCustomers");
    getAllCustomers.addEventListener('click',showAllCustomers);

    let customerAdd:HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
    customerAdd.addEventListener('click', addCustomer);

    let getOneCustomer:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneCustomer");
    getOneCustomer.addEventListener('click', getOneCust);

    //let deleteOneCustomer:HTMLButtonElement = <HTMLButtonElement> document.getElementById("deleteButton");
    //deleteOneCustomer.addEventListener('click', deleteACustomer)

    let updateOneCustomer:HTMLButtonElement = <HTMLButtonElement> document.getElementById("updateButton");
    updateOneCustomer.addEventListener('click', updateACustomer);
    
    function showAllCustomers():void {
        
        axios.get<ICustomer[]>(uri)
        .then(function (response:AxiosResponse<ICustomer[]>):void{
            //let result:string = "";
            response.data.forEach((element)=>{
                if(tableContentCustomers != null)
            {
                const tableTr = document.createElement("tr");
                const custEmpty = document.createElement("td");
                const custId = document.createElement("td");
                const custFirstName = document.createElement("td");
                const custLastName = document.createElement("td");
                const custYear = document.createElement("td");
                const delCust = document.createElement("button");
                delCust.className = "close";
                delCust.appendChild(document.createTextNode("Slet"));
                delCust.addEventListener('click', () => {
                    console.log(element.id);
                    deleteACustomer(element.id);
                });
                custEmpty.appendChild(document.createTextNode(`#`));
                custId.appendChild(document.createTextNode(`${element.id}`));
                custFirstName.appendChild(document.createTextNode(`${element.firstName}`));
                custLastName.appendChild(document.createTextNode(`${element.lastName}`));
                custYear.appendChild(document.createTextNode(`${element.year}`));
                custId.appendChild(delCust);
                custFirstName.appendChild(delCust);
                custLastName.appendChild(delCust);
                custYear.appendChild(delCust);
                tableTr.append(custEmpty ,custId, custFirstName, custLastName, custYear);
                document.getElementById("tableContentCustomers").append(tableTr);
            }
            else {
                tableContentCustomers.innerHTML = "";
                showAllCustomers();
            }
                /*if(customer)
                {

                    //result += 
                    //"<tr><th scope='row'>" + "<td>" + customer.id + " </td>" + 
                    //"<td> " + customer.firstName + " </td>" + 
                    //"<td> " + customer.lastName + " </td>" + 
                    //"<td> " + customer.year.toString() + "</td>" + 
                    //"</tr>"
                }
                else
                {
                    //result += "<td><b> NULL element </b></td>"
                }*/
                
            });
            //result += "</tr>";
            //tableContentCustomers.innerHTML = result;
        }
        )
        .catch(function (error:AxiosError):void{
            tableContentCustomers.innerHTML = error.stack;
        })
    }

    function getOneCust():void {
        let oneCustomer:HTMLInputElement = <HTMLInputElement> document.getElementById("getOneCust");
        let newUri = uri + "/" + oneCustomer.value;

        axios.get<ICustomer>(newUri)
        .then(function (response:AxiosResponse<ICustomer>):void{
            let customer:ICustomer = <ICustomer>response.data;
            let result:string = ""
            if(customer)
            {
                result += "<tr><th scope='row'></th>" + "<td>" + customer.id + " </td>" + 
                    "<td> " + customer.firstName + " </td>" + 
                    "<td> " + customer.lastName + " </td>" + 
                    "<td> " + customer.year.toString() + "</td>" + 
                    "<td>" + "<button class='btnDelUpElement' id='updateButton'>Rediger</button>" + "</td>" + 
                    "<td>" + "<input id='confirmDel' placeholder='Skriv id for at slette'/>" + "<button class='btnDelUpElement' id='deleteButton'>Slet</button>" + "</td>" + 
                    "</tr>"
            }
            else
            {
                result += "<tr><th scope='row'></th><td><b> NULL element </b></td></tr>"
            };

            tableContentCustomers.innerHTML = result;

        })
        .catch(function (error:AxiosError):void{
            //Error viser stack
            //tableContentCustomers.innerHTML = error.stack;
            
        })
    }

    function addCustomer():void {
        
        //const inputId : number = +(document.getElementById("addId") as HTMLInputElement).value;
        const inputFirstName:string =(document.getElementById("addFirstName") as HTMLInputElement).value;
        const inputLastName:string =(document.getElementById("addLastName") as HTMLInputElement).value;
        const inputYear:number = +(document.getElementById("addYear") as HTMLInputElement).value;
        const uri:string = "https://restcustomerservice20181029112537.azurewebsites.net/api/customer/";
        const data = {firstName:inputFirstName, lastName:inputLastName, year:inputYear};
        axios.post(uri,data).then(()=>{
            document.getElementById("tableContentCustomers").innerHTML = "";
            showAllCustomers();
        })
        .catch((error:AxiosError) => {console.log(error);})
        
    }

    /*function deleteACustomer():void {
        let aCustomer:string = (document.getElementById("custIdDelete") as HTMLInputElement).value;
        const anotherUri = uri + "/" + aCustomer;

        axios.delete(anotherUri).then(()=>{
            document.getElementById("tableContentCustomers").innerHTML = "";
            showAllCustomers();
        }
        )}*/

        function deleteACustomer(id:number):void {
            let aCustomer:string = (document.getElementById(id.toString()) as HTMLInputElement).value;
            const anotherUri = uri + "/" + aCustomer;
        
            axios.delete(anotherUri).then(()=>{
                document.getElementById("tableContentCustomers").innerHTML = "";
                showAllCustomers();
            }
        
            )}

    function updateACustomer():void {
        const inputUpId:string = (document.getElementById("updateId") as HTMLInputElement).value;
        const inputUpFirstName:string = (document.getElementById("updateFirstName") as HTMLInputElement).value;
        const inputUpLastName:string = (document.getElementById("updateLastName") as HTMLInputElement).value;
        const inputUpYear:string = (document.getElementById("updateYear") as HTMLInputElement).value;
        const data = {firstName:inputUpFirstName, lastName:inputUpLastName, year:inputUpYear};
        const upUri = uri + "/" + inputUpId;
        axios.put(upUri, data).then(()=>{
            document.getElementById("tableContentCustomers").innerHTML = "";
            showAllCustomers();
        })
    }

