import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, Dispatch, SetStateAction } from "react";

const OrderChevrons: React.FC<{
  name: string;
  current: string;
  setOrder: Dispatch<SetStateAction<string>>;
}> = ({  name, current, setOrder }) => {
  const up = `${name}.asc`;
  const down = `${name}.desc`;
  return (
    <div className="inline-block align-middle">
      <button className={(current === down ? "bg-pink-500" : "") + ' rounded-sm'}>
        <ChevronDown
          onClick={(e) => {
            setOrder(down);
          }}
        />
      </button>
      <button className={(current === up ? "bg-pink-500" : "") + ' rounded-sm'}>
        <ChevronUp
          onClick={(e) => {
            setOrder(up);
          }}
        />
      </button>
    </div>
  );
};

export const ProductsTable: React.FC<{
  products: Array<any>;
  currentOrder: string;
  setOrder: Dispatch<SetStateAction<string>>;
}> = ({ products, currentOrder, setOrder }) => {

  return (
    <table className="border-b divide-table-line md:table-fixed min-w-full divide-y divide-table-line ">
      <thead>
        <tr>
          <th className="px-6 text-start text-xs font-medium text-muted-foreground-1 uppercase">
            Name
            <OrderChevrons
              name="name"
              current={currentOrder}
              setOrder={setOrder}
            />
          </th>
          <th className="px-6 text-start text-xs font-medium text-muted-foreground-1 uppercase">
            Price
            <OrderChevrons
              name="price"
              current={currentOrder}
              setOrder={setOrder}
            />
          </th>
          <th className="px-6 text-start text-xs font-medium text-muted-foreground-1 uppercase">
            Stock
            <OrderChevrons
              name="stock_quantity"
              current={currentOrder}
              setOrder={setOrder}
            />
          </th>
          <th className="px-6 text-start text-xs font-medium text-muted-foreground-1 uppercase">
            Category
            <OrderChevrons
              name="category"
              current={currentOrder}
              setOrder={setOrder}
            />
          </th>
          <th className="px-6 text-start text-xs font-medium text-muted-foreground-1 uppercase">
            Created
            <OrderChevrons
              name="created_athjsdhjksdfjkh"
              current={currentOrder}
              setOrder={setOrder}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="hover:bg-gray-200" >
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-foreground">
              {product.name.toLowerCase()}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-foreground">
              {product.price}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-foreground">
              {product.stock_quantity}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-foreground">
              {product.category.toLowerCase()}
            </td>
            <td className="px-6 py-2 whitespace-nowrap text-sm font-medium text-foreground">
              {product.created_at.split('T')[0]}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};


export const ProductsCards: React.FC<{
  products: Array<any>;
  currentOrder: string;
  setOrder: Dispatch<SetStateAction<string>>;
}> = ({ products, currentOrder, setOrder }) => {

  return (
                <div className='text-gray-900 grid grid-cols-2 gap-4'>
                    {products.map(product => (
                        <div key={product._id}
                                  
                        className="h-60 p-4 bg-white  hover:bg-gray-200 rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
                            <div className="flex justify-between items-start">
                                <div className='min-w-0 mt-12'>
                                    <div className='text-sm font-medium text-gray-900 dark:text-white truncate'>
                                        {product.name}
                                    </div>
                                                                        <div className='text-sm font-medium text-gray-900 dark:text-white truncate mt-8'>
                                        {product.price + `${' €'}`}
                                    </div>
                                </div>
                                <div

                                    aria-label={`More options for ${product.name}`}
                                    className="absolute top-3 right-3 ml-2 text-gray-400 hover:text-gray-700 rounded-full focus:outline-none"
                                >
                                    {product.created_at.split('T')[0]}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>  
  );
};


