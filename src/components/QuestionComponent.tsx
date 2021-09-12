import {TriviaSet} from "../dtos/TriviaSet";
import {Principal} from "../dtos/Principal";
import {Checkbox} from "@material-ui/core";


interface ITriviaCard {
    triviaCardSets: TriviaSet | undefined;
    setTriviaCardSets: (nextTriviaCardSet: TriviaSet) => void;
    user: Principal|undefined;
}


function QuestionComponent(props: ITriviaCard){




    return(
        <>


            <h1>Question component</h1>
            <div>
            <Checkbox
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
                placeholder={"A"}
            />
            <Checkbox
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
            />
            <Checkbox
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
            />
            <Checkbox
                value="checkedA"
                inputProps={{ 'aria-label': 'Checkbox A' }}
            />
        </div>
        </>
    )
}
export default QuestionComponent;