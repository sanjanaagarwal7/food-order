import useHttp from "../http/useHttp";
import MealItem from "./MealItem";
import Error from "./Error";
const requestConfig={}

function Meals(){
    const {data:loadedMeals,error,isLoading} = useHttp("http://localhost:3000/meals",requestConfig,[]);
    if(isLoading){
       return( <p className="center">fetching data ....</p>)
    }
    if(error){
        return(
            <Error title="Failed to fetch meals" message={error} />
        )
    }
      return(
    <ul id="meals">{loadedMeals.map((item)=>(
        <MealItem key={item.id} meal={item} />
    ))}</ul>
)
}

export default Meals

