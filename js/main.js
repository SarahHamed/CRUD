var products;
if(localStorage.getItem("productData")==null)
    {
        products=[];
    }
else
    {
        products=JSON.parse(localStorage.getItem("productData")) ;
        displayProduct();
    }
var radioButtons= document.getElementsByName("onsale");
var inputs=document.getElementsByClassName("form-control");


function addProduct()
{
    var name=document.getElementById("productNameInp").value;
    var price=document.getElementById("productPriceInp").value;
    var category=document.getElementById("productCategoryInp").value;
    var description=document.getElementById("productDescInp").value;
    var productSale=false;
    if(radioButtons[0].checked==true)
        {
            productSale=true;
        }
    if(validateForm(name)==true)
        {
            var product=
            {
                prodName:name,
                prodPrice:price,
                prodCateg:category,
                prodDesc:description ,
                Sale:productSale
            }

                 products.push(product);
                 localStorage.setItem("productData",JSON.stringify(products));
                 clearForm();
                 displayProduct();
        }
    else
        {
            window.alert("user name not valid");
        }
    
}

    function clearForm()
    {
        for(let i=0;i<inputs.length;i++)
            {
                inputs[i].value="";
            }
    }

  function displayProduct()
    {
     var temp="";
   for(let i=0;i<products.length;i++)
    {
        temp+=`<div class="col-md-3">
                   <div class="itemProduct py-5 text-center">
                       <img class="img-fluid mb-2" src="images/lab2.jpg">
                       <h4 class="productName" >`+products[i].prodName+`<span class="badge badge-info ml-2">`+products[i].prodCateg+`</span></h4>
                       <h5 class="text-muted">price :`+products[i].prodPrice+`</h5>
                       <p class="discription">`+products[i].prodDesc+`</p>
                       <button onclick="deleteProduct(`+i+`)" class="btn btn-danger btn-sm">Delete</button>
                       <button onclick="updateProduct()" class="btn btn-outline-warning btn-sm">Update</button>`;
        if(products[i].Sale==true)
            {
                temp+=`<div class="sale ">Sale</div>`
            }
                       
        temp+=` </div> </div>`    
    }
        document.getElementById("products").innerHTML=temp;   
        /*document.getElementById("itemProduct").innerHTML=temp;*/

    }

    function searchProducts(term)
    {
        var temp=``;
        for(var i=0;i<products.length;i++)
            {
                if(products[i].prodName.toLocaleLowerCase().includes(term.toLocaleLowerCase()))
                    {
                         temp+=`<div class="col-md-3">
                   <div class="itemProduct py-5 text-center">
                       <img class="img-fluid mb-2" src="images/lab2.jpg">
                       <h4 class="productName" >`+products[i].prodName+`<span class="badge badge-info ml-2">`+products[i].prodCateg+`</span></h4>
                       <h5 class="text-muted">price :`+products[i].prodPrice+`</h5>
                       <p class="discription">`+products[i].prodDesc+`</p>
                       <button class="btn btn-danger btn-sm">Delete</button>`;
        if(products[i].Sale==true)
            {
                temp+=`<div class="sale ">Sale</div>`
            }
                       
        temp+=` </div> </div>`    
    
                    }
                
            }
        document.getElementById("products").innerHTML=temp;  
    }

    function deleteProduct(index)
    {
        var deleted=products.splice(index,1);
        localStorage.setItem("productData",JSON.stringify(products));
        displayProduct();
    }

    function validateForm(userName)
    {
        var userNmaeRegex=/^[A-Z][a-z]{3,30}/;
        if(userNmaeRegex.test(userName)==false)
            return false;
        else
            return true;
    }