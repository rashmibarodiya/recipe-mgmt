export default function LandingPage() {
    const img = "https://media.istockphoto.com/id/1190330112/photo/fried-pork-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=TzvLLGGvPAmxhKJ6fz91UGek-zLNNCh4iq7MVWLnFwo="
    const img2 = "https://st2.depositphotos.com/1326558/7226/i/450/depositphotos_72263189-stock-photo-penne-pasta-in-tomato-sauce.jpg"
    const img3 = "https://slurrp.club/wp-content/uploads/2021/10/DSC_0037-2.jpg"

    return (
        <div
            className="flex items-center min-h-screen bg-cover bg-center p-20"
            // style={{ backgroundImage: `url('https://your-background-image-url.com')` }} // replace with your actual background image URL
        >
            <div className="flex w-full md:w-3/4 lg:w-1/2 h-[500px] p-8 bg-gray-900 rounded-xl shadow-lg text-slate-100">
                <div className="flex-1">
                    <h1 className="text-4xl font-bold mt-10 mb-6 text-customGold">
                        Welcome to Recipe World
                    </h1>
                    <p className="text-lg mb-6">
                        Discover and share amazing recipes from around the world. Whether you're a beginner or a master chef, you'll find something delicious to try.
                    </p>
                    <button className="bg-customGold text-gray-300 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-300">
                        Get Started
                    </button>
                </div>

                <div className="relative flex flex-col items-center mt-10 justify-center w-2/5 p-10">
                    <img
                        src={img3}
                        alt="Delicious Dish 1"
                        className="absolute w-40 h-40 object-cover rounded-full shadow-md"
                        style={{ top: '0', left: '0' }}
                    />
                    <img
                        src={img}
                        alt="Delicious Dish 2"
                        className="absolute w-40 h-40 object-cover rounded-full shadow-md"
                        style={{ top: '70px', left: '80px' }} 
                    />
                </div>
            </div>
        </div>
    );
}
