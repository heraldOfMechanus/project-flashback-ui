

import {getAllTriviaCardSets} from "../remote/trivia-card-set-service";
import { makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import {render} from "@testing-library/react";
import TriviaCardSet from "./TriviaCardSet";
import { Principal } from "../dtos/Principal";
import { AddTriviaCardSetRequest } from "../dtos/add-trivia-card-set-request";
import AddTriviaCardSetComponent from "./AddTriviaCardSetComponent";


interface ITriviaPageProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

function TriviaPage( props: ITriviaPageProps) {

    let [triviaCardSetList, setTriviaCardSetList] = useState([]);

    let role;
    let isAdmin;
    //check to see if a user is logged in. if not, role and isAdmin remain undefined (i.e., falsy)
    if(props.currentUser){
        //set role variable = to the role of the user ("admin" or "user")
        role = props.currentUser.role;
        //if role is admin, set isAdmin to true, otherwise set to false
        if(role === "admin"){
            isAdmin = true;
        } else {
            isAdmin = false;
        }
    }

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
            width: "50%",
            backgroundColor: "lightblue",
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
    });

    useEffect(() => {
        let displayTriviaCardSets = async () => {
            try {
                triviaCardSetList = await getAllTriviaCardSets();
                for (let item in triviaCardSetList){
                    render(
                        <div>
                           <TriviaCardSet item={triviaCardSetList[item]} user={props.currentUser} />
                        </div>
                    )
                    // setTriviaCardSetList(triviaCardSetList);
                }
            } catch (e: any) {
                console.log(e.message);
            }
            
        }
        displayTriviaCardSets();
    });

    const classes = useStyles();

    return (
        <> 
            {isAdmin
            ?
                <button onClick={AddTriviaCardSetComponent}>Hello there!</button>
            :
                <div />
            }
            <div className={classes.root} >
                {triviaCardSetList}
            </div>
        </>
    )

}

export default TriviaPage;