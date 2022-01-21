class Product {
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}

class UI {
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class='card text-center mb-4'>
                <div class='card-body'>
                    <strong>Producto</strong>: ${product.name}
                    <strong>Precio</strong>: ${product.price}
                    <a href='#' class='btn btn-danger' name='delete'>Borrar</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset()
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado', 'info')
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        // MOSTRANDO EN EL DOM
        const container=document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div,app);
        setTimeout(function(){
            document.querySelector('.alert').remove()
        }, 2000);
    }
}

// DOM Events
document.getElementById('product-form')
    .addEventListener('submit', function(e){
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;

    const product = new Product(name, price);

    const ui = new UI();
    if(name === '' || price === ''){
        return ui.showMessage('Complete los campos','danger')
    }
    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage('Producto agregado', 'success')

    e.preventDefault();

});

document.getElementById('product-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteProduct(e.target);
})