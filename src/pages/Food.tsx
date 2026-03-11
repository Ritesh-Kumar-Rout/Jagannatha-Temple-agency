import React from 'react';
import Layout from '@/components/Layout';

interface Sweet {
    name: string;
    description: string;
    imageUrl: string;
}

const sweets: Sweet[] = [
    {
        name: 'Khaja',
        description: 'A crispy, layered sweet made from refined flour and sugar syrup, traditionally offered as Sukhila Prasad in the Jagannath Temple.',
        imageUrl: 'food/Puri Khajja.jpeg',
    },
    {
        name: 'Chhena Poda',
        description: "Known as the burnt cheese dessert, it's made from caramelized cottage cheese, sugar, and nuts, baked to perfection.",
        imageUrl: 'food/chenna-poda.jpg',
    },
    {
        name: 'Rasabali',
        description: 'Deep-fried flattened chhena patties soaked in thickened, sweetened milk, flavored with cardamom.',
        imageUrl: 'food/rasabali.jpg',
    },
    {
        name: 'Chhena Gaja',
        description: 'Fried cubes of chhena soaked in sugar syrup, offering a chewy texture and rich taste.',
        imageUrl: 'food/chhena gaja.jpg',
    },
    {
        name: 'Chhena Jhili',
        description: 'Originating from Nimapada, these are deep-fried chhena balls soaked in sugar syrup, similar to gulab jamun.',
        imageUrl: 'food/chhena jhilli.jpg',
    },
    {
        name: 'Rasagola',
        description: 'Soft, spongy balls made from chhena, cooked in light sugar syrup; a traditional offering in the Jagannath Temple.',
        imageUrl: 'food/rasagola.jpg',
    },
    {
        name: 'Malpua',
        description: 'A sweet pancake made from flour, milk, and mashed bananas, deep-fried and soaked in sugar syrup.',
        imageUrl: 'food/malapua.jpg',
    },
    {
        name: 'Kheeri',
        description: 'A rice pudding flavored with cardamom and garnished with dry fruits, commonly prepared during festivals.',
        imageUrl: 'food/khiri.jpg',
    },
    {
        name: 'Korakhai',
        description: 'A crunchy sweet made from caramelized lia (puffed rice), traditionally prepared in Bhubaneswar.',
        imageUrl: 'food/korakhai.jpg_large',
    },
    {
        name: 'Sarapuli',
        description: "A rare and ancient temple sweet made from thickened milk, offered as a divine delicacy to Lord Jagannath.",
        imageUrl: 'food/sarapuli.jpg',
    },
    {
        name: 'Maysor pak',
        description: "A rich, ghee-laden sweet made from gram flour and sugar, known for its melt-in-the-mouth texture and deep flavor.",
        imageUrl: 'food/maysor pak.jpg',
    }
];

const SweetList: React.FC = () => {
    return (
        <Layout>
        <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-5xl font-extrabold text-center text-rose-700 mb-6 tracking-tight drop-shadow-md">🍬 Famous Sweets of Puri, Odisha 🍭</h1>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 mb-12">
                    <img
                        src="food/puri temple.jpg"
                        alt="Puri Jagannath Temple"
                        className="rounded-3xl w-full lg:w-1/2 h-[350px] object-cover shadow-xl"
                    />
                    <img
                        src="food/mahaprasada.webp"
                        alt="Mahaprasad"
                        className="rounded-3xl w-full lg:w-1/2 h-[350px] object-cover shadow-xl"
                    />
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {sweets.map((sweet, index) => (
                        <div key={index} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                            <img src={sweet.imageUrl} alt={sweet.name} className="rounded-t-3xl w-full h-60 object-cover" />
                            <div className="p-6">
                                <h2 className="text-2xl font-semibold text-rose-600 mb-2">{sweet.name}</h2>
                                <p className="text-gray-700 text-sm leading-relaxed">{sweet.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default SweetList;