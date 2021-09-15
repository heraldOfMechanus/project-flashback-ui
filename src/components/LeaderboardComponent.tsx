import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import {Principal} from "../dtos/Principal";
import {getAllUsers} from "../remote/user-service";




interface ILeaderbooard {

}

function LeaderboardComponent(props: ILeaderbooard){

    let [users, setUsers] = useState([] as Principal[])



    const useStyles = makeStyles({
        table: {
            width: "max",
            border: "solid #3f51b5",
        },
        div: {
            width: "50%"

        },
        h1: {
            color: "#3f51b5",
            fontSize: "xxx-large"
        }
    });

    const StyledTableCell = withStyles((theme: Theme) =>
        createStyles({
            head: {
                backgroundColor: "#87cefa",
                color: theme.palette.common.black,
                fontSize: 50,
                border:"inset",

            },
            body: {
                fontSize: 20,
                backgroundColor: "#87cefa"
            },
        }),
    )(TableCell);

    const StyledTableRow = withStyles((theme: Theme) =>
        createStyles({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.action.hover,
                    borderStyle: "groove",
                },
            },
        }),
    )(TableRow);


    useEffect(() => {      Users();
    }, []);

    let Users = async () =>{
        try {
            let allUsers = await getAllUsers();
            setUsers(allUsers);


        }catch (e: any){
            console.log(e.message)
        }
    }



    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
        return { name, calories, fat, carbs, protein };
    }
    const classes = useStyles();

    return(

        <>
            <div className={classes.div}>
            <div>
            <h1 className={classes.h1}> FLASHBACK LEADERBOARDS</h1>
            </div>

                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead >
                            <TableRow >


                                <StyledTableCell align="center">Username</StyledTableCell>
                                <StyledTableCell align="center">Score</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((row) => (
                                <StyledTableRow>


                                    <StyledTableCell align="center">{row.username.toUpperCase()}</StyledTableCell>
                                    <StyledTableCell align="center">{row.totalScore}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )



}
export default LeaderboardComponent;