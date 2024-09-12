export default function LandingPage() {
    const img = "https://media.istockphoto.com/id/1190330112/photo/fried-pork-and-vegetables-on-white-background.jpg?s=612x612&w=0&k=20&c=TzvLLGGvPAmxhKJ6fz91UGek-zLNNCh4iq7MVWLnFwo="
    const img2 = "https://st2.depositphotos.com/1326558/7226/i/450/depositphotos_72263189-stock-photo-penne-pasta-in-tomato-sauce.jpg"
    const img3 = "https://slurrp.club/wp-content/uploads/2021/10/DSC_0037-2.jpg"

    return (
        <div
            className="flex items-center min-h-full bg-cover bg-center "
            // style={{ backgroundImage: `url('https://your-background-image-url.com')` }} // replace with your actual background image URL
        >
            <div className="flex justifyContent center w-full  h-full md:w-3/4 lg:w-full h-[600px] p-20 bg-gray-900  shadow-lg text-slate-100">
                <div className="flex-1">
                    <h1 className="text-6xl font-bold mt-10 mb-6 text-customGold">
                        Welcome to Recipe World
                    </h1>
                    <p className="text-xl mb-8">
                        Discover and share amazing recipes from around the world. Whether you're a beginner or a master chef, you'll find something delicious to try.
                    </p>
                    <button className="bg-customGold text-gray-300 hover:bg-yellow-500 hover:text-gray-900 font-semibold py-2 px-4 rounded transition-colors duration-300">
                        Get Started
                    </button>
                </div>

                <div className="relative flex flex-col items-center mt-10 ml-20 justify-center w-2/5 p-10">
                    <img
                        src={img3}
                        alt="Delicious Dish 1"
                        className="absolute w-60 h-60 object-cover rounded-full shadow-md"
                        style={{ top: '0', left: '0' }}
                    />
                    <img
                        src={img}
                        alt="Delicious Dish 2"
                        className="absolute w-60 h-60 object-cover rounded-full shadow-md"
                        style={{ top: '90px', left: '90px' }} 
                    />
                </div>
            </div>
        </div>
    );
}
