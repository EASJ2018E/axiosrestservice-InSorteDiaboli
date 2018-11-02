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

    let tableContentCustomers:HTMLTableElement = <HTMLTableElement> document.getElementById("tableContentCustomers");
    let getAllCustomers:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getAllCustomers");
    //ERRORMESSAGE ADD
    let errorMsg:HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("errormessage");

    //ERRORMESSAGE UPDATE
    let errorMsgUp:HTMLParagraphElement = <HTMLParagraphElement> document.getElementById("errormessageup");

    //HVIS CUSTOMERTABELLEN ER TOM SÅ SKAL METODEN KØRES, SÅ DEN IKKE DUPLIKERER DATA
    if(tableContentCustomers.innerHTML == null)
    {
        showAllCustomers();
    }
    else
    {
        tableContentCustomers.innerHTML = "";
        showAllCustomers();
    }
    getAllCustomers.addEventListener('click',showAllCustomers);

    let customerAdd:HTMLButtonElement = <HTMLButtonElement> document.getElementById("addButton");
    customerAdd.addEventListener('click', addCustomer);

    let getOneCustomer:HTMLButtonElement = <HTMLButtonElement> document.getElementById("getOneCustomer");
    getOneCustomer.addEventListener('click', getOneCust);

    let updateOneCustomer:HTMLButtonElement = <HTMLButtonElement> document.getElementById("updateButton");
    updateOneCustomer.addEventListener('click', updateACustomer);
    
    //ADDBOKS DISPLAYING
    let displayAddCustomerBox:HTMLDivElement = <HTMLDivElement> document.getElementById("addCustomerBox");
    displayAddCustomerBox.style.display = "none";

    let addCustomerBox:HTMLButtonElement = <HTMLButtonElement> document.getElementById("showAddCustomerBox");
    addCustomerBox.addEventListener('click', displayCustomerBox);

    function displayCustomerBox():void {
        displayAddCustomerBox.style.display="block";
    }

    //UPDATEBOKS DISPLAYING
    let displayCustomerBoxUp:HTMLDivElement = <HTMLDivElement> document.getElementById("addCustomerBoxUp");
    displayCustomerBoxUp.style.display = "none";

    function showAllCustomers():void {
        
        axios.get<ICustomer[]>(uri)
        .then(function (response:AxiosResponse<ICustomer[]>):void{
            tableContentCustomers.innerHTML = "";
            response.data.forEach((element)=>{
                //OPRETTER ALLE ELEMENTER
                const tableTr = document.createElement("tr");
                const custEmpty = document.createElement("td");
                const custId = document.createElement("td");
                let custFirstName = document.createElement("td");
                const custLastName = document.createElement("td");
                const custYear = document.createElement("td");
                const btnTd = document.createElement("td");
                //UPDATE CUSTOMER BTN
                const upCust = document.createElement("button");
                upCust.className = "leftmargin btn btn-outline-warning";
                upCust.appendChild(document.createTextNode("Rediger"));
                upCust.addEventListener('click', () => {
                    displayCustomerBoxUp.style.display="block";
                })
                //DELETE CUSTOMER BTN
                const delCust = document.createElement("button");
                delCust.className = "leftmargin btn btn-outline-danger";
                delCust.appendChild(document.createTextNode("Slet"));
                delCust.addEventListener('click', () => {
                    deleteACustomer(element.id);
                });
                //TILFØJER ALLE ELEMENTER TIL PARENTS
                custEmpty.appendChild(document.createTextNode(`#`));
                custId.appendChild(document.createTextNode(`${element.id}`));
                custFirstName.appendChild(document.createTextNode(`${element.firstName}`));
                custLastName.appendChild(document.createTextNode(`${element.lastName}`));
                custYear.appendChild(document.createTextNode(`${element.year}`));
                //TILFØJER DATA TIL GUI
                tableTr.append(custEmpty ,custId, custFirstName, custLastName, custYear, btnTd);
                //TILFØJER KNAPPER TIL GUI
                btnTd.append(upCust, delCust);
                document.getElementById("tableContentCustomers").append(tableTr);
            });
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
            //OPRETTER ALLE ELEMENTER
            const tableTr = document.createElement("tr");
            const custEmpty = document.createElement("td");
            const custId = document.createElement("td");
            const custFirstName = document.createElement("td");
            const custLastName = document.createElement("td");
            const custYear = document.createElement("td");
            const btnTd = document.createElement("td");
            //UPDATE CUSTOMER BTN
            const upCust = document.createElement("button");
            upCust.className = "leftmargin btn btn-outline-warning";
            upCust.appendChild(document.createTextNode("Rediger"));
            upCust.addEventListener('click', () => {
                displayCustomerBoxUp.style.display="block";
            })
            //DELETE CUSTOMER BTN
            const delCust = document.createElement("button");
            delCust.className = "leftmargin btn btn-outline-danger";
            delCust.appendChild(document.createTextNode("Slet"));
            delCust.addEventListener('click', () => {
                deleteACustomer(customer.id);
            });
            //TILFØJER ALLE ELEMENTER TIL PARENTS
            custEmpty.appendChild(document.createTextNode(`#`));
            custId.appendChild(document.createTextNode(`${customer.id}`));
            custFirstName.appendChild(document.createTextNode(`${customer.firstName}`));
            custLastName.appendChild(document.createTextNode(`${customer.lastName}`));
            custYear.appendChild(document.createTextNode(`${customer.year}`));
            //TILFØJER DATA TIL GUI
            tableTr.append(custEmpty ,custId, custFirstName, custLastName, custYear, btnTd);
            //TILFØJER KNAPPER TIL GUI
            btnTd.append(upCust, delCust);
            tableContentCustomers.innerHTML = "";
            document.getElementById("tableContentCustomers").append(tableTr);
        })
        .catch(function (error:AxiosError):void{
            //Error viser stack
            tableContentCustomers.innerHTML = error.stack;
        })
    }

    function addCustomer():void {
        const inputFirstName:string =(document.getElementById("addFirstName") as HTMLInputElement).value;
        const inputLastName:string =(document.getElementById("addLastName") as HTMLInputElement).value;
        const inputYear:number = +(document.getElementById("addYear") as HTMLInputElement).value;
        const uri:string = "https://restcustomerservice20181029112537.azurewebsites.net/api/customer/";
        const data = {firstName:inputFirstName, lastName:inputLastName, year:inputYear};
        if(inputFirstName == "" || inputLastName == "" || inputYear == null)
        {
            errorMsg.innerHTML = "Du skal udfylde alle felter for at tilføje en kunde";
        }
        else
        {
        axios.post(uri,data).then(()=>{
            document.getElementById("tableContentCustomers").innerHTML = "";
            displayAddCustomerBox.style.display = "none";
            showAllCustomers();
        })
        .catch((error:AxiosError) => {console.log(error);})
    }
    }

        function deleteACustomer(id:number):void {
            const anotherUri = uri + "/" + id;
        
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
        if(inputUpId == null || inputUpFirstName == "" || inputUpLastName == "" || inputUpYear == null)
        {
            errorMsgUp.innerHTML = "Du skal udfylde alle felter for at opdatere en kunde";
        }
        else
        {
        axios.put(upUri, data).then(()=>{
            document.getElementById("tableContentCustomers").innerHTML = "";
            displayCustomerBoxUp.style.display = "none";
            showAllCustomers();
        })
    }
    }

