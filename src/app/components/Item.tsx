import Link from 'next/link';
import Image from 'next/image';
export default function Item({product}){
    return (
        <li className="p-5 bg-slate-200 list-none" key={product.id}>
            <Link href={product.id}>
            <Image
                src={product.imgUrl}
                width={300}
                height={400}
                alt={`Picture of the author${product.item}`}
            />
            <h1 className="text-2xl font-bold">{product.item}</h1>
            <p>{product.seller}</p>
            <p>${product.price}</p>
            </Link>
        </li>
    )
}