import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function BookCard({ book }) {
    const classes = useStyles();
    return (
        <Card style={{height:'100%'}} className={classes.root}>
            <CardActionArea>
                <img style={{ width: '100%', height: '400px' }} src={`/Image/${book.Img}`} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{book.BookName}</Typography>
                    {
                        book.NewArrival === "Yes" ?
                            <h6 className="text-danger  "> New Arrival !!! </h6> : ''
                    }
                    <p style={{ margin: '0' }}> Author : {book.Author} </p>
                    <p style={{ margin: '0' }}> Publisher : {book.Publisher} </p>
                    <p style={{ margin: '0' }}> Price : $ {book.Price} </p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
