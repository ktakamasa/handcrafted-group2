import Item from '../components/Item'
export default function ProductList({products}){
    return (
        <div>
            <ul className='grid grid-cols-3 gap-4'>
            {
                
                products.map(product => 
                    <Item key={product.id} product={product}/>
                    )
                
            }
            </ul>
        </div>
    );
}