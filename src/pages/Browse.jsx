import Nav from "../components/Nav"
import Footer from "../components/Footer/Footer"
import RecommendCard from "../components/Card-Home/RecommendCard"
import MostPopularCard from "../components/Card-Home/MostPopularCard"

export default function Browse() {
    return (
        <div>    
            <Nav />
            <div>
            <h1 className="font-bold text-[28px] bg-neutral-900 text-white pl-[140px]">Recommend</h1>
            <RecommendCard style={{ img: { width: "10px" }}} />
            </div>
            <div>
            <h1 className="font-bold text-[28px] bg-neutral-900 text-white pl-[140px]">Most Popular</h1>
            <MostPopularCard />
            </div>
            <Footer />
        </div>
    )
}
