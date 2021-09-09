import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";

interface ITriviaPageProps {

}

function TriviaPage(props: ITriviaPageProps) {

    let triviaCardSetList: Array<string> | undefined;


    async function getTriviaCardSets() {
        try{

            console.log("I am getting all of trivia card sets");
            let resp = await getAllTriviaCardSets();
            triviaCardSetList = JSON.parse(JSON.stringify(resp.data));
            
            
            if(triviaCardSetList){
                for(let i = 0; i < triviaCardSetList.length; i++){
                    console.log(triviaCardSetList[i]);
                }
            } else {
                console.log("nothing happened.")
            }

        } catch (e: any) {
            console.log(e.message);
        }
    }

  
    return(
        <>
            {/* HOW to do this on load, not onclick */}
            <button id="button-1" onClick={getTriviaCardSets}>GET TRIVIA CARD SETS!!!!!!!</button>


            {
                triviaCardSetList
                ?
                    <h1> truthy </h1>
                :
                    <h1> falsy </h1>
            }
        </>
    )


}

export default TriviaPage;