import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent'; 
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function BookDetailsCard({ book }) {
    const classes = useStyles();
    return (
        <Card style={{ height: '100%' }} className={classes.root}>
            <CardActionArea>
                <img style={{ width: '100%', height: '400px' }} src={`/Image/${'asdf;'}`} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{'asdf;'}</Typography>
                    {
                        'asdf;' === "Yes" ?
                            <h6 className="text-danger  "> New Arrival !!! </h6> : ''
                    }
                    <p style={{ margin: '0' }}> Author : {'asdf;'} </p>
                    <p style={{ margin: '0' }}> Publisher : {'asdf;'} </p>
                    <p style={{ margin: '0' }}> Price : $ {'asdf;'} </p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
